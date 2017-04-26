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

    public DockerController() {
        // TODO: inicializar cliente de docker
    }

    @RequestMapping("/docker/containers")
    public List<Container> listContainers() {
        List<Container> containers = new ArrayList<>();

        Container c = new Container();
        c.id = "id1";
        c.image = "image1";
        c.isRunning = true;
        c.name = "name1";
        c.state = "running";
        c.status = "running for 10 hours";

        containers.add(c);
        containers.add(c);
        containers.add(c);

        return containers;
        // TODO: listar containers
    }

    @RequestMapping("/docker/logs/{id}")
    public DeferredResult<String> getLogs(@PathVariable String id) {
        // TODO: devolver logs de container
        DeferredResult<String> result = new DeferredResult<>();

        result.setResult("mylog mylog mylog");
        return result;
    }
}
