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
        // TODO: listar containers
    }

    @RequestMapping("/docker/logs/{id}")
    public DeferredResult<String> getLogs(@PathVariable String id) {
        // TODO: devolver logs de container
    }
}
