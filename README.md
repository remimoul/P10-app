# P10-app 🏎️

Formula 1 betting application that allows users to bet on race results and participate in private and public leagues.

## ✨ Features

- 🏆 Bet on Grand Prix results
- 👥 Create and join private & public leagues

- 🏅 Compete with friends
- 📱 Modern responsive interface

## 🛠️ Technologies

### Backend
- **API:** Node.js with TypeScript
- **GraphQL:** Express + Apollo
- **Authentication:** Clerk
- **Documentation:** Swagger
- **Database:** PostgreSQL with Prisma ORM
- **Testing:** JEST
- **Code Quality:** SonarQube

### Frontend
- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **Components:** ShadCN
- **Animations:** Framer Motion
- **State Management:** React Context

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

## 🚀 Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/P10-app.git
cd P10-app
```

2. Set up environment
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
- Backend: http://localhost:4000
- API Documentation: http://localhost:4000/api-docs

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
│   ├── src/
│   │   ├── resolvers/    # GraphQL resolvers
│   │   ├── services/     # Business logic
│   │   └── prisma/       # Schema and migrations
│   └── tests/            # Unit and integration tests
│
└── docker/              # Docker configuration
```

## 🙏 Acknowledgments

- [F1 API]() for race data
- [Clerk]() for authentication
- [ShadCN](https://ui.shadcn.com/) for UI components
