# 🏥 DocsAura — Healthcare Platform

Morocco's leading healthcare platform built with React + Vite.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## 🔑 AI Chat Setup (Optional)

The AI chat widget uses the Anthropic API. Without a key it shows a graceful error fallback.

1. Copy `.env.example` → `.env`
2. Add your Anthropic API key
3. Restart the dev server

## 📦 Tech Stack

- **React 19** + **Vite 8**
- **React Router DOM 7** — client-side routing with lazy loading
- **Tailwind CSS v4** — utility-first styling
- **i18next** — EN / FR / AR with RTL support
- **react-icons** — icon library
- **Anthropic API** — AI chat assistant

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/          # Button, Input, Badge, StarRating
│   ├── layout/      # Navbar, Footer, Layout
│   └── common/      # Cards, SearchBar, BookingForm, ChatWidget
├── pages/           # All page components (lazy-loaded)
├── data/            # Moroccan doctors, clinics, labs data
├── context/         # Auth, Toast, Language contexts
├── hooks/           # useBookingForm
├── utils/           # Sanitization, validation, rate limiting
├── i18n/            # Translations (EN/FR/AR)
└── routes/          # ProtectedRoute
```

## 🔐 Security Notes

- JWT simulated via sessionStorage (HTTP-only cookies recommended for production)
- All user inputs sanitized to prevent XSS
- Rate limiting on AI chat (10 msg/min)
- No secrets hardcoded — use `.env`

## 🌍 Languages

Switch between English, French, and Arabic (with RTL) via the navbar language selector.

## 📄 Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/doctors` | Doctors List |
| `/doctors/:id` | Doctor Details + Booking |
| `/clinics` | Clinics List |
| `/clinics/:id` | Clinic Details + Booking |
| `/labs` | Laboratories List |
| `/labs/:id` | Lab Details + Test Booking |
| `/about` | About DocsAura |
| `/contact` | Contact |
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Forgot Password |
| `/verify-code` | Email Code Verification |
| `/update-password` | Update Password |
