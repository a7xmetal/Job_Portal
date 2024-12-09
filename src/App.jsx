import React from "react";
import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements,
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layout/MainLayout";
import JobsPage from "./pages/JobsPage";
import ErrorPage from "./pages/ErrorPage";
import JobPage, { jobloader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
   const addJob = async (newJob) => {
      // console.log(newJob);
      const res = await fetch("/api/jobs", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(newJob),
      });
   };

   //delete page
   const deletePage = async (id) => {
      // console.log(id);
      const res = await fetch(`/api/jobs/${id}`, {
         method: "DELETE",
      });
   };

   //update page
   const updatePage = async (updatedJob) => {
      const res = await fetch(`/api/jobs/${updatedJob.id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(updatedJob),
      });
      return;
   };

   const router = createBrowserRouter([
      {
         path: "/",
         element: <MainLayout />,

         children: [
            {
               path: "/",
               element: <HomePage />,
            },

            {
               path: "/jobs",
               element: <JobsPage />,
            },
            {
               path: "/add-job",

               element: <AddJobPage addJobSubmit={addJob} />,
            },

            {
               path: "/jobs/:id",
               element: <JobPage deletePagebtn={deletePage} />,
               loader: jobloader,
            },
            {
               path: "/edit-job/:id",
               element: <EditJobPage updateJobSubmit={updatePage} />,
               loader: jobloader,
            },
            {
               path: "*",
               element: <ErrorPage />,
            },
         ],
      },
   ]);
   return (
      <div>
         <RouterProvider router={router} />
      </div>
   );
};

export default App;
