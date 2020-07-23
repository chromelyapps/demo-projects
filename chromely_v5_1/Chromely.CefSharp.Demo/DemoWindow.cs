// Copyright © 2017-2020 Chromely Projects. All rights reserved.
// Use of this source code is governed by Chromely MIT licensed and CefSharp BSD-style license that can be found in the LICENSE file.

using CefSharp;
// Copyright © 2017-2020 Chromely Projects. All rights reserved.
// Use of this source code is governed by Chromely MIT licensed and CefSharp BSD-style license that can be found in the LICENSE file.

using Chromely.Core;
using Chromely.Core.Configuration;
using Chromely.Core.Host;
using System;

namespace Chromely.CefSharp.Demo
{
    public class DemoWindow : Window
    {
        public DemoWindow(IChromelyNativeHost nativeHost,
                      IChromelyConfiguration config,
                      ChromelyHandlersResolver handlersResolver)
            : base(nativeHost, config, handlersResolver)
        {

            #region Events
            FrameLoadStart += DemoWindow_FrameLoadStart;
            FrameLoadEnd += DemoWindow_FrameLoadEnd;
            LoadingStateChanged += DemoWindow_LoadingStateChanged;
            JavascriptMessageReceived += DemoWindow_JavascriptMessageReceived;
            ConsoleMessage += DemoWindow_ConsoleMessage;
            AddressChanged += DemoWindow_AddressChanged;
            #endregion Events

            #region Handlers
            // Optionally set custom handlers here or register them in DI
            // If they have dependencies it is better to use the DI.

            // LifeSpanHandler = new CustomLifeSpanHandler();
            // LoadHandler = new CustomLoadHandler();
            // RequestHandler = new CustomRequestHandler();
            // DisplayHandler = new CustomDisplayHandler();
            // MenuHandler = new CustomMenuHandler();
            // KeyboardHandler = new CustomKeyboardHandler();
            // JsDialogHandler = new JsDialogHandler();
            // DialogHandler = new CustomDialogHandler();
            // DragHandler = new CustomDragHandler();
            // DownloadHandler = new CustomDownloadHandler();
            // FindHandler = new CustomFindHandler();
            // ResourceRequestHandlerFactory = new CustomResourceRequestHandlerFactory();
            // RenderProcessMessageHandler = new CustomRenderProcessMessageHandler();

            #endregion
        }

        #region Events
        private void DemoWindow_AddressChanged(object sender, AddressChangedEventArgs e)
        {
            Console.WriteLine("AddressChanged event called.");
        }

        private void DemoWindow_ConsoleMessage(object sender, ConsoleMessageEventArgs e)
        {
            Console.WriteLine("ConsoleMessage event called.");
        }

        private void DemoWindow_JavascriptMessageReceived(object sender, JavascriptMessageReceivedEventArgs e)
        {
            Console.WriteLine("JavascriptMessageReceived event called.");
        }

        private void DemoWindow_LoadingStateChanged(object sender, LoadingStateChangedEventArgs e)
        {
            Console.WriteLine("LoadingStateChanged event called.");
        }

        private void DemoWindow_FrameLoadStart(object sender, FrameLoadStartEventArgs e)
        {
            Console.WriteLine("FrameLoadStart event called.");
        }

        private void DemoWindow_FrameLoadEnd(object sender, FrameLoadEndEventArgs e)
        {
            Console.WriteLine("FrameLoadEnd event called.");
        }

        #endregion Events
    }
}
