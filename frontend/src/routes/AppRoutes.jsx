import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Leads from "../pages/Leads";
import Tasks from "../pages/Tasks";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

import AddCustomer from "../pages/AddCustomer";
import EditCustomer from "../pages/EditCustomer";
import AddLead from "../pages/AddLead";
import EditLead from "../pages/EditLead";
import AddTask from "../pages/AddTask";
import EditTask from "../pages/EditTask";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers/add"
          element={
            <ProtectedRoute>
              <AddCustomer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers/edit/:id"
          element={
            <ProtectedRoute>
              <EditCustomer />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <NotFound />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <Leads />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/add"
          element={
            <ProtectedRoute>
              <AddLead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads/edit/:id"
          element={
            <ProtectedRoute>
              <EditLead />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/add"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/edit/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
      
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;