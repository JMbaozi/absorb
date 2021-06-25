using Microsoft.Owin;
using Owin;
[assembly: OwinStartup(typeof(Sample11_2.Startup))]
namespace Sample11_2
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}