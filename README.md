# Angular2 based simple CMS for Samuel Netocny (samuelnetocny.eu)

## Instalation

Install [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm) first.

Install Grunt CLI using `npm install -g grunt-cli`. Use `sudo` on Linux or Mac if necessary.

## Development

Then run `npm install` to download necessary packages.

Run `npm start`, `npm run dev` or `grunt dev` to start the server/browser.

Run `npm run clean` or `grunt clean` to clean all non-project files (excluding node_modules). 

Run `npm run build` or `grunt cleanBuild` to build clean and afterwards to build SCSS files.

## Distribution

Run `npm run dist` or `grunt dist` to build a production version into `dist` folder. The production version contains only files required to run on production server that are minified first.      
