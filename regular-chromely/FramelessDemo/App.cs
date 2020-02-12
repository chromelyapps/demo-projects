using System;
using Chromely.CefGlue.Browser;
using Chromely.CefGlue.Browser.EventParams;
using Chromely.Core;
using Chromely.Core.Helpers;
using Chromely.Core.Host;
using Chromely.Core.Network;
using FramelessDemo.Controllers;
using FramelessDemo.Services.Window;
using Chromely;
using FramelessDemo.Extensions;
using Chromely.CefGlue.BrowserWindow;

namespace FramelessDemo
{
    public class App : ChromelyBasicApp
    {
        public override void Configure(IChromelyContainer container)
        {
            base.Configure(container);
            RegisterControllers(container);
            RegisterWindowService(container);
        }

        private void RegisterControllers(IChromelyContainer container)
        {
            container.RegisterSingleton(typeof(ChromelyController), nameof(WindowController), typeof(WindowController));
            container.RegisterSingleton(typeof(ChromelyController), Guid.NewGuid().ToString(), typeof(DemoController));
            container.RegisterSingleton(typeof(ChromelyController), Guid.NewGuid().ToString(), typeof(ExecuteJavaScriptDemoController));
            container.RegisterSingleton(typeof(ChromelyController), Guid.NewGuid().ToString(), typeof(TmdbMoviesController));
            container.RegisterSingleton(typeof(ChromelyController), Guid.NewGuid().ToString(), typeof(TodoListController));
        }

        private void RegisterWindowService(IChromelyContainer container)
        {
            container.RegisterSingleton(typeof(IFramelessWindowService), nameof(IFramelessWindowService), typeof(WinApiWindowService));
          //  container.RegisterSingleton(typeof(IChromelyNativeHost), nameof(IChromelyNativeHost), typeof(CustomWinApiHost));
        }

        private void RegisterEventHandler<TEventArgs>(
            IChromelyContainer container,
            CefEventKey key,
            Action<object, TEventArgs, IChromelyContainer> handler)
        {
            var service = CefEventHandlerTypes.GetHandlerType(key);
            var eventHandler = new ChromelyEventHandler<TEventArgs>(key, (s, e) => handler(s, e, container));
            container.RegisterInstance(service, eventHandler.Key, eventHandler);
        }
    }
}