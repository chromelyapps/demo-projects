using System.Collections.Generic;
using System.Text.Json;

namespace ChromelyControllers.Pages
{
    public class JSRequest
    {
        public string Url { get; set; }
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
