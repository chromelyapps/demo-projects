# Readme

This is a series of examples on the use of Chromely to wrap an existing website.
This can be useful when you want to just adapt an existing website with as little changes as possible 

## Templates

### web-chromely-mvc

This example is based on the standard Visual Studio new asp .net core website mvc template but also includes the ability to launch via Chromely

### web-chromely-bootstrap4

This is a more advanced single page application example using webpack, typescript, bootstrap4, chromely.
For the launch profile select Web.Chromely.Bootstrap4 to run as a website, or Chromely to run as a Chromely application.

This supports debugging / breakpoints within typescript.
(make sure to select Chrome as the browser, and Web.Chromely.Bootstrap4 as the launch profile to launch as a website to debug).
Hot page reloading (the typescript / vue / client side code can be edited on the fly while debugging as a website and it should auto reload).

To install the npm packages
```
cd web-chromely-bootstrap4\ClientApp
npm install
```

To force a rebuild of the webpack files (this should be auto triggered on change via webpack)
```
cd web-chromely-bootstrap4\ClientApp
npm run build dev
```

## Notes

### Project Startup

Something to be aware of is that a Chromely application will launch itself as a child process to open the window.
So therefore when using CreateWebHostBuilder we need to make sure it only runs once not multiple times during launch.
See the Startup.cs for examples.

### Console window

In order to avoid seeing a console window in addition to the gui window.
This should just be a case of setting the "Output Type" from "Console Application" to "Windows Application" within the project properties

### wwwroot files

With some templates there is a wwwroot directory which contains static content such as compiled javascript files.
If you are trying to use Chromely to wrap a website then in some cases you may want to copy the content of this directory to the application root during a build
so that the content can be accessed via Chromely.

One example of this within a .csproj file
```
<ItemGroup>
    <None Include="wwwroot\**" CopyToOutputDirectory="PreserveNewest" />
</ItemGroup>
```
