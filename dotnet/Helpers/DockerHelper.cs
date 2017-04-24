using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

public class DockerHelper
{
    public static string ExecApi(string url)
    {
        var unixSocket = "/var/run/docker.sock";
            var socket = new Socket(AddressFamily.Unix, SocketType.Stream, ProtocolType.IP);
            var unixEp = new UnixEndPoint(unixSocket);
            string payload;
            int response;
            byte[] bytesReceived = new Byte[1024*1024];
            socket.Connect(unixEp);
            var request = "GET " + url + " HTTP/1.1\r\n" + 
            "Host: locahost\r\n" +
            "\r\n";
            response = socket.Send(Encoding.UTF8.GetBytes(request));
            response = socket.Send(Encoding.UTF8.GetBytes("\r\n"));
            int bytes;
            
            bytes = socket.Receive(bytesReceived, bytesReceived.Length, 0);
            payload = Encoding.ASCII.GetString(bytesReceived, 0, bytes);
            
            bytes = socket.Receive(bytesReceived, bytesReceived.Length, 0);
            payload = Encoding.ASCII.GetString(bytesReceived, 0, bytes);
            return payload;
    }
}