# Eskimi DSP Demo Client

## Overview

This is a demo client landing page for Eskimi DSP (Demand-Side Platform), built to showcase ad serving functionality with cookie consent management. The application allows users to configure and display programmatic advertising iframes with customizable bid request parameters, while handling GDPR-compliant cookie consent flows.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: React Query for server state, React Hook Form for form state
- **Styling**: Tailwind CSS with shadcn/ui component library (New York style variant)
- **Animations**: Framer Motion for smooth UI transitions (consent banner, ad displays)
- **Build Tool**: Vite with custom Replit plugins for development

### Backend Architecture
- **Runtime**: Node.js with Express 5
- **Language**: TypeScript with ESM modules
- **Build**: esbuild for production bundling with selective dependency bundling

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains database tables and shared constants
- **Session Storage**: connect-pg-simple for PostgreSQL-backed sessions
- **Client Storage**: localStorage for cookie consent state (`publisherCookieConsent`)

### Key Design Patterns
1. **Shared Schema**: The `shared/` directory contains types and constants used by both frontend and backend, including `PARAMS_INFO` for bid request parameters and `CONSENT_STRINGS` for GDPR compliance
2. **Component Library**: Full shadcn/ui component set in `client/src/components/ui/` with custom theming via CSS variables
3. **Path Aliases**: `@/` maps to client source, `@shared/` maps to shared code, `@assets/` maps to attached assets

### Ad Display System
- Ads are rendered via iframes with configurable dimensions and parameters
- URL construction follows legacy implementation patterns from Eskimi DSP
- Custom parameters can be added via form interface, mapped to OpenRTB bid request fields

## External Dependencies

### Third-Party Services
- **Eskimi DSP**: External ad serving platform - iframe URLs are constructed to communicate with Eskimi endpoints
- **Google Fonts**: Outfit (headings) and Inter (body) fonts loaded via CDN

### Database
- **PostgreSQL**: Required for application data and session storage
- **Environment Variable**: `DATABASE_URL` must be set for database connection

### Key NPM Packages
- `drizzle-orm` / `drizzle-kit`: Database ORM and migrations
- `@tanstack/react-query`: Server state management
- `react-hook-form` + `zod`: Form handling with validation
- `framer-motion`: Animation library
- `express-session` + `connect-pg-simple`: Session management
- Full Radix UI primitive set via shadcn/ui components