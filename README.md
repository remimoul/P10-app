# P10-app 🏁

<p align="center"><b>In each race, only one number counts... the 10ᵉ.</b></p>

<p align="center">
  <a href="https://www.docker.com/">
    <img alt="Docker" src="https://img.shields.io/badge/docker-ready-blue?logo=docker">
  </a>
  <a href="https://www.typescriptlang.org/">
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript">
  </a>
  <a href="https://nextjs.org/">
    <img alt="Next.js" src="https://img.shields.io/badge/Next.js-15+-black?logo=next.js">
  </a>
  <a href="https://tailwindcss.com/">
    <img alt="Tailwind CSS" src="https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?logo=tailwindcss&logoColor=white">
  </a>
</p>

Formula 1 betting application that allows users to bet on race results and participate in private and public leagues.

## 💡 Why this project?

Most F1 betting apps focus on the podium. P10-app is unique: here, the real challenge is to predict who will finish 10th!  
This twist makes every race unpredictable, fun, and gives everyone a chance to win—right until the last lap.

## 📑 Table of Contents
- [P10-app 🏁](#p10-app-️)
  - [💡 Why this project?](#-why-this-project)
  - [📑 Table of Contents](#-table-of-contents)
  - [📸 Screenshots](#-screenshots)
  - [✨ Features](#-features)
  - [🛠️ Technologies](#️-technologies)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [DevOps](#devops)
    - [Development Tools](#development-tools)
  - [🙏 Acknowledgments](#-acknowledgments)
  - [🚀 Installation](#-installation)
  - [📝 Project Structure](#-project-structure)

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/f87ae04f-901f-4ad0-9104-7815f9f59533)
![image](https://github.com/user-attachments/assets/287b92d5-8f0d-4f9d-abf3-c77e64e78259)
![image](https://github.com/user-attachments/assets/1a739cfd-a637-45f9-889d-242b78abe3b0)
![image](https://github.com/user-attachments/assets/3e9d486e-14d9-4a62-bbb4-10ab1776670e)

## ✨ Features

| Feature                        | 
|--------------------------------|
| 🏆 Bet on Grand Prix results   | 
| 👥 Private & public leagues    | 
| 🏅 Live ranking                | 
| 📱 Responsive UI               | 
| 🏁 Official F1 data            | 
| 🔒 Authentication              | 

## 🛠️ Technologies

### Backend
- **API:** Node.js with TypeScript
- **GraphQL:** Express + Apollo
- **Authentication:** Clerk
- **Documentation:** Swagger
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** JEST
- **Code Quality:** SonarQube

#### Variables environment à configurer

| key                   | value (exemple)                                     |
|-----------------------|-----------------------------------------------------|
| DATABASE_URL          | postgresql://${user}:${password}@${host}/${db_name} |
| CLERK_PUBLISHABLE_KEY | https://clerk.com/                                  |
| CLERK_SECRET_KEY      | https://clerk.com/                                  |
| CLERK_SIGNING_KEY     | https://clerk.com/                                  |
| CORS_FRONTEND_URL     | http://localhost:3000                               |
| PORT                  | 4500                                                |


### Frontend
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Components:** ShadCN
- **Animations:** Framer Motion
- **State Management:** React Context
- **Icons:** Lucide React, React Icons

#### Variables environment à configurer `.env.local` => ./front

| key                                 | value                         |
|-------------------------------------|-------------------------------|
| NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY   | https://clerk.com/            |
| CLERK_SECRET_KEY                    | https://clerk.com/            |
| NEXT_PUBLIC_CLERK_SIGN_IN_URL       | /sign-in                      |
| NEXT_PUBLIC_CLERK_SIGN_UP_URL       | /sign-up                      |
| NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL | /leagues                      |
| NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL | /leagues                      |
| NEXT_PUBLIC_BACKEND_URL             | http://localhost:4500         |
| NEXT_PUBLIC_GRAPHQL_URL             | http://localhost:4500/graphql |


### DevOps
- **Versioning:** GitHub Flow
- **CI/CD:** GitHub Actions
- **Main Branch:** Protected
- **Containerization:** Docker

### Development Tools
- **Formatting:** Prettier
- **Linting:** ESLint
- **Package Manager:** npm
- **Environment:** Docker

## 🙏 Acknowledgments

- [F1 API](https://openf1.org/) for race data
- [Ergast API](https://api.jolpi.ca/ergast/f1/) for official F1 schedule and results
- [Clerk](https://clerk.com/) for authentication
- [ShadCN](https://ui.shadcn.com/) for UI components
- [Docker](https://www.docker.com/) for containerization
- [SonarQube](https://www.sonarsource.com/) for code quality

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/remimoul/P10-app.git
cd P10-app/front
```

2. Set up the environment
```bash
cp .env.template .env
# Edit .env with your preferences
```

3. Launch the application
```bash
docker compose up --build -d
```

4. Access the application
- Frontend: http://localhost:3000
- Backend: http://localhost:4500
- API Documentation: http://localhost:4500/api
- API GraphQl Documentation: http://localhost:4500/graphql
- frontend online : https://www.grineasy.com/
- backend online : https://grineasy.online/

## 📝 Project Structure

```
P10-app/
├── front/                 # Next.js Application
│   ├── src/
│   │   ├── app/          # Pages and routes
│   │   ├── components/   # Reusable components
│   │   └── lib/          # Utilities and types
│   └── public/           # Static assets
│
├── back/                 # GraphQL API
│    ├── src/
│      ├── resolvers/    # GraphQL resolvers
│      ├── services/     # Business logic
│      └── prisma/       # Schema and migrations
│   
└── docker/              # Docker configuration
```



