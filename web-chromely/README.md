# Readme

This is a series of examples on the use of Chromely to wrap an existing website.
This can be useful when you want to just adapt an existing website with as little changes as possible 

  * web-chromely-mvc - this is based on the standard Visual Studio new asp .net core website mvc template but also includes the ability to launch via Chromely

## Project Startup

Something to be aware of is that a Chromely application will launch itself to open the window.
So therefore we need to make sure the CreateWebHostBuilder only runs once not multiple times during launch.
See the Startup.cs for examples.

## Console window

In order to avoid seeing a console window in addition to the gui window.
This should just be a case of setting the "Output Type" from "Console Application" to "Windows Application"

## wwwroot files

With some templates there is a wwwroot directory which contains static content such as compiled javascript files.
If you are trying to use Chromely to wrap a website then in some cases you may want to copy the content of this directory to the application root during a build
so that the content can be accessed via Chromely

One example of this within a .csproj file
```
<ItemGroup>
    <None Include="wwwroot\**" CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```
