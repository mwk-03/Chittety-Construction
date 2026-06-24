# Chittety Construction Website

## Framework

Next.js project using the App Router, TypeScript, Tailwind CSS, Prisma, and SQLite.

## Project Summary

A premium construction supply, procurement, vendor network, wholesale supply, and project-support website for Chittety Construction.

## Main Features

- Corporate homepage
- Product catalog with 1,500 products
- Product details and specifications
- Product inquiry and request quote UI
- Services pages
- Industries served
- Vendor network
- Resources pages
- FAQ
- Contact page
- Policy and legal pages
- Mobile responsive layout
- No product images currently used
- Inquiry-email integration pending developer setup

## Local Setup

```bash
npm install
npx prisma generate
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Hosting Requirement

This is a Next.js project. Hosting should support Next.js and Node.js when API routes are used.

If the project is converted to static hosting, dynamic API routes such as inquiry email submission will require separate backend handling.

## Email Inquiry Integration Note

The current inquiry and contact UI exists, but final email integration will be completed by the developer.

The developer can connect inquiry forms to one of the following:

- SMTP/Nodemailer
- Resend
- SendGrid
- Formspree/Getform
- Existing hosting email system
- Custom backend API

Potential environment variables:

```env
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=
RESEND_API_KEY=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=
```

Do not commit real credentials.

## Important Security Note

Never upload `.env.local`, real email passwords, API keys, private credentials, or production inquiry data to public hosting or GitHub.

The included SQLite database is a clean catalog database. Confirm the production database and persistence strategy before launch.

## Deployment Checklist

- Install dependencies
- Copy `.env.example` to `.env` or configure equivalent hosting environment variables
- Add production environment variables if email delivery is enabled
- Run `npx prisma generate`
- Run the production build
- Test the homepage
- Test the product catalog
- Test product details
- Test quote and contact forms
- Test mobile layout
- Test policy pages
- Confirm persistent database storage for quote requests
- Replace the old website only after preview approval
