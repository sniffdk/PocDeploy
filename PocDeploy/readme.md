# Twins Solutions frontend starter kit

This is a starter kit for building static prototypes and real world web projects. It has a Gulp-powered build system with:

- Based on Foundation
- Ships with angular 1
- Separate config file: config.yml
- Simple HTML templating using gulp-file-include: https://github.com/coderhaoxin/gulp-file-include
- Sass compilation and prefixing
- JavaScript concatenation
- BrowserSync server
- Auto generated styleguide
- Js transpiling of es2015 using babel
- For production builds:
  - CSS compression
  - JavaScript compression
  - Image compression

&nbsp;


## Requirements

To use this starter kit, your computer needs:

- [NodeJS](https://nodejs.org/en/)
- Bower
- Gulp-cli

Install Bower and Gulp-cli globally using
```bash
npm install bower -g
npm install gulp-cli -g
```
&nbsp;


## Installing

Install npm and bower dependencies:

```bash
npm install
bower install
```
&nbsp;


## Using
Start developing frontend stuff in assests folder, never work directly in public folder - it is **wiped on every build**. Compile assets with one of the following commands.

Want a **production** ready build?

```bash
gulp build --production
```

Want a single **development** build? 

```bash
gulp build
```

**Frontenders choice:** build, watch for file changes and fire up browsersync:

```bash
gulp
```

**Backenders choice:** build and watch for file changes:

```bash
gulp watcher
```
&nbsp;

