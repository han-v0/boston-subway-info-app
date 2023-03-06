# boston-subway-info-app

A fun web app that provides info on Boston Subway routes and stops!

# Backend set up

1. cd to the `boston-subway-info-app-backend` folder

   ```bash
   cd boston-subway-info-app-backend
   ```

2. Copy `.env.tmpl` to `.env`

   ```bash
   cp .env.tmpl .env
   ```

3. Run poetry install

```bash
  python poetry install
```

3. Run migrations

   ```bash
   python manage.py migrate
   ```

4. Create super user

   ```bash
    python manage.py createsuperuser
   ```

5. Import data from V3 API

   ```bash
   python manage.py import_subway_data
   ```

- Note: this step takes a while

5. Start the django server

   ```bash
   python manage.py runserver 0:8002
   curl localhost:8002/api # confirm some sort of response
   ```

## Testing and Debugging

1. Run the tests printing the output

   ```bash
   docker compose run web pytest -svvra
   ```

2. Run the tests keeping the test database for the next run

   ```bash
   docker compose run web pytest --reuse-db
   ```

# Frontend set up
