# 🎵 MusicApp

Welcome to **MusicApp**, your ultimate tool for discovering, playing, and sharing music effortlessly! This project is built using **[Next.js](https://nextjs.org)**, **[TailwindCSS Framework](https://tailwindcss.com/)** for Frontend, **[Nodejs](https://nodejs.org/en)**, **[ExpressJS](https://expressjs.com/)** for Backend and **[MongoDB/Mongoose](https://www.mongodb.com/)** for storage our huge music source.

## 🚀 Features

- **Trending Songs**: Stay updated with the hottest tracks in real-time.
- **Wishlist**: Keep track of your favorite songs.
- **User Accounts**: Log in or sign up to enjoy personalized features: Wishlist management.
- **Admin Dashboard**: Comprehensive admin panel for content management
   - Category management
   - Singer management
   - Song management
   - Admin profile setting
   - Role decentralization
   - Website information setting

🌐 **[MusicApp - Live Demo (access /admin/account/login for Admin Control Panel)](https://musicapp.io.vn/)**

## 📞 Contact Us

If you have questions or need support, feel free to reach out:

- **Email**: [dtn06052005@gmail.com](dtn06052005@gmail.com)
- **Instagram**: [@trngnneee](https://www.instagram.com/trngn.neee/)

## 🛠 Running on Local

Follow these steps to set up **MusicApp** on your local machine and get it running in no time!

### Prerequisites

Before starting, ensure you have the following tools installed:

- **[Node.js](https://nodejs.org/)** (v16 or higher recommended)
- **A package manager**: [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/)

### 🛠️ How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/trngnneeee/IoT-Web
cd IoT-Web
```

### 2. Install Dependencies

#### Frontend (Next.js)

```bash
cd client
npm install
```

#### Backend (Express)

```bash
cd server
yarn install
```

### 3. Set Up Environment Variables

Create the following environment configuration files:

* `client/.env.local` for the Next.js frontend
* `server/.env` for the Express backend

These should include necessary variables such as API base URLs, JWT secrets, database URIs, SMTP settings, etc.

### 4. Run the Project

#### Start Backend Server

```bash
cd server
npm run dev
```

#### Start Frontend

```bash
cd client
yarn start
```

Your application should now be running locally.

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend API: [http://localhost:8000](http://localhost:8000)