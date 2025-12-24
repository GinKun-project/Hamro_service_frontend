# Hamro Service - Frontend

Modern Next.js frontend application for Hamro Service authentication system.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

## Features

- User authentication (Login, Signup)
- Password reset functionality
- Protected routes
- Modern UI with glassmorphism design
- Responsive design
- Form validation

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/              # Next.js App Router pages
├── components/       # Reusable React components
├── lib/              # Utility functions and API client
├── public/           # Static assets
└── middleware.ts     # Route protection
```

## License

ISC

