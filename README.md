# Open Source Software CDN [![Build Status](https://travis-ci.org/MaxCDN/osscdn.png?branch=master)](https://travis-ci.org/MaxCDN/osscdn)

OSSCDN is a free [CDN](http://en.wikipedia.org/wiki/Content_delivery_network)
powered by [MaxCDN](http://www.maxcdn.com) that hosts all kinds of Open Source projects.

This includes, but not limited to, JS libraries, jQuery plugins, Linux Mirrors,
executable files and more.


## [Submit files](https://github.com/jsdelivr/jsdelivr#how-to-submit-or-update-projects)




## Development

The instructions below show how to get project dependencies installed and the project running:

1. Make sure you have a recent version of [Node.js](http://nodejs.org/) installed. It should include NPM, a package control by default. We'll use that to fetch our dependencies.
2. In addition you are going to require [Bower](http://bower.io/). That will be used to deal with some of the frontend dependencies. Install it using npm like this `npm install bower -g`. After that you should have `bower` command available.
3. The frontend relies on [Grunt](http://gruntjs.com/) for various tasks. Install the terminal client using `npm install grunt-cli -g`. After this you should have `grunt` command available.
4. Execute `npm install` at frontend/
5. Execute `bower install` at frontend/
6. Execute `cd frontend`
7. Execute `grunt server`. This will run a development server and open the app in your browser. As you make changes to the project it will refresh the browser automatically.

### Production Server

The frontend contains our Node.js based production server. Provided you have installed the project dependencies, simply execute `frontend/serve.js` to get it running. Note that it expects to find the data at `dist/` directory. The directory itself may be generated using `grunt build`. That will wipe the contents of the directory entirely. After this you should symlink your data so that `dist/data` directory points at it.


## License

OSSCDN code is released under the [MIT License](/LICENSE).
