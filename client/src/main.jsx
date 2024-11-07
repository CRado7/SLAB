import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import HomePage from './pages/HomePage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import RecipeDetail from './pages/RecipeDetail';
import Favorites from './pages/Favorites';
import ErrorPage from './pages/ErrorPage';

import './index.css'

const router = createBrowserRouter([
  {
    path: "/SLAB/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      }, {
        path: 'login',
        element: <Login />
      }, {
        path: 'signup',
        element: <Signup />
      }, {
        path: 'recipes/:recipeId',
        element: <RecipeDetail />
      }, {
        path: 'favorites',
        element: <Favorites />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
    
)
