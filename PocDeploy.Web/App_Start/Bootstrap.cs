using System.Web.Mvc;
using PocDeploy.Controllers;
using PocDeploy.Infrastructure;
using Umbraco.Core;
using Umbraco.Web.Mvc;

namespace PocDeploy
{
    public class Bootstrap : ApplicationEventHandler
    {
        protected override void ApplicationStarting(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            DefaultRenderMvcControllerResolver.Current.SetDefaultControllerType(typeof(ContentPageController));
            ViewEngines.Engines.Insert(0, new PageViewEngine());
        }
    }
}