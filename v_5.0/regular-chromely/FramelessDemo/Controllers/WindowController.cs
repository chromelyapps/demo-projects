using System.Collections.Generic;
using Chromely.Core.Network;
using Chromely.Core.Host;
using System.Threading.Tasks;
using System;
using Chromely.Core.Configuration;
using Chromely.Core.Logging;

namespace FramelessDemo.Controllers
{
    [ControllerProperty]
    public class WindowController : ChromelyController
    {
        private const string COMMANDMAXRESPONSE = "toggleRestoreMaxButton(1);";
        private const string COMMANDRESTORERESPONSE = "toggleRestoreMaxButton(0);";

        private readonly IChromelyConfiguration _config;
        private readonly IFramelessWindowService _windowService;

        public WindowController(IChromelyConfiguration config, IFramelessWindowService windowService)
        {
            _config = config;
            _windowService = windowService;
        }

        [Command(Route = "/window/close")]
        public void Close(IDictionary<string, string> queryParameters)
        {
            _windowService.Close();
        }

        [Command(Route = "/window/maximize")]
        public void Maximize(IDictionary<string, string> queryParameters)
        {
            _windowService.Maximize();
            RunResponseScript(COMMANDMAXRESPONSE);
        }

        [Command(Route = "/window/minimize")]
        public void Minimize(IDictionary<string, string> queryParameters)
        {
            _windowService.Minimize();
        }

        [Command(Route = "/window/restore")]
        public void Restore(IDictionary<string, string> queryParameters)
        {
            _windowService.Restore();
            RunResponseScript(COMMANDRESTORERESPONSE);
        }
        private void RunResponseScript(string script)
        {
            try
            {
                Task.Run(() =>
                {
                    var scriptExecutor = _config?.JavaScriptExecutor;
                    if (scriptExecutor != null)
                    {
                        scriptExecutor.ExecuteScript(script);
                    }

                });
            }
            catch (Exception e)
            {
                Logger.Instance.Log.Error(e);
            }

        }
    }
}
