export function executeRequest(dotNetRequest, dotNetObject) {

    // Ensure request is json
    var requestObj = JSON.parse(dotNetRequest);

    var request = {
        "url": requestObj.Url,
        "parameters": requestObj.Parameters,
        "postData": requestObj.PostData
    };

    window.cefQuery({
        request: JSON.stringify(request),
        onSuccess: (response) => {
            var jsonData = JSON.parse(response);
            if (jsonData.ReadyState == 4 && jsonData.Status == 200) {
                if (dotNetObject) dotNetObject.invokeMethodAsync(requestObj.JSInvokeId, JSON.stringify(jsonData.Data));
            } else {
                console.log("An error occurs during message routing. With ur:" + url + ". Response received:" + response);
            }
        },
        onFailure: (err, msg) => {
            console.log(err, msg);
        }
    });
}

export function openExternalUrl(url) {
    var link = document.createElement('a');
    link.href = url;
    document.body.appendChild(link);
    link.click();
}