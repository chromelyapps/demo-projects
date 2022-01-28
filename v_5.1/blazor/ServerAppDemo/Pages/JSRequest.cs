using System.Collections.Generic;
using System.Text.Json;

namespace ServerAppDemo.Pages
{
    public class JSRequest
    {
        public JSRequest()
        {
            Parameters = new Dictionary<string, string>();
        }

        public string Url { get; set; }
        public string JSInvokeId { get; set; }
        public IDictionary<string, string> Parameters { get; set; }
        public object PostData { get; set; }

        public string ToJson()
        {
            var options = new JsonSerializerOptions();
            options.ReadCommentHandling = JsonCommentHandling.Skip;
            options.AllowTrailingCommas = true;

            return JsonSerializer.Serialize(this, options); ;
        }
    }
}
