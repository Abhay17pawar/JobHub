import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SearchIcon from "@mui/icons-material/Search";
import Card from "./JobsCard";
import axios from "axios";
import Loader from "./Loader";
import CustomPagination from "./CustomPagination";
import ProfileCardBtn from "./ProfileCard";
import { UserButton, useUser } from "@clerk/clerk-react";
import NewsLetter from "./NewsLetter";
import Example from "./DropDown";
import Button1 from "./style/Button1";

export default function JobDashboard() {
  const { register, handleSubmit } = useForm();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [clicked,setClicked] = useState(false);
  const jobsPerPage = 8;

  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress
  console.log("userId : ",userEmail)

  useEffect(() => {
    const isFirstVisit = !localStorage.getItem("hasVisited");
    if (isFirstVisit) {
      window.location.reload();
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    if (clicked && userEmail) {
      const fetchData = async () => {
        try {
          // Example API call
          const response = await axios.post("http://localhost:8000/api/linkedin",
            {
              email : userEmail
            } 
          );
          setJobs(response?.data || []); 
          console.log(response?.data)
        } catch (error) {
          console.error("Error fetching data:", error);
        } 
        // finally {
        //   setClicked(false);
        // }
      };
  
      fetchData();
    }
  }, [clicked]); // This useEffect will run every time the `clicked` state changes.
  
  useEffect(() => {
    if (userEmail) {
      const emailURL = `http://localhost:8000/api/store-email?email=${encodeURIComponent(userEmail)}`;
      axios
        .get(emailURL)
        .then((response) => {
          console.log("Email stored successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error storing email:", error);
        });
    }
  
    // Fetch jobs when the component mounts or the user email changes
    if (userEmail) {
      fetchJobs(userEmail);
    }
  }, [userEmail]);
  

  const fetchJobs = async (userEmail) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/api/dashboard", {
        email : userEmail
      });
      setJobs(response.data?.jobs || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data) => {
    fetchJobs(data);

  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const displayedJobs = jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);

  return (
    <div className="flex bg-gray-100">
      <aside className="w-56 bg-white p-6 border-r sticky top-0 h-screen">
        <h1 className="text-2xl font-bold mb-6">JobHub</h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <SearchIcon size={18} /> <span>Jobs For You</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <BookmarkAddedIcon size={18} /> <span>Saved Jobs</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <ProfileCardBtn  />
            </li>
            <li className="space-x-2 text-gray-700 cursor-pointer">
              <Example  />
            </li>
            <li className="space-x-2 text-gray-700 cursor-pointer">
              <Button1 setClicked={setClicked}/>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Job Dashboard</h2>
          <button className="flex items-center bg-yellow-200 text-white px-1 py-1 rounded-full">
            <UserButton />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex space-x-2">
          <input
            {...register("title")}
            type="text"
            placeholder="Job title or keywords"
            className="w-1/3 p-2 border rounded"
          />
          <input
            {...register("salary")}
            type="text"
            placeholder="Salary (e.g. 50000, 60k, 70,000)"
            className="w-1/3 p-2 border rounded"
          />
          <input
            {...register("location")}
            type="text"
            placeholder="Location"
            className="w-1/3 p-2 border rounded"
          />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">
            Search
          </button>
        </form>

        {loading ? (
          <div className="text-center mt-6">
            <Loader />
          </div>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : (
          <>
        <>
  {
    clicked === false ? (
      <div className="grid grid-cols-4 gap-2 mt-6">
        {displayedJobs
          .filter((job) => {
            // Ensure missing fields are handled correctly for both job objects
            const missingFields = [
              !job?.jobTitle,
              !job?.company,
              !job?.stipend,
              !job?.jobLocation,
              !job?.company_url,
              !job?.jobUrl,
              !job?.logo,
            ].filter(Boolean).length;

            return missingFields <= 2; // Only show jobs with at most 2 missing fields
          })
          .map((job, index) => (
            <Card
              key={index}
              title={job?.jobTitle || "No Title"}
              company={job?.company || "No Company"}
              salary={job?.stipend || "Not disclosed"}
              location={job?.jobLocation || "Location not specified"}
              type={job?.job_type || "Internship"}
              platform={job?.company_url || ""}
              jobLink={job?.jobUrl || "#"}
              logo={job?.logo || ""}
            />
          ))}
      </div>
    ) : (
      <div className="grid grid-cols-4 gap-2 mt-6">
        {displayedJobs
          // .filter((job) => {
          //   // Handle missing fields for the alternative job object structure
          //   const missingFields = [
          //     !job?.title,
          //     !job?.company,
          //     !job?.location,
          //     !job?.link,
          //     !job?.logo,
          //   ].filter(Boolean).length;

          //   return missingFields <= 5; // Only show jobs with at most 2 missing fields
          // })
          .map((job, index) => (
            <Card
            key={index}
            title={job?.title || "No Title"}
            company={job?.company || "No Company"}
            location={job?.location || "Location not specified"}
            jobLink={job?.jobLink ? job?.jobLink : null}  // Remove double quotes
            logo={job?.logo || ""}
          />
          ))
          }
      </div>
    )
  }
</>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <CustomPagination page={page} count={totalPages} onChange={handlePageChange} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}