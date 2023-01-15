import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/base/HomePage';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import MyDashboardPage from './pages/auth/MyDashboardPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  { path: "/", element: <HomePage></HomePage> },
  { path: "/Home", element: <HomePage></HomePage> },
  { path: "/Login", element: <LoginPage></LoginPage> },
  { path: "/MyDashboard", element: <MyDashboardPage></MyDashboardPage> },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
