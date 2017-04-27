using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Text.RegularExpressions;

public class DockerHelper
{
    public static string socketLocation = "/var/run/docker.sock";
    
    public static HttpResponse ExecApi(string url, string verb)
    {
        var socket = new Socket(AddressFamily.Unix, SocketType.Stream, ProtocolType.IP);
        var unixEp = new UnixEndPoint(socketLocation);
        string payload = string.Empty;
        int response;
        byte[] bytesReceived = new Byte[1024*1024];
        socket.Connect(unixEp);
        var request = verb + " " + url + " HTTP/1.1\r\n" + 
        "Host: locahost\r\n" +
        "\r\n";
        response = socket.Send(Encoding.UTF8.GetBytes(request));

        int bytes;
        //payload = Encoding.ASCII.GetString(bytesReceived, 0, bytes);
        //System.Threading.Thread.Sleep(20);
        bool keepReading = true;
        while(socket.Available > 0 || keepReading)
        {
            bytes = socket.Receive(bytesReceived, bytesReceived.Length, 0);
            payload += Encoding.ASCII.GetString(bytesReceived, 0, bytes);
            keepReading = string.IsNullOrEmpty(payload) || !payload.Contains("\r\n\r\n");
        };
        
        return HttpResponse.Parse(payload);
    }
}