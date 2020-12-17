<p align="center"><img src="https://github.com/chromelyapps/Chromely/blob/master/nugets/chromely.ico?raw=true" /></p>
<h1 align="center">Chromely Demo Projects</h1>

<p align="center">This repository holds 2 sets of demos, each with their own examples.</p>

### Regular Chromely
For more info please see - [Chromely Wiki](https://github.com/chromelyapps/Chromely/wiki).

### Chromely Apps (Angular, React & Vue)
To get started with these demos please visit [Chromely Apps](https://github.com/chromelyapps/Chromely/wiki/Chromely-Apps). 


### Running the Demos

**Notes**


- Only the [CrossPlatDemo](https://github.com/chromelyapps/demo-projects/tree/master/regular-chromely/CrossPlatDemo) is ready out-of-the-box for all platforms. 

- All other demos are Windows-ready by default. You can run them, but may require a bit of knowlege on how those frameworks work. 

    - For Angular/React/Vue using start url - [local://dist/index.html](https://github.com/chromelyapps/demo-projects/blob/a844ab6dfc2ca581f22c4dd709a132daca6a930e/angular-react-vue/ChromelyAngular/chromelyconfig.json#L4) it uses **xcopy** (on Windows to copy the dist folder to bin/exe folder) since it may be different for other platforms, you may have to copy the dist folder manually or replace **xcopy** functionality.

    - For Blazor demos, **xcopy** is also used in [PostBuildEvent](https://github.com/chromelyapps/demo-projects/blob/a844ab6dfc2ca581f22c4dd709a132daca6a930e/blazor/WebAssemblyChromelyControllers/WebAssemblyChromelyControllers.csproj#L16). This may require replacement too (or manual copy) for Linux and MacOS.


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
 Sample - https://github.com/chromelyapps/demo-projects/blob/495b630c19953581fff9bea57bf95e1693893df1/regular-chromely/CrossPlatDemo/CrossPlatDemo.csproj#L7
 

- Download and install .NET Core 3 Runtime binaries.
You will need .NET Core 3 runtime installed. You can install directly if you know what is required. Or you start with building and running and see what is missing.

````
dotnet restore
dotnet build
dotnet run
````
and see what errors you get. It will usually tell you what is missing.

- If you are running on MacOS for the first time, you may run into [issue #27](https://github.com/chromelyapps/demo-projects/issues/27).


**** This is just how to run the demos. For full documentation please [see wiki](https://github.com/chromelyapps/Chromely/wiki).
