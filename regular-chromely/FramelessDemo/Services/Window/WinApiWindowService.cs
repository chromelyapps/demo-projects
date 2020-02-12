using System;
using System.Reflection;
using Chromely.Core.Host;
using static Chromely.Native.WinNativeMethods;

namespace FramelessDemo.Services.Window
{
    public class WinApiWindowService : IFramelessWindowService
    {

        private readonly IChromelyWindow _window;

        public IntPtr Handle
        {
            get
            {
                if (_window != null)
                {
                    return _window.Handle;
                }

                return IntPtr.Zero;
            }
        }

        public WinApiWindowService(IChromelyWindow window)
        {
            _window = window;
        }

        public void Close()
        {
            _window.Close();
        }

        public bool Maximize()
        {
            return ShowWindow(Handle, ShowWindowCommand.SW_SHOWMAXIMIZED);
        }

        public bool Minimize()
        {
            return ShowWindow(Handle, ShowWindowCommand.SW_SHOWMINIMIZED);
        }

        public bool Restore()
        {
            return ShowWindow(Handle, ShowWindowCommand.SW_RESTORE);
        }

    }
}