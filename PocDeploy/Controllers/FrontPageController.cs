using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web.Models;

namespace PocDeploy.Controllers
{
    public class FrontPageController : PageController
    {
        public override ActionResult Index(RenderModel model)
        {
            return View(model.Content);
        }
    }
}