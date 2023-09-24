# LufthansaSearchPdf

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.1.
#  Angular-Project-Amigurumi

This application is used to search for effective panels by submitted documentation of a customer of Lufthansa Technician Sofia. Upload the pdf documentation for a particular aircraft , then upload the excel with certain panels . After pressing the button submit is displayed in the result section whether there are or not matches and how many are .

The front end of the project has been deploy in Firebase: [https://lufthansa-pdf.web.app/](https://lufthansa-pdf.web.app/)

## Short description
 - This project was bootstrapped with [Angular](https://github.com/facebook/angular).
 - Single Page App (SPA) 
 - Deploy in Firebase [https://lufthansa-pdf.web.app/](https://lufthansa-pdf.web.app/)
 ## Usage
- npm i
- ng serve

## Languages and libraries used
 - Javascript
 - HTML/CSS
 - Bootstrap
 - electron-packager
 - ng2-pdf-viewer
 - pdf.js
 - rxjs
 - xlsx

 ## Architecture - the project is structured
 
 - `dist` folder contains global asssets for the app.
 - `src` folder contains the app, index.html, styles.css, environments and folders for the components, modules, app.interceptor.ts,routing.module and service.
 - `App_Lufthansa-win32-x64` 
 
# Routes views

## Home Page
![](/start.jpg)

## Validation Error
![](/ValidationError.jpg)

## Result
![](/result.jpg)

## No match
![](/Nomatch.jpg)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
