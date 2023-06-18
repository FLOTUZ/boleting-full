## Requeriments

 - Node JS `18.16`  https://nodejs.org/en/blog/release/v18.16.0/
 -  NPM `9.5.1` (Included in node installation)
- Download and Install `postgresql 14` from 👉 https://www.postgresql.org/

## Installation 🔼

 ### In the root of the project run:
 
#### Install dependencies
```bash
npm install
```
#### Create database 
Create a database with name **'boleting'** (preferred)

### Setup

The project uses `PrismaJS ORM` for data persistency and also uses JWT method for sessions.

#### Rename `env.example` and override with own envirment variables

`env.example` -> `env.local`

#### Set you JWT private secret key (randomize this word preferably)
See the documentation for JWT autentication method
👉 https://jwt.io/
```
JWT_SECRET="[your_secret_key]"
```
#### Set your database URI variables

See the documentation for all the connection string options: 
👉 https://pris.ly/d/connection-strings

```
DATABASE_URL="postgresql://[your_db_user]:[your_db_password]@localhost:5432/[your_db_name]?schema=public"
```
#### Run migrations for apply tables in database.
Once the database connection environment variable has been modified, you must run the migrations.

```bash
npm run prisma:migrate
```
#### Fill database with demo data and add demo users
The demo data is for show how the system works and fill with users demo data.
```bash
npm run prisma:seed
```

### Run the development server
```bash
npm run dev
```

## Developer tools 🛠
### Show Apollo Graphql Studio
Graphql studio is used for build querys, and mutations cosideting that this project uses [Apollo Server](https://www.apollographql.com/) as Graphql handler.

For access to Graphql API studio can be accessed on [http://localhost:3000/api/graphql](http://localhost:3000). 
This endpoint can be modified in `pages/api/graphql.ts`.

### Database Explorer Prisma Studio 
The easy way to see the content of your database is [Prisma Studio](https://www.prisma.io/studio) an basic visual managment system embeded on [PrismaORM](https://www.prisma.io/).

For see the embeded PrismaStudio run:

```bash
npm run prisma:studio
```
And visit 👉 http://localhost:5555/

### See the result 🤩

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
  
## Learn More 📖

To learn more about Tecnologies in this project, take a look at the following resources:

- [TypeScript](https://www.typescriptlang.org/) - Principal language in BD
- [ReactJS](https://react.dev/) - Template system for UI
- [PrismaJS](https://www.prisma.io/) - Typed ORM for developer friendly database management
- [ChakraUI](https://chakra-ui.com/) - Modular UI design system for the project.
- [Postgresql](https://www.postgresql.org/) - Selected DB for this project.
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Apollo Graphql](https://www.apollographql.com/) - Graphql Server Explorer
  

You can check out [the Boleting GitHub repository](https://github.com/FLOTUZ/boleting-full) - your feedback and contributions are welcome! 😊

## Deploy 🏗️
On build 
