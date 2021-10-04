# Parrot Collection
The easiest way to store/view/share your collections. 

Клиент - https://m-berdnikov.github.io/parrot-collection

Сервер - https://parrot-collection.herokuapp.com/

## Описание 

Когда я узнал про стек MERN (MongoDB, Express, React, Node.js), то решил попробовать собрать на нем домашний проект, который, вдобавок,  будет решать какую-то 
мою личную проблему. Проект задумывался как электронная версия моей коллекции. Затем появилась идея добавить возможность регистрирваться на сайте. 
Так что Parrot Collection - это каталог комиксов, где пользователь может собрать свою коллекцию комиксов и поделиться ей. 

Изначально была идея сделать сайт, где можно будет собирать любые коллекция - комиксы, книги, фигурки, открытки, игры (выгрузка игр из профиля Steam). 
Но пока решил сделать только с комиксами. Осталное - в далеких планах.

## Стек технологий

* Backend
    * Node.js
      * ExpressJS
* Database
    * MongoDB
* Frontend
    * React
      * Create React App
      * React Hook Form
      * React Query / Axios
      * React Router Dom
      * Typesctipt
    * Tailwind CSS

## Деплой

Клиентская часть лежит на Github Pages, серверная - на Heroku. Настроены две задачи в GitHub Actions. Запускаются только кода меняются файлы в соответсвующих папках.

**Deploy client** собирает билд проекта (react-приложения, которое лежит в папке *client*) и отправляет его в ветку *client*. Эта ветка хостится на GitHub Pages. 

**Deploy server** отправляет папку *server* на Heroku. Уставновка зависимостей и сборка билда происходит уже там автоматически.
