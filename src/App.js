
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import React from 'react';

// Import Pages
import AdminPage from "./pages/AdminPage";
import AddDJForm from "./pages/AddDJ";
import AddVenueForm from "./pages/AddVenue";
import Index from "./pages/Index";
import AddCaterer from "./pages/AddCaterer";
import AddDecorator from "./pages/AddDecorator";
import AddPhotography from "./pages/AddPhotography";
import Budget from "./pages/Budget";
import AddWedding from "./pages/AddWedding";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Culture from "./pages/Culture";
import WeddingDetails from "./pages/WeddingDetails";

// Import Components
import Navbar from "./components/Navbar";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import Dashboard from "./pages/Dashboard";
import MakeAdmin from "./pages/MakeAdmin";

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Index/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/culture",
        element: <Culture/>
      },
      {
        path: "/wedding-details/:id",
        element: <WeddingDetails/>
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/admin/*",
        element: <AdminPage />
      },
      {
        path: "/admin/add-dj",
        element: <AddDJForm />
      },
      {
        path: "/admin/add-dj/:id",
        element: <AddDJForm />
      },
      {
        path: "/admin/add-venue",
        element: <AddVenueForm />
      },
      {
        path: "/admin/add-venue/:id",
        element: <AddVenueForm />
      },
      {
        path: "/admin/add-food-caterer",
        element: <AddCaterer />
      },
      {
        path: "/admin/add-food-caterer/:id",
        element: <AddCaterer />
      },
      {
        path: "/admin/add-wedding-type",
        element: <AddWedding/>
      },
      {
        path: "/admin/add-wedding-type/:id",
        element: <AddWedding/>
      },
      {
        path: "/admin/add-decorator",
        element: <AddDecorator/>
      },
      {
        path: "/admin/add-decorator/:id",
        element: <AddDecorator/>
      },
      {
        path: "/admin/add-photography",
        element: <AddPhotography/>
      },
      {
        path: "/admin/add-photography/:id",
        element: <AddPhotography/>
      },
      {
        path: "/budget/:email",
        element: <Budget />
      },
      {
        path: "/payment",
        element: <Payment />
      },
      {
        path: "/receipt",
        element: <Receipt />
      },
      {
        path: "/admin/make-admin",
        element: <MakeAdmin />
      }
    ]
  }
])

function App() {
  return (
    <div>
      <div className=''>
        <RouterProvider router={router}/>
      </div>
    </div>
  );
}

export default App;