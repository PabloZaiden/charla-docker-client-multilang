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
            var url = "/images/json";
            var result = DockerHelper.ExecApi(url, HttpVerbs.GET);
            return result;
        }

        [HttpGet("Start/{id}")]
        public IActionResult Start(string id)
        {
            var url = string.Format("/containers/{0}/start",id);
            var result = DockerHelper.ExecApi(url, HttpVerbs.POST);
            var statusCode = result.Split(' ')[1];
            return StatusCode(Convert.ToInt32(statusCode));
        }

        [HttpGet("Stop/{id}")]
        public IActionResult Stop(string id)
        {
            var url = string.Format("/containers/{0}/stop",id);
            var result = DockerHelper.ExecApi(url, HttpVerbs.POST);
            var statusCode = result.Split(' ')[1];
            Response.StatusCode = Convert.ToInt32(statusCode);
            return StatusCode(Convert.ToInt32(statusCode));
        }
    }
}
