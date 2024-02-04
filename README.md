# News Aggregator Website 
The task is to create a news aggregator website designed to collect articles from various sources and present them in a user-friendly and visually appealing format. This project demands the utilization of Laravel for the backend development and React for the frontend implementation.

## Requirements:
### User Authentication and Registration
Users must have the capability to register an account and subsequently log in to the website, facilitating the preservation of their preferences and settings.

###  Article Search and Filtering
The system should enable users to conduct article searches based on keywords and refine the search results by a date, category, and source.

### Personalized News Feed
Users should be able to customize their news feed by selecting their preferred sources, categories, and authors.

### Mobile-Responsive Design
The website's layout and functionality must be optimized for seamless viewing across various mobile devices.


#### Tech stack
***Backend: PHP 8.1 + MySQL 8 + Nginx 1.21.4 + Adminer***

## Setup

Refer to the configuration settings in the `.env` files.

Add the following lines to the `/etc/hosts` file:
```
127.0.0.1 adminer.test
```

- Duplicate `/.env.example` into `/.env` file and specify all relevant settings.

### Frontend (React)

install required `node_modules`:
```
cd frontend
npm install
```

Three types of News API have been selected: <a href="https://open-platform.theguardian.com/access/">The Guardian</a>, <a href="https://newsapi.org/">NewsAPI</a> and <a href="https://developer.nytimes.com/">The New York Times News</a>. The corresponding API keys are needed to be specifed in `/frontend/.env` file:
```
REACT_APP_GUARDIAN_KEY=
REACT_APP_NEWSAPI_KEY=
REACT_APP_NYTIMES_KEY=
```

### Backend (Laravel)

Install vendor modules, create the database and setup the initial dataset:
```
cd backend
composer install
php artisan migrate
php artisan db:seed
```

## Docker

Initiate all necessary containers:
```
docker-compose up --build
```

## Database

### For Adminer

![adminer-db](./doc/adminer-db.png)

![adminer-db](./doc/adminer-db-logged.png)

## Launch

Open your preferred web browser and enter the following URL:
```
http://localhost:3000/
```
Ensure that you have initiated the project by running `npm run dev` in the terminal. This command will start the development server and make the website accessible at the specified URL.

All API calls are directed to the backend using the `Header:Authorization` key. This key's value is retrieved from the `.env` files of both Laravel and React projects and must correspond. The user's UUID is stored in localStorage.

