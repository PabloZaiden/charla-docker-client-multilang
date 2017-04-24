package dockerapi;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.github.dockerjava.core.*;
import com.github.dockerjava.api.*;

@RestController
public class DockerController {

    @RequestMapping("/containers")
    public Container[] listcontainers(@RequestParam(value="name", defaultValue="World") String name) {
        Container[] containers = new Container[2];

        DockerClientConfig config = DefaultDockerClientConfig.createDefaultConfigBuilder()
            .withDockerHost("unix:///var/run/docker.sock")
            //.withDockerTlsVerify(true)
            //.withDockerCertPath("/home/user/.docker/certs")
            //.withDockerConfig("/home/user/.docker")
            //.withApiVersion("1.23")
            //.withRegistryUrl("https://index.docker.io/v1/")
            //.withRegistryUsername("dockeruser")
            //.withRegistryPassword("ilovedocker")
            //.withRegistryEmail("dockeruser@github.com")
            .build();

        DockerClient docker = DockerClientBuilder.getInstance(config).build();

        return containers;
    }

    @RequestMapping("/containerinfo")
    public Container containerinfo(@RequestParam(value="id") String id) {
        return new Container();
    }
}
