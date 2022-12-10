# next-auth-example

This is a [Next.js](https://nextjs.org/) project with role-based-login using [NextAuth.js](https://next-auth.js/).

## Getting Started

### Create the database schema with Prisma Migrate

```bash
# up database
docker compose --profile=middleware up

# run Prisma Migrate
npm run migrate
```

see also.
https://next-auth.js.org/adapters/prisma
https://next-auth.js.org/adapters/models

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
