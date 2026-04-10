## Issue Tracker
A simple issue tracker made with inspiration from Mosh Hamedani's Next.js tutorial, adapted to a modern tech stack. 


## Technologies

  - `Next.js 16`
  - `TypeScript`
  - `Tailwind CSS`
  - `Prisma`
  - `Supabase`
  - `Radix UI`
  - `Zod (schema validation)`
  - `Auth.js (OAuth authentication)`

## Features

 ### Core

  - **Issue Management**: Create, Read, Update and Delete Issues.
  - **Status Tracking**: Issue progress is tracked through different status states (Open, In Progress, Closed).
  - **Markdown editor**: Rich text with Markdown support.
  - **Form Validation**: Client side validation with schema validation using Zod.
  
  ### Data Visualization
  - **Interactive Dashboard**: Real-time donut charts showing total amount of issues, with distribution by status and by assigned vs unassigned issues.
  - **Recent Issues**: Showcases the top 5 recent issues.

 ### User Interface
 - **RadixUI Components**: consistent theming & UI components
 - Clean, responsive interface using Tailwind CSS
 - Responsive for both desktop and Mobile devices

 ### Authentication and security
 - **OAuth**: User sign-in via Auth.js.
 - **Protected CRUD actions**: Routes and API endpoints require authentication.
  


## The Process
After learning the basics of Next.js, I wanted to build a small full‑stack project to practice the full development workflow. I followed Mosh Hamedani’s Next.js tutorial as a baseline guide, fully aware that it was already outdated by the time of Next.js 16 and Prisma 7. I actually enjoyed the challenge of adapting the project to newer technologies (including migrating from MySQL to PostgreSQL) as it pushed me to quickly figure out what worked and what didn’t.

## Running this project
If you want to run this project, follow these steps:
  1. Clone the repository.
  2. Install dependencies with `npm install`
  3. Set up your local environment
   ```
  
   DATABASE_URL=your_connection_string
   DIRECT_URL=your_direct_database_url

   FOR SETTING UP GOOGLE IN AUTH.JS
   AUTH_SECRET=your_auth_secret
   AUTH_GOOGLE_ID=your_client_id
   AUTH_GOOGLE_SECRET=your_client_secret
   ```
  4. Set up your Database
   ```
   npx prisma generate
   npx prisma db push
   ```
  5. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

  6. Open the local host port ( `http://localhost:3000`) in the browser