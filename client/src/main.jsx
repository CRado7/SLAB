import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import HomePage from './pages/HomePage';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import ResetPassword from './pages/ResetPassword.jsx';
import ErrorPage from './pages/ErrorPage';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      }, {
        path: 'recipes/:recipeId',
        element: <RecipeDetail />
      }, {
        path: 'favorites',
        element: <Favorites />
      }, {
        path: 'reset-password/:token',
        element: <ResetPassword />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
    
)
