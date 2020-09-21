using Chromely.Core.Network;

namespace FramelessDemo.Extensions
{
    public static class ChromelyRequestExtensions
    {
        public static ChromelyResponse Response<TData>(this ChromelyRequest self, TData body)
        {
            return new ChromelyResponse(self.Id) { Data = body };
        }

        public static ChromelyResponse Response(this ChromelyRequest self)
        {
            return new ChromelyResponse(self.Id);
        }
    }
}