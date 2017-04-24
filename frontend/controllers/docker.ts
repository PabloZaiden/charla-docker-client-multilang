import { Controller, DocController, DocAction, Get, Post, Context } from "kwyjibo";
import * as K from "kwyjibo";
import App from "../app";
import * as Stream from "stream";
import * as OS from "os";
import * as FS from "fs";
import * as Path from "path";
import * as UUID from "node-uuid";
import * as Events from "events";

@Controller("/docker")
@DocController("Docker operations controller.")
class Docker {

    static getPaths() {
        return {
            logs: K.getActionRoute(Docker, "logs"),
            start: K.getActionRoute(Docker, "start"),
            stop: K.getActionRoute(Docker, "start"),
            ls: K.getActionRoute(Docker, "ls")
        };
    }

    constructor() {
    }

    private handleError(context: Context, error: any): void {
        context.response.status(500).send(error);
    }

    @Get("/")
    @DocAction("Redirects to the containers action")
    index(context: Context) {
        context.response.redirect(K.getActionRoute(Docker, "containers"));
    }


    @DocAction(`Lists existing containers`)
    containers(context: Context): K.Renderable {
        return {
            $render_view: "containersList",
            containers: [
                {
                    state: "running",
                    status: "Up less than a second",
                    name: "Container1",
                    id: "qheq892ehq298hdqh7982eh89q",
                    image: "namespace/image",
                    isRunning: true
                },{
                    state: "stopped",
                    status: "Stopped for 20 hours",
                    name: "Container2",
                    id: "qheq892ehq29adawd8hdqh7982eh89q",
                    image: "namespace/image2",
                    isRunning: false
                }
            ],
            paths: Docker.getPaths()
        }
    }

    @DocAction(`Starts a container`)
    start(context: Context, @K.FromQuery("id") id: String): void {
    }

    @DocAction(`Stops a container`)
    stop(context: Context, @K.FromQuery("id") id: String): void {
    }

    @DocAction(`Lists the content of a directory from a container`)
    ls(context: Context, @K.FromQuery("id") id: String, @K.FromQuery("path") path: String) {
    }

    @DocAction(`Gets the content of a file from a container`)

    getArchive(context: Context, @K.FromQuery("id") id: String, @K.FromQuery("path") path: String) {
    }

    @DocAction(`Shows the logs for the container with the id sent in the querystring`)
    logs(context: Context, @K.FromQuery("id") id: String): void {
    }

    private readStream(stream: any): Promise<string> {
        return undefined
    }

    private emitterToPromise<T extends Events.EventEmitter>(emitter: T, resolveEvent?: string): Promise<T> {
        return undefined;
    }
}
