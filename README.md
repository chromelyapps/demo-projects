<p align="center"><img src="https://github.com/chromelyapps/Chromely/blob/master/nugets/chromely.ico?raw=true" /></p>
<h1 align="center">Chromely Demo Projects</h1>

<p align="center">This repository holds 2 sets of demos, each with their own examples.</p>

### Regular Chromely
For more info please see - [Chromely Wiki](https://github.com/chromelyapps/Chromely/wiki).

### Chromely Apps (Angular, React & Vue)
To get started with these demos please visit [Chromely Apps](https://github.com/chromelyapps/Chromely/wiki/Chromely-Apps). 


### Running the Demos

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
 
- Configuration

The [configuration file](https://github.com/chromelyapps/demo-projects/blob/master/regular-chromely/CrossPlatDemo/chromelyconfig.json) is for Windows by default. This needs to be changed for Linux and MacOS please select [appropriate one](https://github.com/chromelyapps/demo-projects/tree/master/regular-chromely/CrossPlatDemo/config) - ensure to rename to chromelyconfig.json. The other alternative is to delete the configuration file and it will fall back to using the [default config object](https://github.com/chromelyapps/Chromely/blob/1a358986894377da8cffe87e00ce0d5893db690b/src/Chromely.Core/Configuration/DefaultConfiguration.cs#L98). 

There is also [config file option](https://github.com/chromelyapps/demo-projects/blob/master/regular-chromely/CrossPlatDemo/config/config_option.json) that shows how to select options for configuation file.

- Download and install .NET Core 3 Runtime binaries.
You will need .NET Core 3 runtime installed. You can install directly if you know what is required. Or you start with building and running and see what is missing.

````
dotnet restore
dotnet build
dotnet run
````
and see what errors you get. It will usually tell you what is missing.


**** This is just how to run the demos. For full documentation please [see wiki](https://github.com/chromelyapps/Chromely/wiki).
