 
     export function messageRouterGetJson(url, parameters, callback) {
        var request = {
            "method": "GET",
            "url": url,
            "parameters": parameters,
            "postData": null
        };
    
        messageRouterQuery(request, callback);
      }
      
    export function messageRouterPostJson(url, parameters, postData, callback) {
        var request = {
            "method": "POST",
            "url": url,
            "parameters": parameters,
            "postData": postData
        };
    
        messageRouterQuery(request, callback);
      }
    
    export function openExternalUrl(url) {
        var link = document.createElement('a');
        link.href = url;
        document.body.appendChild(link);
        link.click(); 
      }

  function messageRouterQuery(request, callback) {
    window.cefQuery({
        request: JSON.stringify(request),
        onSuccess: (response) => {
            var jsonData = JSON.parse(response);
            if (jsonData.ReadyState == 4 && jsonData.Status == 200) {
                if(callback) callback(jsonData.Data);
            } else {
                console.log("An error occurs during message routing. With ur:" + url + ". Response received:" + response);
            }
        },
        onFailure: (err, msg) => {
            console.log(err, msg);
        }
    });
}


