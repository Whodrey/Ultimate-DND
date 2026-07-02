# Ultimate-DND

## Dev Campaign

The dev Docker stack seeds one example campaign automatically:

- `Dev Campaign: Shattered Coast`

Start the dev stack with:

```sh
docker compose -f compose.dev.yml up -d
```

To recreate the sample data from scratch:

```sh
docker compose -f compose.dev.yml exec backend npm run seed:dev:reset
```
