import React, { useEffect, useState } from "react";
// import jobs from "../jobs.json";
import JobListing from "./JobListing";
import Spinner from "./Spinner";

const JobListings = ({ isJobs = false }) => {
   const [jobs, setJobs] = useState([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchjobs = async () => {
         const apiUrl = isJobs ? "/api/jobs?_limit=3" : "api/jobs";
         try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            setJobs(data);
         } catch (error) {
            console.log(error);
         } finally {
            setLoading(false);
         }
      };

      fetchjobs();
   }, []);

   return (
      <div>
         {" "}
         <section className="bg-blue-50 px-4 py-10">
            <div className="container-xl lg:container m-auto">
               <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
                  {isJobs ? "RecentJobs" : "Browse Jobs"}{" "}
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {loading ? (
                     <Spinner loading={loading} />
                  ) : (
                     <>
                        {jobs.map((job) => (
                           <JobListing key={job.id} job={job} />
                        ))}
                     </>
                  )}
               </div>
            </div>
         </section>
      </div>
   );
};

export default JobListings;
