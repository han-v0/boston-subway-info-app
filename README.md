# boston-subway-info-app

A fun web app that provides info on Boston Subway routes and stops! This project utilizes V3 API, which provides information regarding MBTA (Massachusetts Bay Transportation Authority) schedules (info about the API and how to get an API key are found [here](https://www.mbta.com/developers/v3-api)). Below are the steps to set up this project.

# Backend set up

- This installation assumes that you have docker, python, django, and poetry installed!

1. cd to the `boston-subway-info-app-backend` folder

   ```bash
   cd boston-subway-info-app-backend
   ```

2. Copy `.env.tmpl` to `.env`

   ```bash
   cp .env.tmpl .env
   ```

3. Build docker containers

   ```bash
   docker compose build --no-cache
   ```

4. Run migrations

   ```bash
   docker compose run web python manage.py migrate
   ```

5. Create super user

   ```bash
    docker compose run web python manage.py createsuperuser
   ```

6. Import all routes and stops data from V3 API

   ```bash
   docker compose run web python manage.py import_subway_data
   ```

- Note: This step may take a while. Also you might want to get an API key so that you won't get rate-limited, possibly extend the rate-limit.

7. Map stops to their routes (this step to address rate limiting problems)

   ```bash
   docker compose run web python manage.py map_stops_to_routes
   ```

- Note: This step also may take a while. Getting an API key is recommended.

8. Start the django fastapi server

   ```bash
   docker compose run web uvicorn core.asgi:fastapp --reload
   ```

# Frontend set up

- This installation assumes that you have npm installed!

1. cd to the `boston-subway-info-app-frontend` folder

   ```bash
   cd boston-subway-info-app-frontend
   ```

2. Copy `.env.tmpl` to `.env` and set config variables accordingly

   ```bash
   cp .env.tmpl .env
   ```

3. Install npm packages

   ```bash
   npm install
   ```

4. Start the react app!

   ```bash
   npm run start
   ```
