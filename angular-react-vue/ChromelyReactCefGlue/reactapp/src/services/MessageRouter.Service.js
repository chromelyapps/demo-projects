
module.exports = {
    boundObjectInfoTemp: () => {
        console.log('External - info');
        return { objective: 'External - Chromely Main Objectives', platform: 'External - Platforms', version: 'External - Version' }
    },

    messageRouterGet: (url, parameters, callback, _self) => {
        var request = {
            "method": "GET",
            "url": url,
            "parameters": parameters,
            "postData": null
        };
        window.cefQuery({
            request: JSON.stringify(request),
            onSuccess: (response) => {
                var jsonData = JSON.parse(response);
                if (jsonData.ReadyState == 4 && jsonData.Status == 200) {
                    if(callback) callback(jsonData.Data, _self);
                } else {
                    console.log("An error occurs during message routing. With ur:" + url + ". Response received:" + response);
                }
            },
            onFailure: (err, msg) => {
                console.log(err, msg);
            }
        });
    },

    messageRouterPost: (url, parameters, postData, callback, _self) => {
        var request = {
            "method": "POST",
            "url": url,
            "parameters": parameters,
            "postData": postData
        };
        window.cefQuery({
            request: JSON.stringify(request),
            onSuccess: (response) => {
                var jsonData = JSON.parse(response);
                if (jsonData.ReadyState == 4 && jsonData.Status == 200) {
                    if(callback) callback(jsonData.Data, _self);
                } else {
                    console.log("An error occurs during message routing. With ur:" + url + ". Response received:" + response);
                }
            },
            onFailure: (err, msg) => {
                console.log(err, msg);
            }
        });
    }
}