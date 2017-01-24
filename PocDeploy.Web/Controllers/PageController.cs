using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Umbraco.Web.Models;
using Umbraco.Web.Mvc;

namespace PocDeploy.Controllers
{
    public class PageController : SurfaceController, IRenderMvcController
    {
        public virtual ActionResult Index(RenderModel model)
        {
            throw new NotImplementedException();
        }
    }
}