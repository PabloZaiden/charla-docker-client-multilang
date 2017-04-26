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
            // TODO: Devolver listado de imagenes
        }

        [HttpGet("Start/{id}")]
        public IActionResult Start(string id)
        {
            // TODO: iniciar container
        }

        [HttpGet("Stop/{id}")]
        public IActionResult Stop(string id)
        {
            // TODO: parar container
        }
    }
}
