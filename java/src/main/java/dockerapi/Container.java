package dockerapi;

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
}
