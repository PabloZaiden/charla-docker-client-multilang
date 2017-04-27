using System;
using System.Collections.Generic;
using System.Linq;

public class HttpResponse
{
    public int StatusCode { get; private set;}
    public string Body { get; set; }
    public string RawResponse { get; set; }
    public Dictionary<string,string> Headers {get; set;}
    public string StatusLine { get; private set;}
    public static HttpResponse Parse (string raw)
    {
        if(string.IsNullOrEmpty(raw))
        {
            return null;
        }
        
        var response = new HttpResponse();
        response.StatusCode = Convert.ToInt32(raw.Split(' ')[1]);
        response.RawResponse = raw;
        response.Body = null;
        response.Headers = new Dictionary<string,string>();
        
        var headAndBody = raw.Split(new string[] {"\r\n\r\n"}, StringSplitOptions.RemoveEmptyEntries);
        
        if(headAndBody.Length > 1)
        {
            response.Body = headAndBody[1].Split(new string[] {"HTTP/1.1"}, StringSplitOptions.RemoveEmptyEntries)[0];
        }

        var headers = headAndBody[0].Split(new string[] {"\r\n"}, StringSplitOptions.RemoveEmptyEntries);
        response.StatusLine = headers[0];
        for(var i = 1; i<headers.Length;i++)
        {
            var keyValue = headers[i].Split(new string[] {": "}, StringSplitOptions.RemoveEmptyEntries);
            if(keyValue.Length<2)
            {
                keyValue = headers[i].Split(new string[] {" "}, StringSplitOptions.RemoveEmptyEntries);
                response.Headers.Add(keyValue[0],keyValue[1]);
            }
            else
            {
                response.Headers.Add(keyValue[0],keyValue[1]);
            }
        }

        return response;
    }
}

