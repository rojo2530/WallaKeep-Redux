# WallaKeep-React

## Requirements & dependencies 

* Axios
* React
* Node and NPM
* Bulma
* Antd
* Git (not necessary but recommended)
* MongoDB
* Express

## Introduction

WallaKeep is a SPA application made with React, displays a list of adverts on the front where you can filter by name, price, tag and type (Sell or Buy). 
Then you can see the detail of each advert if you click on it or edit.
Too, you can create a new Advert.
Use Redux for save Application's user and save adverts.

WallaKeep is mobile first.

Use API inside server folder , in next link you can find more info about API:

https://github.com/IsmaelB83/keepcoding-backend-node

Attach App's Capture:

![Alt text](https://github.com/rojo2530/WallaKeep-React/blob/master/Captura2.JPG)

## Install

* Clone Repo with https://github.com/rojo2530/BeerFront.git
* Make sure MongoDB server is running.
* Inside folder server and client, execute `npm install`
* Inside folder server, execute `npm run init` , this command import data into Database.
* Inside Folder server, execute `npm start` , this commando start api server
* Finally execute `npm start` inside client folder

Note: By default , server API is running in port 3001

## Development Notes

### Test
For testing you can use next command inside client folder:

`npm run test`

The following has been tested:

* Two sync action
* One async action
* One reducer
* Component DetailAdvert with snapshot testing
* Check Component DetalAdvert calls an action function store.

### Hooks

The loading Component has been passed from classes to hooks.

### HOC && render props

A HOC withFormHandler has been created to encapsulate the onChange function and value property of the inputs. 
A form could be written as follows:

`<Form onSubmit={...} initialValue={{username: '', lastname: ''}}>
    <Input type="text" name="username" />
    <Input type="text name="lastname" />
</Form>`

Application too use render props to create a component called PrivateRoute that checks whether the user is registered or not.

### Redux

The initial status for redux is as follows:

` filter: {},
  user: {},
  adverts: [],
  ui: {
    isFetching: false,
    error: null,
  },
  currentAdvert: null,
  currentPage: 1,`

* Filter: saves the search filter. 
* user: saves the register user, is persisted with localstorage. 
* adverts: saves the list of ads that the user has searched for with the corresponding filter.
* ui: use for calls external api
* currentAdvert: The last advert detail view, created or edited. 
* currentPage: The page display in list advert.

Application has a small cache for detail view adverts, if the ad detail that the user wants to see is already stored in the store in currentAdvert then it is served directly from redux instead of calling the api.

For calls to Api use middleware Redux Thunk.

*** Other Notes

In chrome developer tools, in console tab you could view next warning:

`index.js:1375 Warning: Failed prop type: The prop `pages` is marked as required in `Pagination`, but its value is `undefined`.
    in Pagination (at Adverts.jsx:190)
    in Adverts (created by Context.Consumer)
    in Route (at App.js:32)
    in Switch (at App.js:31)
    in Router (created by BrowserRouter)
    in BrowserRouter (at App.js:30)
    in ErrorBoundary (at App.js:28)
    in App (at src/index.js:10)`
    
This error is because because the api does not return the total number of adverts, it is impossible to know the total number of pages beforehand.
