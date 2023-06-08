import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Deals from "../Pages/Deals";
import PrivateRoute from "./PrivateRoute";
import AddCar from "../Pages/AddCar";
import Signup from "../Pages/Signup";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/auth/sign-up" element={<Signup />} />
      <Route path="/auth/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Deals />{" "}
          </PrivateRoute>
        }
      />

      <Route
        path="/:id"
        element={
          <PrivateRoute>
            <Deals />{" "}
          </PrivateRoute>
        }
      />
      <Route
        path="/addcar"
        element={
          <PrivateRoute>
            <AddCar />{" "}
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
