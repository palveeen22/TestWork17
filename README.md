# Abelohost Shop

A simple e-commerce web application built with Next.js and TypeScript.

## Features

- User authentication with JWT
- Product catalog display
- Responsive design
- Modern UI with SCSS

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Zustand** - State management  
- **SCSS Modules** - Styling
- **Axios** - HTTP requests
- **DummyJSON API** - Backend data

## Installation

1. **Clone the repository**
```bash
git clone https://github.com/palveeen22/TestWork17.git
cd TestWork17
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the application**
```bash
npm run dev
```

4. **Open browser**
Go to [http://localhost:3000](http://localhost:3000)

## Test Login

Use these credentials to test the app:
- **Username:** `emilys`
- **Password:** `emilyspass`

## Project Structure

```
src/
├── app/              # Next.js pages
├── components/       # React components  
├── lib/             # API, stores, hooks, utils
└── styles/          # Global styles
```

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Next.js linting
npm run lint:fix     # Fix ESLint errors automatically
npm run lint:styles  # Run and fix Stylelint errors
npm run type-check   # Check TypeScript types
npm run format       # Format code with Prettier
```

## License

MIT License