<%@ WebHandler Language="C#" Class="proxy" %>
/*
  This proxy page does not have any security checks. It is highly recommended
  that a user deploying this proxy page on their web server, add appropriate
  security checks, for example checking request path, username/password, target
  url, etc.
*/
using System;
using System.Web;

public class proxy : IHttpHandler {
	
    public void ProcessRequest (HttpContext context) {

		string uri = context.Request.QueryString[0];		
		System.Net.WebRequest req = System.Net.WebRequest.Create(new Uri(uri));
		req.Method = context.Request.HttpMethod;

		byte[] bytes = new byte[context.Request.InputStream.Length];		
		context.Request.InputStream.Read(bytes,0,(int)context.Request.InputStream.Length);
		req.ContentLength = bytes.Length;
        req.ContentType = "application/x-www-form-urlencoded";
		System.IO.Stream outputStream = req.GetRequestStream();
		outputStream.Write(bytes, 0, bytes.Length);
		outputStream.Close();
		
		System.Net.WebResponse res = req.GetResponse();
		context.Response.ContentType = res.ContentType;
		
		System.IO.StreamReader sr = new System.IO.StreamReader(res.GetResponseStream());
		string strResponse = sr.ReadToEnd();        
		context.Response.Write(strResponse);
		context.Response.End();
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}