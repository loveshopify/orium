## Introduction
All theme sources are in `sources` directory and this is our main folder where we do our development.

The files from `sources` compiles to `build` directory by our theme development tool. We use theme development tool and compilation from sources instead of Shopify theme editor, because we can use modern features and best practices, while Shopify theme editor is very limited for front-end development. With this workflow we can also use our favorite code editor to have more comfortable development. Shopify theme editor allows to quickly navigate between files, but that's all and it still hasn't important code editor features like: search by code and replace code, dark theme to reduce eye tiring, code autocomplete for speeding up coding process, task runners for advanced coding techniques etc. 

The `build` folder is native Shopify theme, it can be zipped and installed manually to theme editor, but we're using special command for installation (aka deployment) to automate process for publishing theme updates. Don't edit any code inside this folder, because your changes will be overwritten from `sources` directory each time the developer works with theme's source code. There is only 1 case when you should work with `build` folder and it's described below in deployment warning. And try to not edit code in Shopify theme editor, since we're developing our projects locally using theme development tool and we're syncing changes between each other using git, so updates from theme editor may be ignored and overwritten by chance.

## Quick Start
#### To use this starter theme and theme development tool, Node.js and Gulp v4 should be installed in your system.

The first 5 steps are one-time installation steps for each project, they takes up to 15 minutes. 6th step is repeatable step during theme development.

1) Clone this starter theme to your pc: `git clone git@gitlab.com:binaery-team/goats-theme.git`

2) Create project repository in Gitlab

3) Change git origin url from this starter theme url to project git url you've just created: `git remote set-url origin <project-repository-url>`

4) You should run `npm i` command to install javascript libraries we're using in theme and another needed packages for our theme development tool

5) Open config.yml and enter credentials for shopify store's theme you plan to work with. We have 3 environments: development, staging and production, please read more below

6) Then you should use our main theme development tool command: `gulp watch`. Once this command prompted, it will be running in background mode and showing you log output of your development till you cancel it from your terminal. But the main aim of this command is watch your code changes in `sources` folder, do their compilation to `build` folder and then upload the compiled files into Shopify store's theme. It also watches images and fonts you're adding to `sources/assets` and copies them to `build/assets` folder

Additional commands:

Run `gulp deploy` to make full theme deployment (the key difference from `gulp watch` is that watch is doing partial deployment and only for files which you're changing while this command is running in your terminal). Once this command runs, it compiles theme from `sources` folder to `build` folder and deploys all theme files from `build` folder to Shopify store theme.
If you just need to compile theme from sources, call `gulp build`. Then you can create zip archive of the theme, for example.

### Environments
`gulp watch` and `gulp deploy` commands can be called with special parameters to use environments from our `config.yml` file:
- development (this is default environment, use it for theme development)
- staging (use it to test our theme inside client's site)
- production (use it for theme deployment to client's site live theme, please read warning below before using this environment)

For example: `gulp watch --staging`

**DEPLOYMENT WARNING:** some apps or developers makes their changes in production (aka live) theme on Shopify theme editor level, while we're developing our theme locally on our computers using theme development tool and git. If you run `gulp deploy`, of course such updates will be overwritten. To avoid this situation, each time you want to do full deployment for your changes to store's production theme you should make backup and sync such updates with our theme sources: 
1. Create backup of live theme in Shopify store themes page and call this backup like "Goats Theme Backup current_date". This needs for case if something will be wrong, so you can publish last stable version of production theme using this backup.
2. Run this command: `gulp sync --production`. This command will just download all current code from production theme to our `build` folder. As alternative for this command, you can download zip archive with production theme from Shopify, it will be faster, and then you can unpack all code to our `build` folder.
3. Once theme was downloaded from Shopify to `build` folder, you should review changes and copy these changes to project `sources`. Since we're using git, it's easy to compare changes between Shopify production theme and our build theme.
4. Please commit this integration (I prefer this message for such commit: "sync with live theme code")
5. Then you can run `gulp deploy --production`.

This is our current minus of using theme development tool and Binaery is working on solution for easier deployment. If this deployment process is hard for you, please ask Binaery and he'll do that quickly. Also, you shouldn't do these steps when you're working with development or staging theme, except the cases when you need to sync theme's changes which made by apps or by other developers which are not using our workflow and using theme editor.


## Theme Development Tool (TDT) features


### Assets splitting
`sources/assets`

By default, Shopify hasn't ability to split theme assets (styles, javascripts, images, fonts) to multiple folders, so the theme assets folder doesn't looks good and it takes time to find the file you plan to work with. With TDT we have better organisation for our assets.

### Styles
`sources/assets/styles`

TDT allows us to use all power of scss preprocessor, such as code splitting and sass variables. Also it has autoprefixer, so our code is clean, minified and we don't miss css vendor prefixes. 

Purging unused css feature has recently added. It purges all css for elements which are not on our theme liquid files.
That's why we added `extra.scss` to define styles for DOM elements which are coming dynamically from apps or javascript.

`sources/assets/extra.scss`

TODO: Update our scss to use it with Shopify scss.liquid variables, and we can use all power of Shopify theme settings for theme styles.


### Javascripts
`sources/assets/javascripts`

TDT allows us to use all modern javascript practices, such as es6 modules for code splitting, arrow functions, array expands etc. At same time, this code will be cross-browser because it's using Babel transpiler.

TODO: Javascript refactoring


### Images
For now, TDT is just copying all images from `sources/assets/images` to `build/assets`.

Use snippets/rimage.liquid to implement lazyloading images
Add png/jpg optimizer to Gulp

##### SVG icons
Place any svg files icons you want to use to `sources/assets/images`. Then just include these icons by this code: 

`<svg src="icon-name.svg"></svg>` 

inside .liquid files markup. TDT will replace this shortcode to svg file internal code.

TODO: Add svg css inliner to theme development tool. Some svg files are using css classes and styles in svg files which are using same class names are overlapping between them. SVGO package has such inliner.


### Fonts
Place font files to `sources/assets/fonts` and include them in `sources/assets/styles/base/_fonts.scss`, or use typekit, whatever is better for the project you're working on. If you're using 1st way, the font files will be copied automatically to `build/assets`.


### Advanced sections
TDT allows us to split sections `schema` configurations to their own json files. This is very helpfull to have clean code, fast navigation between markup and settings, our code editors shows better syntax highlighting and main part of this feautre is now it's easy to clone (and then maintain) sections to have unique content from each individual section on multiples pages.

TODO: 
1. add new settings to each section for background png/jpg and foreground svg images
2. split theme sections settings to 3 levels, so we can show only 25%, 50% or 100% of settings depending on project and client's aims.
