# matrix-ui-plugin-boilerplate plugin

![Plugin Build](https://github.com/MatrixRequirements/matrix-ui-plugin-boilerplate/actions/workflows/main.yml/badge.svg)

Matrix UI Plugins are implementations of the IPlugin interface.
They can be registered in the plugin manager at startup and will be queried
in different situations, for example to add new UI Controls or entries to 
the tree or pages in the adminConfig.

This  example registers a new Dashboard, a control, an action in the action menu, a config page on the project level 
and a config page at the serverSetting level. You can use this project as template for other plugin. 

It can be compiled using the standard
Typescript build process into a single JS file and loaded into Matrix.

## Plugin metadata
Matrix Client plugins require a metadata file with information about the plugin. The general structure of the plugin is 
expected to look like this:

(Directory) org.yourcompany.pluginname
          |- matrix.json
          |- scriptfile.js
          |- (optionally) another scriptfile ...

This repository contains Github actions that will create the correct folder structure and put everything in a zip
file. You can then download the resulting zip file from Github.

The matrix.json file needs the following basic information: 
* id
* name
* version
* matrixVersion
* type

On build the matrix.json file will be checked for correct content. You can also do the test yourself using the schema file
`resource/plugin-metadata.json` or from the command line with:

    npm run check:metadata


## Installation
To simplify installation without requiring disk access to a Matrix instance
you can use a special developer setup and a GitHub action to build the code.

* Use this project as template
* Go to the CI action and start the workflow [rename the project from template](../..//actions/workflows/template.yaml) 
* Modify the code and check it into GitHub
* Make sure the build succeeds (look [here](../../actions/workflows/main.yml))
* Login into the [developer instance](https://developer.matrixreq.net)
* Create a new UI entry in the 
  [PLUGINS project](https://developer.matrixreq.net/PLUGINS/F-UI-2)
* Press the Install"  button
* Reload the browser

This should install the script on the server and load it into the browser. The
naming reflects the repository name, for example `https://developer.matrixreq.net/static/js/GitHub-MatrixRequirements_boiler-plate.js`

## APIs
Matrix has a very large set of APIs, which are accessed through the
`matrixApi` object installed on the global context. You can
examine the api in the `./node_modules/matrix-requirements-api` folder.

## Local build 

* Run this command to install required packages : `npm install`
* Edit the file `webpack.config.js` to give a unique name to your plugin (the current name is `UIPluginBoilerplate`.
* Run this command to build the package `npm run build`. This will compile and package the ts code to a `UIPluginBoilerplate.js` 
and `UIPluginBoilerplate.js.map` in the `./dist` directory.

## Test the local build
This project contains a test proxy that can load your plugin in a running instance. To do
this it will modify the main page of the Matrix instance to include your script file
and then server the script file from your local disk. Everything else will be fetched from
your remote Matrix instance.

Setup:

* Copy Proxy.env.template to Proxy.env and set your instance name
* cd into dev-proxy and `npm install` to get all dependencies
* Make sure the plugin has been built
* Close Chrome (if running)
* In this directory, run `npm run proxy` to launch the proxy. 

This should open a new Chrome and if you inspect the main page you should see
`<script src="/mypluginscript.js"></script>` at the end of the page. This URL
will load the local `dist/Main.js` script and will always be up to date with your
local build.

