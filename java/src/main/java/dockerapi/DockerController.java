package dockerapi;

import java.util.*;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.async.DeferredResult;

import com.github.dockerjava.core.*;
import com.github.dockerjava.core.command.LogContainerResultCallback;
import com.github.dockerjava.api.*;
import com.github.dockerjava.api.command.*;
import com.github.dockerjava.api.model.Frame;

@RestController
public class DockerController {
    DockerClient client;

    public DockerController() {
        DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
                .withDockerHost("unix:///var/run/docker.sock").build();

        this.client = DockerClientBuilder.getInstance(config).build();
    }

    @RequestMapping("/docker/containers")
    public List<Container> listContainers() {
        List<Container> containers = new ArrayList<Container>();

        List<com.github.dockerjava.api.model.Container> dockerContainers = 
            this.client.listContainersCmd()
                .withShowAll(true)
                .exec();

        for (com.github.dockerjava.api.model.Container c : dockerContainers) {
            InspectContainerResponse.ContainerState state = client.inspectContainerCmd(c.getId()).exec().getState();

            containers.add(new Container(c, state));
        }

        return containers;
    }

    @RequestMapping("/docker/logs/{id}")
    public DeferredResult<String> getLogs(@PathVariable String id) {
        DeferredResult<String> result = new DeferredResult<>();
        
        final StringBuilder sb = new StringBuilder();

        client.logContainerCmd(id)
            .withStdOut(true)
            .withStdErr(true)
            .withTimestamps(true)
            .exec(new LogContainerResultCallback() {
                public void onNext(Frame frame) {
                    sb.append(new String(frame.getPayload()));
                }

                public void onError(Throwable throwable) {
                    result.setErrorResult(throwable);
                }

                public void onComplete() {
                    result.setResult(sb.toString());
                }
            });
        
        return result;
    }
}
