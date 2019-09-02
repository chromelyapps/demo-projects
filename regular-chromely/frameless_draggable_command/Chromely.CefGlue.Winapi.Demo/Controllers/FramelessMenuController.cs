// --------------------------------------------------------------------------------------------------------------------
// <copyright file="FramelessMenuController.cs" company="Chromely Projects">
//   Copyright (c) 2017-2019 Chromely Projects
// </copyright>
// <license>
//      See the LICENSE.md file in the project root for more information.
// </license>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chromely.Core.Host;
using Chromely.Core.Infrastructure;
using Chromely.Core.RestfulService;
using WinApi.User32;

namespace Chromely.CefGlue.Winapi.Demo.Controllers
{
    /// <summary>
    /// The demo controller.
    /// </summary>
    [ControllerProperty(Name = "FramelessMenuController", Route = "framelesscontroller")]
    public class FramelessMenuController : ChromelyController
    {
        private const string COMMANDMAXRESPONSE = "toggleRestoreMaxButton(1);";
        private const string COMMANDRESTORERESPONSE = "toggleRestoreMaxButton(0);";

        /// <summary>
        /// Initializes a new instance of the <see cref="FramelessMenuController"/> class.
        /// </summary>
        public FramelessMenuController()
        {
            RegisterCommand("/framelesscontroller/min", MinimizeWindow);
            RegisterCommand("/framelesscontroller/restore", RestoreWindow);
            RegisterCommand("/framelesscontroller/max", MaximizeWindow);
            RegisterCommand("/framelesscontroller/close", CloseWindow);
        }

        private void MinimizeWindow(IDictionary<string, string[]> queryParameters)
        {
            var winHandle = GetWindowHandle;
            if (winHandle != IntPtr.Zero)
            {
                User32Methods.ShowWindow(winHandle, ShowWindowCommands.SW_SHOWMINIMIZED);
            }
        }

        private void RestoreWindow(IDictionary<string, string[]> queryParameters)
        {
            var winHandle = GetWindowHandle;
            if (winHandle != IntPtr.Zero)
            {
                User32Methods.ShowWindow(winHandle, ShowWindowCommands.SW_RESTORE);
                RunResponseScript(COMMANDRESTORERESPONSE);
            }
        }

        private void MaximizeWindow(IDictionary<string, string[]> queryParameters)
        {
            var winHandle = GetWindowHandle;
            if (winHandle != IntPtr.Zero)
            {
                User32Methods.ShowWindow(winHandle, ShowWindowCommands.SW_SHOWMAXIMIZED);
                RunResponseScript(COMMANDMAXRESPONSE);
            }
        }

        private void CloseWindow(IDictionary<string, string[]> queryParameters)
        {
            if (IoC.GetInstance(typeof(IChromelyWindow), typeof(IChromelyWindow).FullName) is IChromelyWindow window)
            {
                window.Close();
            }
        }

        private static void RunResponseScript(string script)
        {
            try
            {
                Task.Run(() =>
                {
                    var frame = FrameHandler.GetMainFrame();
                    if (frame == null)
                    {
                        var errorMsg = $"Cannot get frame to run {script}.";
                        Log.Error(errorMsg);
                        return;
                    }

                    frame.ExecuteJavaScript(script, null, 0);
                });
            }
            catch (Exception e)
            {
                Log.Error(e);
            }
        }

        private static IntPtr GetWindowHandle
        {
            get
            {
                if (IoC.GetInstance(typeof(IChromelyWindow), typeof(IChromelyWindow).FullName) is IChromelyWindow window)
                {
                    return window.Handle;
                }

                return IntPtr.Zero;
            }
        }
    }
}
