package dockerapi;
import com.github.dockerjava.api.command.InspectContainerResponse;

public class Container {
    public String state;
    public String status;
    public String name;
    public String id;
    public String image;
    public boolean isRunning;

    public Container() {
        this.state = "s1";
        this.status = "stat1";
        this.name = "n1";
        this.id = "2183h182qn8d29";
        this.image = "account/image";
        this.isRunning = true;
    }

    public Container(com.github.dockerjava.api.model.Container c, InspectContainerResponse.ContainerState state) {
        this.state = state.getStatus();
        this.status = c.getStatus();
        this.name = c.getNames()[0];
        this.id = c.getId();
        this.image = c.getImage();
        this.isRunning = state.getRunning();
    }
}
