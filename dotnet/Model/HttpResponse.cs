using System;
using System.Collections.Generic;


public class HttpResponse
{
    public int StatusCode { get; private set;}
    public string Body { get; set; }
    public string RawResponse { get; set; }
    public Dictionary<string,string> Headers {get; set;}

    public static HttpResponse Parse (string raw)
    {
        var response = new HttpResponse();
        response.StatusCode = Convert.ToInt32(raw.Split(' ')[1]);
        response.RawResponse = raw;
        response.Headers = new Dictionary<string,string>();
        var headAndBody = raw.Split(new string[] {"\r\n\r\n"}, StringSplitOptions.RemoveEmptyEntries);
        response.Body = headAndBody[1];
        foreach(var pair in headAndBody[0].Split(new string[] {"\r\n"}, StringSplitOptions.RemoveEmptyEntries))
        {
            var keyValue = pair.Split(new string[] {": "}, StringSplitOptions.RemoveEmptyEntries);
            if(keyValue.Length<2)
            {
                keyValue = pair.Split(new string[] {" "}, StringSplitOptions.RemoveEmptyEntries);
                response.Headers.Add(keyValue[0],keyValue[1]);
            }else{
                response.Headers.Add(keyValue[0],keyValue[1]);
            }
            
        }
        return response;
    }
}

