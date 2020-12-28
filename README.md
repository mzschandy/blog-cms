# blogCMS

A simple blog content management system app where you can make, edit, and delete blog posts. Final project for CS602 Server Side Development, built with the MERN Stack

![BlogCMS Homepage](https://raw.githubusercontent.com/mzschandy/blog-cms/main/client/public/screenshots/blogCMS_home.png)

## Configuration
The mongo database should create itself, if not go to server\db\index and change the database name to something else
```
$ cd server
$ yarn install
$ nodemon index.js
```

```
$ cd client
$ yarn install
$ npm start
```
The app starts at `http://localhost:3000/blog`
