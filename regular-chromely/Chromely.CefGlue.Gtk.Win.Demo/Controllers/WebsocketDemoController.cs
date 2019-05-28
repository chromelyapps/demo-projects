// --------------------------------------------------------------------------------------------------------------------
// <copyright file="WebsocketDemoController.cs" company="Chromely Projects">
//   Copyright (c) 2017-2019 Chromely Projects
// </copyright>
// <license>
//      See the LICENSE.md file in the project root for more information.
// </license>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Chromely.CefGlue.Browser.ServerHandlers;
using Chromely.Core.Infrastructure;
using Chromely.Core.RestfulService;

// ReSharper disable once StyleCop.SA1300
namespace Chromely.CefGlue.Gtk.Win.Demo.Controllers
{
    /// <summary>
    /// The demo controller.
    /// </summary>
    [ControllerProperty(Name = "WebsocketDemoController", Route = "websocketmanager")]
    public class WebsocketDemoController : ChromelyController
    {
        /// <summary>
        /// The server sent messages.
        /// </summary>
        private readonly List<string> _serverSentMessages;

        /// <summary>
        /// The seconds delay.
        /// </summary>
        private readonly int _secondsDelay;

        /// <summary>
        /// The receive from server.
        /// </summary>
        private bool _receiveFromServer;

        /// <summary>
        /// The receiver connection id.
        /// </summary>
        private int _receiverConnectionId;


        /// <summary>
        /// Initializes a new instance of the <see cref="WebsocketDemoController"/> class.
        /// </summary>
        public WebsocketDemoController()
        {
            _receiveFromServer = false;
            _secondsDelay = 5;
            _receiverConnectionId = 0;

            _serverSentMessages = new List<string>
            {
                "https://github.com/chromelyapps/Chromely",
                "Chromely Webscocket demo",
                "Build HTML5 desktop apps with Chromely",
                "Real-time app dev with Chromely",
                "For more info see - https://github.com/chromelyapps/Chromely/wiki/Real-time-with-Websocket"
            };

            RegisterGetRequest("/websocketmanager/start", StartServer);
            RegisterGetRequest("/websocketmanager/stop", StopServer);
            RegisterGetRequest("/websocketmanager/status", CheckStatus);
            RegisterPostRequest("/receivefromserver/start", StartReceivingFromServer);
            RegisterPostRequest("/receivefromserver/stop", StopReceivingFromServer);
        }

        /// <summary>
        /// The get movies.
        /// </summary>
        /// <param name="request">
        /// The request.
        /// </param>
        /// <returns>
        /// The <see cref="ChromelyResponse"/>.
        /// </returns>
        private ChromelyResponse StartServer(ChromelyRequest request)
        {
            WebsocketServerRunner.StartServer(string.Empty, 8181);
            return new ChromelyResponse(request.Id)
            {
                ReadyState = (int)ReadyState.ResponseIsReady,
                Status = (int)System.Net.HttpStatusCode.OK,
                StatusText = "OK",
                Data = true
            };
        }

        /// <summary>
        /// The stop server.
        /// </summary>
        /// <param name="request">
        /// The request.
        /// </param>
        /// <returns>
        /// The <see cref="ChromelyResponse"/>.
        /// </returns>
        private ChromelyResponse StopServer(ChromelyRequest request)
        {
            WebsocketServerRunner.StopServer();
            return new ChromelyResponse(request.Id)
            {
                ReadyState = (int)ReadyState.ResponseIsReady,
                Status = (int)System.Net.HttpStatusCode.OK,
                StatusText = "OK",
                Data = true
            };
        }

        /// <summary>
        /// The check status.
        /// </summary>
        /// <param name="request">
        /// The request.
        /// </param>
        /// <returns>
        /// The <see cref="ChromelyResponse"/>.
        /// </returns>
        private ChromelyResponse CheckStatus(ChromelyRequest request)
        {
            return new ChromelyResponse(request.Id)
            {
                ReadyState = (int)ReadyState.ResponseIsReady,
                Status = (int)System.Net.HttpStatusCode.OK,
                StatusText = "OK",
                Data = WebsocketServerRunner.IsServerRunning
            };
        }

        /// <summary>
        /// The start receiving from server.
        /// </summary>
        /// <param name="request">
        /// The request.
        /// </param>
        /// <returns>
        /// The <see cref="ChromelyResponse"/>.
        /// </returns>
        private ChromelyResponse StartReceivingFromServer(ChromelyRequest request)
        {
            var clientname = request.PostData?.ToString() ?? string.Empty;
            _receiverConnectionId = ConnectionNameMapper.GetConnectionId(clientname);
            if (!_receiveFromServer)
            {
                _receiveFromServer = true;
                SendMessagesToClient();
            }

            return new ChromelyResponse(request.Id)
            {
                ReadyState = (int)ReadyState.ResponseIsReady,
                Status = (int)System.Net.HttpStatusCode.OK,
                StatusText = "OK",
                Data = "OK"
            };
        }

        /// <summary>
        /// The stop receiving from server.
        /// </summary>
        /// <param name="request">
        /// The request.
        /// </param>
        /// <returns>
        /// The <see cref="ChromelyResponse"/>.
        /// </returns>
        private ChromelyResponse StopReceivingFromServer(ChromelyRequest request)
        {
            _receiveFromServer = false;

            return new ChromelyResponse(request.Id)
            {
                ReadyState = (int)ReadyState.ResponseIsReady,
                Status = (int)System.Net.HttpStatusCode.OK,
                StatusText = "OK",
                Data = "OK"
            };
        }

        /// <summary>
        /// The send messages to client.
        /// </summary>
        private void SendMessagesToClient()
        {
            Task.Run(() =>
            {
                try
                {
                    var index = 0;
                    while (_receiveFromServer)
                    {
                        var info = _serverSentMessages[index];
                        var data = $"{DateTime.Now}: {info}.";
                        WebsocketMessageSender.Send(_receiverConnectionId, data);
                        System.Threading.Thread.Sleep(_secondsDelay * 1000);
                        index++;
                        index = (index >= _serverSentMessages.Count) ? 0 : index;
                    }
                }
                catch (Exception exception)
                {
                    Log.Error(exception);
                }
            });
        }
    }
}
