# ** Announcement ** - Chromely is no longer being maintained!

For those who would like to continue working on the project via forks or alternative approaches, please send mattkol the appropriate links and they will be added here.

Thanks to all the contributors over the years for making the platform a great learning place.

Thank you all.
------------------------------------------------------------------------------------------------------------------------------------------
<p align="center"><img src="https://github.com/chromelyapps/Chromely/blob/master/nugets/chromely.ico?raw=true" /></p>
<h1 align="center">Chromely Demo Projects</h1>

![#c5f015](https://via.placeholder.com/15/c5f015/000000?text=+) For developers who are interested in [WebView2](https://docs.microsoft.com/en-us/microsoft-edge/webview2/) there is [EdgeSharp](https://github.com/edgesharp/EdgeSharp), an offshoot of Chromely.
<br />
<br />

<p>This repository holds 2 sets of demos, each with their own examples.</p>

### Regular Chromely
For more info please see - [Chromely Wiki](https://github.com/chromelyapps/Chromely/wiki).

### Chromely Apps (Angular, React & Vue)
To get started with these demos please visit [Chromely Apps](https://github.com/chromelyapps/Chromely/wiki/Chromely-Apps). 


### Running the Demos

**Notes**


- Only the [CrossPlatDemo](https://github.com/chromelyapps/demo-projects/tree/master/regular-chromely/Chromely.CrossPlat) is ready out-of-the-box for all platforms. 

- All other demos are Windows-ready by default. You can run them, but may require a bit of knowlege on how those frameworks work. 

    - For Angular/React/Vue using start url - local://dist/index.html - it uses **xcopy** (on Windows to copy the dist folder to bin/exe folder) since it may be different for other platforms, you may have to copy the dist folder manually or replace **xcopy** functionality.

    - For Blazor demos, **xcopy** is also used in [PostBuildEvent](https://github.com/chromelyapps/demo-projects/blob/ba0560987eca48d106c2000c4e835f84745755f7/blazor/ChromelyBlazor.WebAssembly/ChromelyBlazor.WebAssembly.csproj#L25). This may require replacement too (or manual copy) for Linux and MacOS.


To run the demos in different platforms - Windows, Linux and MacOS may require a few tweaks.

Assumptions:
- Visual Studio Code (You can use Visual Studio 2019 too)
- x64 architecture

After downloading the source code - either by cloning or direct download, you need to do the following:


- Ensure  appropriate runtime is selected in project file. Delete or comment out what is not needed.
````
    <RuntimeIdentifier>win-x64</RuntimeIdentifier>
    <RuntimeIdentifier>linux-x64</RuntimeIdentifier>
    <RuntimeIdentifier>osx-x64</RuntimeIdentifier>
````
 Sample - https://github.com/chromelyapps/demo-projects/blob/ba0560987eca48d106c2000c4e835f84745755f7/regular-chromely/Chromely.CrossPlat/Chromely.CrossPlat.csproj#L9
 

- Download and install .NET 6 Runtime binaries.
You will need .NET 6 runtime installed. You can install directly if you know what is required. Or you start with building and running and see what is missing.

- You can try .NET Core 3/.NET 5 too, but the [target framework](https://github.com/chromelyapps/demo-projects/blob/d637e251daed946464ab37d751f30634f1d2bea4/regular-chromely/Chromely.CrossPlat/Chromely.CrossPlat.csproj#L5) would need to be changed . The demos require .NET Core 3 at minimum.

````
dotnet restore
dotnet build
dotnet run
````
and see what errors you get. It will usually tell you what is missing.

- If you are running on MacOS for the first time, you may run into [issue #27](https://github.com/chromelyapps/demo-projects/issues/27).


**** This is just how to run the demos. For full documentation please [see wiki](https://github.com/chromelyapps/Chromely/wiki).
