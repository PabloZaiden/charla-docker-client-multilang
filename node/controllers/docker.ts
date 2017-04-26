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


    constructor() {
        // TODO: inicializar cliente de docker
    }

    private handleError(context: Context, error: any): void {
        context.response.status(500).send(error);
    }


    @DocAction(`Lists the content of a directory from a container`)
    ls(context: Context, @K.FromQuery("id") id: string, @K.FromQuery("path") path: string) {
        if (id == undefined || path == undefined) {
            throw new K.NotFound("invalid path or id");
        }

        // TODO: obtener container, ejecutar LS y devovler lineas
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
        } else {
            return undefined;
        }
    }

    @DocAction(`Gets the content of a file from a container`)
    getArchive(context: Context, @K.FromQuery("id") id: String, @K.FromQuery("path") path: String) {
        if (id == undefined || path == undefined) {
            throw new K.NotFound("invalid path or id");
        }

        // TODO: obtener container, descargar path y enviar stream
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
