### Pocketbase SvelteKit with SSR

Disclaimer: This is not production reviewed/ready code. Study pocketbase docs to ensure correctness/security.

```
# docker users
docker-compose up


# podman users
podman-compose up

cp .env.example .env

# pnpm users
pnpm i
pnpm dev

# npm users
npm i
npm run dev
```

Register a provider in PocketBase, e.g. github with callback URL

> https://localhost:5173/auth/github/callback
