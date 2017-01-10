using System.Web.Mvc;

namespace PocDeploy.Infrastructure
{
    public class PageViewEngine : RazorViewEngine
    {
        public PageViewEngine()
        {
            ViewLocationFormats = new[] { "~/Views/Pages/{1}.cshtml" };
            PartialViewLocationFormats = new[] { "~/Views/Partials/{0}.cshtml" };
            FileExtensions = new[] { "cshtml" };
        }
    }
}
