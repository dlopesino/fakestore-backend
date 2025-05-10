# Proyecto Fakestore backend

## dev

1. Clonar el archivo .env.template o crear .env
2. Configurar las variables de entorno

```
PORT=
PROD=
POSTGRES_URL=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

3. Ejecutar el comando `npm i`

4. Levantar las bases de datos con el comando

```
docker compose up -d
```

5. Migrar base de datos tras un cambio en el schema o al iniciar proyecto y regenerar la carpeta postgres(solo si no existe la BD):
   `npx prisma migrate dev`

- Si ya existe la BD
  `npx prisma db pull`

6. Levantar el proyect `npm run dev`

## Testing

1. Arrancar la base de datos de testing:
   `docker compose -f docker-compose.test.yml --env-file .env.test up -d`

2. Apagar/limpiar la base de datos de testing:
   `docker compose -f docker-compose.test.yml down`
