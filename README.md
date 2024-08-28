# OBS Frontend Assignment

## Introduction

Welcome to the OBS Frontend assignment. This project is a simple user management interface built with React and TypeScript. The application demonstrates the ability to fetch, display, and manage user data in a responsive UI.

## Features

- **User Interface**: Built using React with [TailwindCSS](https://tailwindcss.com/).
- **Responsive Design**: The application is responsive on both desktop and mobile devices.
- **Data Fetching**: JSON data is fetched from REST API endpoints.
- **State Management**: Centralized state using [Zustand](https://zustand-demo.pmnd.rs/).
- **User Management**: Features to add, edit, and delete users, updating the state accordingly.
- **Environment Configuration**: TypeScript, ESLint, and Prettier configured for consistent development.
- **Unit Testing**: Implemented using [Vitest](https://vitest.dev/) Library.
- **Deployment**: Hosted on [Vercel](https://vercel.com/) for a live demo. You can access the live demo [here](https://obs-user-lists-six.vercel.app/).

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

```bash
git clone git@github.com:your_username/obs-user-lists.git
cd obs-user-lists
```

2. Install dependencies:

```bash
npm install
```

### Environment Variables

Create a .env file in the root of your project and add the following: <br>
This variable controls the number of users fetched from the API.

```bash
VITE_FETCH_LIMIT=10
```

### Running the Application
To start the development server, run:

```bash
npm run dev
```

### Building for Production
To build the project for production, run:

```bash
npm run build
```

### Running Tests
To run unit tests, use:

```bash
npm run test
```

## Project Structure

- **/src**: Contains the main application code.
- **/components**: Reusable components like UserList, UserModal, Toast etc.
- **/store**: State management using Zustand.
- **/interfaces**: TypeScript interfaces and types.
- **/services**: API calls and data fetching functions.
- **/public**: Static assets and public files.
- **/utils**: Utility functions for tasks such as generating random IDs.
- **/src/components/User/UserCard.test.tsx**: Simple unit test for render user and avatar element using mock data.

## Deployment
The application has been deployed to Vercel. You can access the live demo [here](https://obs-user-lists-six.vercel.app/)

## Additional Information

- **Dummy API**: The user list is fetched from [DummyJSON](https://dummyjson.com/docs/users/) and profile images from [Picsum](https://picsum.photos/).
- **State Management**: Zustand is used to manage global state, ensuring efficient state updates and easy scalability.
- **Modal for User Details**: User details are displayed in a modal, allowing easy editing and deletion of users.