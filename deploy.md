# Deployment Guidelines for Vercel

This repository is optimized for deployment on Vercel. Follow these steps to deploy the application seamlessly.

## 1. Prerequisites

- A GitHub, GitLab, or Bitbucket account linked to this repository.
- A Vercel account (sign up at [vercel.com](https://vercel.com)).

## 2. Deploying via Vercel Dashboard

1. Log in to your Vercel account.
2. Click on **"Add New"** > **"Project"**.
3. Import the `campus-ride-app` repository from your linked Git account.
4. Vercel will automatically detect that this is a **Vite** project. Ensure the following settings are pre-filled:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build` or `vite build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install` (or `pnpm install` if preferred)
5. Add any necessary Environment Variables in the "Environment Variables" section if your application requires them.
6. Click **"Deploy"**.

## 3. Post-Deployment Checks

- Once the deployment is complete, Vercel will provide a live URL (e.g., `https://campus-ride-app.vercel.app`).
- Verify that the application loads correctly and routing works as expected.
- Since this is a Single Page Application (SPA), Vercel automatically handles fallback routing for Vite.

## 4. Continuous Integration (CI)

Every time you push a commit to the `main` branch on GitHub, Vercel will automatically trigger a new production build. 
Pushing to other branches will generate preview deployments, allowing you to test changes in an isolated environment before merging.

### Git Hooks Note
The repository is equipped with Husky pre-commit hooks to run linting and type-checking. This ensures that only high-quality, professional code is pushed and subsequently built by Vercel, preventing broken builds on the server.
