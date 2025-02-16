# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## State Management

### Redux Setup

This project uses Redux for state management and API integration. The setup involves the following steps:

1. **Store Configuration**: The store is configured in [`src/redux/store.ts`](src/redux/store.ts). It includes the `auth` reducer and the `baseApi` middleware for handling API requests.

2. **Slices**: The state is divided into slices. For example, the `auth` slice is defined in [`src/redux/features/auth/authSlice.tsx`](src/redux/features/auth/authSlice.tsx) and handles user authentication state.

3. **API Integration**: API calls are managed using `RTK Query`. The base API setup is in [`src/redux/api/baseApi.tsx`](src/redux/api/baseApi.tsx). Specific endpoints for authentication and tasks are defined in their respective files, such as [`src/redux/features/auth/authApi.tsx`](src/redux/features/auth/authApi.tsx) and [`src/redux/features/task/taskManagement.tsx`](src/redux/features/task/taskManagement.tsx).

4. **Hooks**: Custom hooks like `useAppDispatch` and `useAppSelector` are defined in [`src/redux/hooks.ts`](src/redux/hooks.ts) for type-safe usage of Redux hooks.

## Setup Instructions

To install and run the project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/task-manager-app.git
   cd task-manager-app
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the development server**:
   ```sh
   npm run dev
   ```

4. **Build the project**:
   ```sh
   npm run build
   ```

5. **Preview the build**:
   ```sh
   npm run preview
   ```

## Overview

### Approach and Design Decisions

- **React with TypeScript**: The project uses React with TypeScript for type safety and better developer experience.
- **Vite**: Vite is used as the build tool for its fast development server and optimized build process.
- **Tailwind CSS**: Tailwind CSS is used for styling, providing utility-first CSS classes.
- **Redux Toolkit**: Redux Toolkit simplifies state management and includes tools like `RTK Query` for API integration.
- **Component Structure**: The project follows a modular component structure, with separate directories for UI components, hooks, pages, and Redux slices.
- **API Integration**: `RTK Query` is used for API calls, providing caching, automatic re-fetching, and other useful features.

This setup ensures a scalable and maintainable codebase, with a focus on performance and developer productivity.