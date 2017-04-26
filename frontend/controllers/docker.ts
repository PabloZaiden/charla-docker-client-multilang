import { Controller, DocController, DocAction, Get, Post, Context } from "kwyjibo";
import * as K from "kwyjibo";
import App from "../app";
import * as Stream from "stream";
import * as OS from "os";
import * as FS from "fs";
import * as Path from "path";
import * as UUID from "node-uuid";
import * as Events from "events";
import * as Request from "request";
import * as AnsiParser from "ansi-parser";

@Controller("/docker")
@DocController("Docker operations controller.")
class Docker {

    static DotNetBaseURL = "http://dotnet:5000/api/docker/";
    static JavaBaseURL = "http://java:8080/docker/";
    static NodeBaseURL = "http://node:3000/docker/";

    static request(url: string) {
        return new Promise<string>((resolve, reject) => {

            Request(url, { method: "get" }, (error, response, body) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            });
        });
    }

    static async requestJson(url: string) {
        let body = await Docker.request(url);

        if (body !== undefined) {
            return JSON.parse(body);
        } else {
            return undefined;
        }
    }

    static getPaths() {
        return {
            logs: K.getActionRoute(Docker, "logs"),
            start: K.getActionRoute(Docker, "start"),
            stop: K.getActionRoute(Docker, "stop"),
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
    async containers(context: Context): Promise<K.Renderable> {
        let containers = await Docker.requestJson(Docker.JavaBaseURL + "containers");

        return {
            $render_view: "containersList",
            containers: containers,
            paths: Docker.getPaths()
        };
    }

    @DocAction(`Starts a container`)
    async start(context: Context, @K.FromQuery("id") id: string) {
        await Docker.request(Docker.DotNetBaseURL + `Start/${id}`);

        context.response.redirect(K.getActionRoute(Docker, "index"));
    }

    @DocAction(`Stops a container`)
    async stop(context: Context, @K.FromQuery("id") id: string) {
        await Docker.request(Docker.DotNetBaseURL + `Stop/${id}`);

        context.response.redirect(K.getActionRoute(Docker, "index"));
    }

    @DocAction(`Lists the content of a directory from a container`)
    async ls(context: Context, @K.FromQuery("id") id: string, @K.FromQuery("path") path: string) {
        let entries = await Docker.requestJson(Docker.NodeBaseURL + `ls?id=${id}&path=${path}`);

        let model: K.Renderable = {
            $render_view: "fsList",
            path: path,
            downloadDirPath: K.getActionRoute(Docker, "getArchive") + `?id=${id}&path=${path}`,
            entries: []
        };

        for (let lsEntry of entries) {
            let link: string;

            if (lsEntry.type === "file") {
                link = K.getActionRoute(Docker, "getArchive");
            } else {
                link = K.getActionRoute(Docker, "ls");
            }

            let entry = {
                ...lsEntry,
                link: link + `?id=${id}&path=${lsEntry.path}`
            };
            model.entries.push(entry);
        }

        return model;
    }

    @DocAction(`Gets the content of a file from a container`)

    getArchive(context: Context, @K.FromQuery("id") id: string, @K.FromQuery("path") path: string) {
        Request(Docker.NodeBaseURL + `getArchive?id=${id}&path=${path}`).pipe(context.response);
    }

    @DocAction(`Shows the logs for the container with the id sent in the querystring`)
    async logs(context: Context, @K.FromQuery("id") id: string) {
        let rawLogs = await Docker.request(Docker.JavaBaseURL + `logs/${id}`);
        let html = AnsiParser.removeAnsi(rawLogs);
        context.response.send("<html><body><pre>" + html + "</pre></body></html>");
    }
}
