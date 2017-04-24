package dockerapi;

import java.util.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.github.dockerjava.core.*;
import com.github.dockerjava.api.*;
import com.github.dockerjava.api.command.*;

@RestController
public class DockerController {
    DockerClient client;

    public DockerController() {
        DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                .withDockerHost("unix:///var/run/docker.sock").build();

        this.client = DockerClientBuilder.getInstance(config).build();
    }

    @RequestMapping("/containers")
    public List<Container> listcontainers(@RequestParam(value = "name", defaultValue = "World") String name) {
        List<Container> containers = new ArrayList<Container>();

        List<com.github.dockerjava.api.model.Container> dockerContainers = this.client.listContainersCmd().exec();

        for (com.github.dockerjava.api.model.Container c : dockerContainers) {
            InspectContainerResponse.ContainerState state = client.inspectContainerCmd(c.getId()).exec().getState();

            containers.add(new Container(c, state));
        }

        return containers;
    }
}
