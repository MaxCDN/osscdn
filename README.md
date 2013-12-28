# Open Source Software CDN

OSSCDN is a free CDN powered by [MaxCDN](http://www.maxcdn.com) that hosts all kinds of Open Source projects.

This includes but not limited to JS libraries, jQuery plugins, Linux Mirrors, executable files and more.

## Submission Process

### Rules

* All filenames and directories should be lowercase.
* No spaces are allowed.
* Follow existing structure and be consistent with other projects.

### Pull Requests
1. Fork the repository
2. Add or Update the project you wish following the rules and file structure.
3. Send a Pull Request including a description



### Other
* If you wish to host files larger than 10MB please contact [Justin](https://github.com/jdorfman) or [Dmitriy](https://github.com/jimaek)

## Development

The project has been separated in the following distinct parts:

* files/ - The files served by the CDN.
* frontend/ - The frontend served at osscdn.com
* md5checker/ - A utility script that can be used to verify md5 checksums of the files at the CDN and at the repository
* walker/ - A utility script that constructs data used by the frontend based on files served there

Usually a directory contains a README.md describing its contents in further detail.

### Getting the Project Running

The instructions below show how to get project dependencies installed and the project running:

1. Make sure you have a recent version of [Node.js](http://nodejs.org/) installed. It should include NPM, a package control by default. We'll use that to fetch our dependencies.
2. In addition you are going to require [Bower](http://bower.io/). That will be used to deal with some of the frontend dependencies. Install it using npm like this `npm install bower -g`. After that you should have `bower` command available.
3. The frontend relies on [Grunt](http://gruntjs.com/) for various tasks. Install the terminal client using `npm install grunt-cli -g`. After this you should have `grunt` command available.
4. Execute `npm install` at walker/
5. Execute `npm install` at frontend/
6. Execute `bower install` at frontend/
7. Execute `node ./generate_data.js` at project root. This will output some data for frontend to use.
8. Execute `cd frontend`
9. Execute `grunt server`. This will run a development server and open the app in your browser. As you make changes to the project it will refresh the browser automatically.

### Production Server

The frontend contains our Node.js based production server. Provided you have installed the project dependencies, simply execute `frontend/serve.js` to get it running. Note that it expects to find the data at `dist/` directory. The directory itself may be generated using `grunt build`. That will wipe the contents of the directory entirely. After this you should symlink your data so that `dist/data` directory points at it.
