namespace ChromelyBlazor.Shared;

public class ChromelyJsInterop
{
    private readonly IJSRuntime _jsRuntime;

    public ChromelyJsInterop(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
    }

    public virtual void Execute(string url, object? postData, Action<string> callback)
    {
        var jsRequest = new JSRequest
        {
            Url = url,
            PostData = postData,
            JSInvokeId = "ExecuteRequestCallback"
        };

        var dotNetReference = DotNetObjectReference.Create(new JSInteropActionWrapper<string>(callback));

        _jsRuntime.InvokeVoidAsync("executeRequest", jsRequest.ToJson(), dotNetReference);
    }

    public virtual void OpenExternalUrl(string url)
    {
        _jsRuntime.InvokeVoidAsync("openExternalUrl", url);
    }

    private class JSInteropActionWrapper<T>
    {
        private readonly Action<T> _callback;

        public JSInteropActionWrapper(Action<T> callback)
        {
            _callback = callback;
        }

        [JSInvokable("ExecuteRequestCallback")]
        public async Task Invoke(T arg)
        {
            _callback.Invoke(arg);

            await Task.CompletedTask;
        }
    }
}

