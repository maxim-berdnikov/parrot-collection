# Parrot Collection
![Client](https://github.com/m-berdnikov/parrot-collection/actions/workflows/client.yml/badge.svg)
![Server](https://github.com/m-berdnikov/parrot-collection/actions/workflows/server.yml/badge.svg)

The easiest way to store/view/share your collections. 

Client - https://m-berdnikov.github.io/parrot-collection

Server - https://parrot-collection.herokuapp.com

## Description 

Когда я узнал про стек MERN (MongoDB, Express, React, Node.js), то решил попробовать собрать на нем домашний проект, который, вдобавок,  будет решать какую-то 
мою личную проблему. Проект задумывался как электронная версия моей коллекции. Затем появилась идея добавить возможность регистрирваться на сайте. 
Так что Parrot Collection - это каталог комиксов, где пользователь может собрать свою коллекцию комиксов и поделиться ей. 

Изначально была идея сделать сайт, где можно будет собирать любые коллекция - комиксы, книги, фигурки, открытки, игры (выгрузка игр из профиля Steam). 
Но пока решил сделать только с комиксами. Осталное - в далеких планах.

When I found out about the MERN stack (MongoDB, Express, React, Node.js), I decided to use it to create a home project solving the one of my own problems.

## Tech Stack

* Backend
    * Node.js
      * Express
      * Cors
      * Dotenv
      * Mongoose
* Database
    * MongoDB
* Frontend
    * React
      * Create React App
      * React Hook Form
      * React Query
      * React Router Dom
    * Axios
    * Typescript
    * Tailwind CSS

## CI/CD

Клиентская часть лежит на Github Pages, серверная - на Heroku. Настроены две задачи в GitHub Actions. Запускаются только кода меняются файлы в соответсвующих папках.

**Deploy client** собирает билд проекта (react-приложения, которое лежит в папке *client*) и отправляет его в ветку *client*. Эта ветка хостится на GitHub Pages. 

**Deploy server** отправляет папку *server* на Heroku. Уставновка зависимостей и сборка билда происходит уже там автоматически.
