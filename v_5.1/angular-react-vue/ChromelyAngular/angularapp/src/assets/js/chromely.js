/* 
 * CEF Generic Message Routing
 * https://github.com/chromelyapps/Chromely/wiki/Generic-Message-Routing
 * request - a Json object
 * response - callback response method
 * onError - callback on erorr or exception.
 */

function messsageRouterQuery(request, response, onError) {
    window.cefQuery({
        request: JSON.stringify(request),
        onSuccess: function (data) {
            response(data);
        }, onFailure: function (err, msg) {
            onError(msg);
            console.log(err, msg);
        }
    });
}

/* 
 * Launch external url - this used to facilitate command action
 * https://github.com/chromelyapps/Chromely/blob/master/src/Chromely.Core/Network/CommandRoute.cs
 * url - external/command url
 */
function launchExternalUrl(url) {
    var link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click(); 
}