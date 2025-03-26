# Project Setup Guide

This project uses Vue 3 with TypeScript for the frontend, Supabase as the backend, and Vitest for unit testing. Follow the steps below to set up the project locally using Yarn.

## Prerequisites

Ensure you have the following software installed on your system:

- **Node.js** (v14.x or later) - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/)
- **Supabase Account** - [Create an Account on Supabase](https://supabase.io/)
- **Yarn** - If you don't have Yarn installed, you can install it by running:

```bash
npm install -g yarn
```

## Project Setup

### Step 1: Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/AbuV6/apa1-supa-full-stack-app.git
cd summer-party-form
```

### Step 2: Install Dependencies Using Yarn

Install the required dependencies using Yarn:

```bash
yarn install
```

### Step 3: Set Up Supabase

1. **Create a Supabase Project**:

   - Sign in to your Supabase account.
   - Create a new project from your Supabase dashboard.

2. **Set up your Supabase Database**:

   - Once your project is created, you'll get a connection URL and keys.
   - Set up your database tables and schema according to your project requirements.

3. **Configure Supabase in your project**:

   - Create a `.env` file in the root of your project if you don't have one already.
   - Add your Supabase project credentials (API URL and anon key) to the `.env` file like so:

   ```env
   VUE_APP_SUPABASE_URL=https://your-project.supabase.co
   VUE_APP_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Install Supabase Client**:

   If you haven't already, install the Supabase client in your project:

   ```bash
   yarn add @supabase/supabase-js
   ```

5. **Configure Supabase in your Vue Project**:

   - Create a `supabase.js` file in your `src` folder

   ```ts
   import { createClient } from "@supabase/supabase-js";

   const supabaseUrl = process.env.VUE_APP_SUPABASE_URL!;
   const supabaseKey = process.env.VUE_APP_SUPABASE_ANON_KEY!;
   export const supabase = createClient(supabaseUrl, supabaseKey);
   ```

### Step 4: Running the Development Server

To start the development server and run the Vue 3 project locally, use:

```bash
yarn run dev
```

This should launch the development server at `http://localhost:5173/`, where you can see your Vue 3 application in action.

### Step 5: Running Unit Tests

This project uses **Vitest** for unit testing. You can run the tests with:

```bash
yarn test unit
```

This will execute Vitest and run all your unit tests.

## Scripts

- `yarn run dev`: Starts the development server.
- `yarn test`: Runs the unit tests using Vitest.

## Troubleshooting

- **Supabase Connection Issues**: Make sure your `.env` file contains the correct URL and anon key for your Supabase project.
- **Missing Packages**: If you get missing package errors, try running `yarn install` again.
- **Testing Errors**: Ensure that your unit tests are correctly set up with Vitest. Check the configuration and test files if errors persist.
