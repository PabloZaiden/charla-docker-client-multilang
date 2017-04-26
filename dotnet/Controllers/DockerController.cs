using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace Docker.WebApi.Controllers
{
    [Route("api/[controller]")]
    public class DockerController : Controller
    {
        [HttpGet]
        public string GetImages()
        {
            return @"[
  {
    ""Containers"": -1,
    ""Created"": 1493184664,
    ""Id"": ""sha256:41c12611c1829d4a323e786eebe62751cfd0be2ba42ebd28d480fce898a6de79"",
    ""Labels"": {},
    ""ParentId"": ""sha256:e41894e1b021fa61cdefcbfdf9b0d5f4a89a67920e8eae9da85c2e2b7a314e82"",
    ""RepoDigests"": null,
    ""RepoTags"": [
      ""myimage1:latest""
    ],
    ""SharedSize"": -1,
    ""Size"": 299647508,
    ""VirtualSize"": 299647508
  },
  {
    ""Containers"": -1,
    ""Created"": 1493184657,
    ""Id"": ""sha256:a6d8f075ae7a9c05b853b07a3206f9d22c1f1ac7f5b9fb17055f20b3772fd4b6"",
    ""Labels"": {},
    ""ParentId"": ""sha256:6518cc6c3cf69417b86b8a131c0dfee9fc8224ad616a26f273c0e39403100211"",
    ""RepoDigests"": null,
    ""RepoTags"": [
      ""myimage2:latest""
    ],
    ""SharedSize"": -1,
    ""Size"": 301481879,
    ""VirtualSize"": 301481879
  }";
            // TODO: Devolver listado de imagenes
        }

        [HttpGet("Start/{id}")]
        public IActionResult Start(string id)
        {
            // TODO: iniciar container
            return StatusCode(200);
        }

        [HttpGet("Stop/{id}")]
        public IActionResult Stop(string id)
        {
            // TODO: parar container
            return StatusCode(200);
        }
    }
}
