# Hamro Service - Frontend

Modern Next.js frontend application for Hamro Service authentication system.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

## Project Structure

```
frontend/
├── app/              # Next.js App Router pages
│   ├── login/        # Login page
│   ├── signup/       # Signup page
│   ├── forgot-password/  # Forgot password page
│   ├── reset-password/   # Reset password page
│   └── home/         # Protected home page
├── components/       # Reusable React components
│   ├── AuthCard.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   └── SocialLogin.tsx
├── lib/              # Utility functions
│   └── api.ts        # Axios API client
├── middleware.ts     # Route protection
└── public/           # Static assets
```

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

## Features

- User authentication (Login, Signup)
- Password reset functionality (Forgot Password, Reset Password)
- Protected routes with middleware
- Modern UI with glassmorphism design
- Warm peach-orange gradient theme
- Responsive design
- Form validation
- Social login buttons (UI only)

## Pages

- `/login` - User login page
- `/signup` - User registration page
- `/forgot-password` - Request password reset
- `/reset-password` - Reset password with token
- `/home` - Protected home page (requires authentication)

## License

ISC

