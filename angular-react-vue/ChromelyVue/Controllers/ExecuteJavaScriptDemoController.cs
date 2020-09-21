// Copyright © 2017-2020 Chromely Projects. All rights reserved.
// Use of this source code is governed by MIT license that can be found in the LICENSE file.

using System;
using System.Text.Json;
using Chromely.Core.Configuration;
using Chromely.Core.Logging;
using Chromely.Core.Network;
using Microsoft.Extensions.Logging;

namespace ChromelyVue.Controllers
{
    /// <summary>
    /// The demo controller.
    /// </summary>
    [ControllerProperty(Name = "ExecuteJavaScriptDemoController")]
    public class ExecuteJavaScriptDemoController : ChromelyController
    {
        private readonly IChromelyConfiguration _config;

        /// <summary>
        /// Initializes a new instance of the <see cref="ExecuteJavaScriptDemoController"/> class.
        /// </summary>
        public ExecuteJavaScriptDemoController(IChromelyConfiguration config)
        {
            _config = config;
            RegisterRequest("/executejavascript/execute", Execute);
        }

        private IChromelyResponse Execute(IChromelyRequest request)
        {
            var response = new ChromelyResponse(request.Id)
            {
                ReadyState = (int)ReadyState.ResponseIsReady,
                Status = (int)System.Net.HttpStatusCode.OK,
                StatusText = "OK",
                Data = DateTime.Now.ToLongDateString()
            };

            try
            {
                var scriptInfo = new ScriptInfo(request.PostData);
                var scriptExecutor = _config?.JavaScriptExecutor;
                if (scriptExecutor == null)
                {
                    response.Data = $"Frame {scriptInfo.FrameName} does not exist.";
                    return response;
                }

                scriptExecutor.ExecuteScript(scriptInfo.Script);
                response.Data = "Executed script :" + scriptInfo.Script;
                return response;
            }
            catch (Exception e)
            {
                Logger.Instance.Log.LogError(e, e.Message);
                response.Data = e.Message;
                response.ReadyState = (int)ReadyState.RequestReceived;
                response.Status = (int)System.Net.HttpStatusCode.BadRequest;
                response.StatusText = "Error";
            }

            return response;
        }

        private class ScriptInfo
        {
            /// <summary>
            /// Initializes a new instance of the <see cref="ScriptInfo"/> class.
            /// </summary>
            /// <param name="postData">
            /// The post data.
            /// </param>
            public ScriptInfo(object postData)
            {
                FrameName = string.Empty;
                Script = string.Empty;
                if (postData != null)
                {
                    var options = new JsonSerializerOptions();
                    options.ReadCommentHandling = JsonCommentHandling.Skip;
                    options.AllowTrailingCommas = true;
                    var requestData = JsonSerializer.Deserialize<scriptInfo>(postData.ToString(), options);

                    FrameName = requestData.framename ?? string.Empty;
                    Script = requestData.script ?? string.Empty;
                }
            }

            /// <summary>
            /// Gets the frame name.
            /// </summary>
            public string FrameName { get; }

            /// <summary>
            /// Gets the script.
            /// </summary>
            public string Script { get; }
        }

        private class scriptInfo
        {
            public string framename { get; set; }
            public string script { get; set; }
        }
    }
}
