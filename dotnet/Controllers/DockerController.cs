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
        public string GetList()
        {
            var url = "/images/json";
            var result = DockerHelper.ExecApi(url);
            
            return result;
        }

        // GET api/values/5
        [HttpGet("Start/{id}")]
        public string Start(int id)
        {
            var url = string.Format("/exec/{0}/start",id);
            var result = DockerHelper.ExecApi(url);
            
            return result;
        }

        [HttpGet("Stop/{id}")]
        public string Stop(int id)
        {
            var url = string.Format("/exec/{0}/stop",id);
            var result = DockerHelper.ExecApi(url);
            
            return result;
        }

        [HttpGet("GetLogs/{id}")]
        public string GetLogs(int id)
        {
           var url = string.Format("/containers/{0}/logs",id);
            var result = DockerHelper.ExecApi(url);
            
            return result;  
        }
    }
}
