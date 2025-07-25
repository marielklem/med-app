import './App.css';
import React from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import MedicationForm from './components/medicationForm';
import MedicationSchedule from './components/medicationSchedule';
import MedicationRecipient from './components/MedicationRecipient';

const router = createBrowserRouter([
      {
        path: "/",
        element: <MedicationRecipient/>,
    },
          {
        path: "/schedule",
        element: <MedicationSchedule/>,
    },
    {
        path: "/create",
        element: <MedicationForm/>,
    },
]);

const App = () => <RouterProvider router={router}/>;

export default App;
