using Chromely.Core;

namespace FramelessDemo.Extensions
{
    public static class ChromelyContainerExtensions
    {
        public static T Resolve<T>(this IChromelyContainer self)
        {
            return (T)self.GetInstance(typeof(T), typeof(T).Name);
        }
    }
}