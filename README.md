# boston-subway-info-app

A fun web app that provides info on Boston Subway routes and stops!

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

3. Run migrations

   ```bash
   docker compose run web python manage.py migrate
   ```

4. Create super user

   ```bash
    docker compose run web python manage.py createsuperuser
   ```

5. Import data from V3 API

   ```bash
   docker compose run web python manage.py import_subway_data
   ```

- Note: This step takes a while. Also you might want to get an API key so that you won't get rate-limited, possibly extend the rate-limit.

5. Start the django fastapi server

   ```bash
   docker compose run web uvicorn core.asgi:fastapp --reload
   ```

# Frontend set up
