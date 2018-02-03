# AngularJS Contentful Starter Kit

The project is a quick starter for AngularJS applications consuming content from Contentful, a content as a service provider.

You just have to sign-up for a Contentful account which is totally free, create a space and grab your "Management" API key for when you initialize the project. We'll import the sample content model along with the content to your space so you have a starting point to experiment from. It's quick and simple to register for a space, as is the upload process for the sample data into your own space.

You can then customize the content model to your liking as the content model and data will be under your own personal Contentful space. Shout-out to [Stefan Judis](https://github.com/stefanjudis) from Contentful for the heads up about the import & export modules.

<img src="https://images.contentful.com/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg" width="225" style="margin-left: 20px;" /><img src="https://angular.io/assets/images/logos/angular/angular.png" width="80" /><img src="https://v4-alpha.getbootstrap.com/assets/brand/bootstrap-solid.svg" width="60" />


### Features

* AngularJS application running on JS only - no compiling!
* Content & configurations pulled from Contentful via Angular libraries
* Bootstrap 4 template with SASS
* Build quickly with some preferred npm packages including gulp, bower & more
* Watch your changes reload in real time with livereload

### Prerequisite tools

* [Node](https://nodejs.org/en/download/) (npm)

At the time of writing this guide, I was on **node v8.9.4** and **npm v4.6.1**. 

*NodeJS is a javascript runtime built on Chromes V8 Javascript engine, 
and npm is simply a node package which is a package manage in itself. It allows you to install all other packages that you will be using. It can be installed with a simple installer on their website.*


### Getting Started

Just [fork](https://github.com/joshhebb/angularjs-contentful-starter) or pull down the repository and run the following commands.

**Before you start** when you run the final step of this setup, you will be asked to enter your space ID and management API key from Contentful. If you haven't registered for a account [head over to Contentful](https://www.contentful.com/sign-up/#dev) and get started.

```shell
git clone https://github.com/joshhebb/angularjs-contentful-starter.git your-project-name-here
cd your-project-name-here
npm install -g gulp               # Install Gulp (global)
npm install -g bower              # Install Bower (global)
npm run init                      # Run init task to install the node modules, libraries and then call gulp to build the app
```

If everything goes okay, you will have imported the content model into your space and built the project. You're now ready to start development!


### Contentful Integration

The project relies heavily on Contentful which is a headless CMS. It's a content as a service provider that exposes it's content through rest APIs exposing content as JSON, easily consumed in Angular.

One of the cool things about Contentful is that it ships with an export and an import API - so the project is setup to upload the sample content model that I created, along with sample content, into your space in seconds - you just need to register for a Contentful account and setup a space. No credit card required.

### Gulp Tasks

Take a quick scan through the following gulp commands thats that you can run for the project.

```shell
# build (also starts livereload for development)
gulp

# build the project 
gulp build

# start the project in dev mode (starts livereload for development)
gulp dev

# update npm & bower
gulp update
```

Open the following URLs in your browser:
* Development: http://localhost:9000/index.dev.html
* Live: http://localhost:9000/index.html

Keeping in mind you'll only be able to open the node instance if you started livereload for development.

### Developing Workflow

The process for developing with the app couldn't be easier. Once you have the project downloaded and setup start livereload via one of the various gulp commands (gulp dev, gulp) and start editing away! 

When editing in livereload - you'll see your changes reflected in the browser reflected in real time; no reloading whatsoever as long as livereload is running in the command line.

Some things to know:

* You don't need to tell the application you've created new SCSS files. It will precompile them for you
* You do need to specify when adding new javascript libraries and files in index.dev.html
* Edit index.dev.html and not index.html which is the production version of the page
* When you are in livereload, the index.dev.html page will be rebuilt in real time
* The other page index.html which would be used in production is only built when you run gulp build
* Index.html is built from index.dev.html so **always make your edits in index.dev.html**
* The production pages and resources will be minified by gulp


<img src="http://whobrokethebuild.me/wp-content/uploads/images/angular-contentful-starter.gif" />


### Adding AngularJS Libraries

The project uses one of the node packages to install libraries - bower. The process is simple - run the bower command specifying the library (and optional version) with the save command which will download the library into our lib folder which we can reference.

Install the library which will save the folder into our /lib folder.

```shell
# Install the ui-router package and save it in bower (important to use --save to update the .bower file)
bower install ui-router --save
```

Update the index.dev.html page referencing the library JS / CSS files required (minified versions preferably).

```patch
  <!-- build:css public/index.min.css -->
  <link rel="stylesheet" href="lib/downloaded-library/dist/file.min.css">
  <!-- endbuild -->

...

  <!-- build:js public/index.min.js -->
  <script src="lib/downloaded-library/dist/file.min.js"></script>
  <!-- endbuild -->
```

If you remove a library:

* Delete the files from the lib folder
* Remove the reference from bower.json
* Remove any references in the application or in index.dev.html


### Common Setup Problems

 If you run into issues with npm and are seeing weird errors - won't worry, it's unfortunately all too common! The first thing I usually do is delete the node_modules and run an 'npm install'. Keep in mind that folder is not checked into the repository, and is easily rebuilt from the information in package.json.

 * Delete node_modules in project
 * run 'npm cache clean'
 * run 'npm install'

If that doesn't work, I usually assume it's a node.js (or its module npm) versioning problems. Keep in mind npm is a component of node.js, so first verify your node version first:

```shell
# Check the node version
node -v

# Check the npm version
npm -v
```

At the time of writing this, I am on **node.js v8.9.4** and **npm v5.6.0** which are the latest production releases. If you still have problems, check out my blog post about wiping and reinstalling node & npm fresh:

[http://whobrokethebuild.me/fixing-broken-node-install-windows/](http://whobrokethebuild.me/fixing-broken-node-install-windows/)

