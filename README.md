# React + Laravel = News Aggregator project

**PHP 8.1 + MySQL 8 + Nginx 1.21.4 + Adminer**

## Setup

See definitions in the `.env` files.

Add to `/etc/hosts` file lines:

```
127.0.0.1 adminer.test
```

Copy `/.env.example` into `/.env` file and specify all needed settings.

### front-end (React)

install `node_modules`

```
cd frontend
npm install
```

It's been selected three types of News API: <a href="https://open-platform.theguardian.com/access/">The Guardian</a>, <a href="https://newsapi.org/">NewsAPI</a> and <a href="https://developer.nytimes.com/">The New York Times News</a>. The corresponding API keys are needed to be specifed in `/frontend/.env` file:

```
REACT_APP_GUARDIAN_KEY=
REACT_APP_NEWSAPI_KEY=
REACT_APP_NYTIMES_KEY=
```

### back-end (Laravel)

install vendor modules, create database and setup initial dataset:

```
cd backend
composer install
php artisan migrate
php artisan db:seed
```

## Docker

start all necessary containers:

```
docker-compose up --build
```

## Database

### For Adminer

![adminer-db](./doc/adminer-db.png)

![adminer-db](./doc/adminer-db-logged.png)

## Launch

Front-end is built in React

```
http://localhost:3000/
```

all API calls are made to backend using `Header:Authorization` key. The value of this keys is retrived from `.env` files from both projects (Laravel & React) and it must be matching. User's uuid is stored in localStorage.

