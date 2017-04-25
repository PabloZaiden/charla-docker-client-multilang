import { Controller, DocController, DocAction, Get, Post, Context } from "kwyjibo";
import * as K from "kwyjibo";
import * as Stream from "stream";
import * as OS from "os";
import * as Path from "path";

let Dockerode = require("dockerode");
let Parser = require("ansi-style-parser");

@Controller("/docker")
@DocController("Docker operations controller.")
class Docker {
    private dockerAPI = undefined;

    constructor() {
        this.dockerAPI = new Dockerode({ socketPath: "/var/run/docker.sock" });
    }

    private handleError(context: Context, error: any): void {
        context.response.status(500).send(error);
    }


    @DocAction(`Lists the content of a directory from a container`)
    ls(context: Context, @K.FromQuery("id") id: string, @K.FromQuery("path") path: string) {
        if (id == undefined || path == undefined) {
            throw new K.NotFound("invalid path or id");
        }

        let container = this.dockerAPI.getContainer(id);

        container.exec({
            AttachStdout: true,
            AttachStderr: true,
            Tty: false,
            Cmd: ["ls", "-lahp", path]
        }, (err, exec) => {
            if (err) {
                this.handleError(context, err);
                return;
            }

            exec.start(async (err, stream) => {
                if (err) {
                    this.handleError(context, err);
                    return;
                }

                let content: String;
                try {
                    content = await this.readStream(stream);
                } catch (err) {
                    this.handleError(context, err);
                    return;
                }

                let lines = content.split(OS.EOL);

                let entries: LSEntry[] = [];

                for (let line of lines) {
                    let entry = this.parseLine(line, path, id);
                    entries.push(entry);
                }

                context.response.send(entries);
            });
        });
    }

    private parseLine(line: string, path: string, id: string) {
        if (!line.startsWith("total")) {
            let lastSpace = line.lastIndexOf(" ");
            let info = line.substring(0, lastSpace);
            let entryName = line.substring(lastSpace + 1);
            let type = "";

            let newPath = path;
            if (entryName === "../") {
                let withoutLastSlash = newPath.substr(0, newPath.length - 1);
                let lastSlash = withoutLastSlash.lastIndexOf("/");
                newPath = newPath.substr(0, lastSlash + 1);
            } else if (entryName !== "./") {
                newPath += entryName;
            }

            if (newPath === "") {
                newPath = "/";
            }


            if (entryName.endsWith("/")) {
                type = "directory";
            } else {
                type = "file"
            }

            let entry: LSEntry = {
                info: info,
                name: entryName,
                type: type,
                path: newPath
            };

            return entry;
        }
    }

    @DocAction(`Gets the content of a file from a container`)
    getArchive(context: Context, @K.FromQuery("id") id: String, @K.FromQuery("path") path: String) {
        if (id == undefined || path == undefined) {
            throw new K.NotFound("invalid path or id");
        }

        let container = this.dockerAPI.getContainer(id);

        container.getArchive({
            path: path
        }, async (err, stream) => {
            if (err) {
                this.handleError(context, err);
                return;
            }

            let fileName = path.split("/").join("__");
            context.response.setHeader("Content-Type", "application/octet-stream");
            context.response.setHeader("Content-Disposition", `attachment; filename="${fileName}.tar"`);
            stream.pipe(context.response);
        });
    }

    private readStream(stream: any): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            var data = "";

            var finalStream = new Stream.PassThrough();
            finalStream.on("data", chunk => {
                data += chunk;
            });

            stream.on("end", () => {
                stream.destroy();
                resolve(data);
            });

            stream.on("error", err => {
                reject(err);
            })

            this.dockerAPI.modem.demuxStream(stream, finalStream, finalStream);
        });
    }
}

interface LSEntry {
    info: string,
    name: string,
    type: string,
    path: string
}
