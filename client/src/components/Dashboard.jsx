import { useEffect, useState } from "react";
import { Search, Bookmark, PlusCircle } from "lucide-react";
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import SearchIcon from '@mui/icons-material/Search';
import Card from "./JobsCard";
import axios from "axios";

export default function JobDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const options = {
        method: "GET",
        url: "https://jobs-api14.p.rapidapi.com/v2/list",
        params: {
          query: "Web Developer",
          location: "India",
          autoTranslateLocation: "true",
          remoteOnly: "true",
          employmentTypes: "Fulltime,Internship,Contractor"
        },
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
          "X-RapidAPI-Host": "jobs-api14.p.rapidapi.com"
        }
      };
      const response = await axios.request(options);
      console.log(response.data)

      // Use the structure of response.data.jobs to set jobs
      setJobs(response.data?.jobs || []); // Adjust according to actual API structure
    } catch (error) {
      console.log(error);
      setError("Server error, Please try again :)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100">
      <aside className="w-64 bg-white p-6 border-r">
        <h1 className="text-2xl font-bold mb-6">JobHub</h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <SearchIcon size={18} /> <span>Jobs For You</span>
            </li>
            <li className="flex items-center space-x-2 text-gray-700 cursor-pointer">
              <BookmarkAddedIcon size={18} /> <span>Saved Jobs</span>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Job Dashboard</h2>
          <button className="flex items-center bg-black text-white px-4 py-2 rounded-md">
            <PlusCircle size={18} className="mr-2" /> Post a Job
          </button>
        </div>
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            placeholder="Job title or keywords"
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Salary (e.g. 50000, 60k, 70,000)"
            className="w-1/3 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-1/3 p-2 border rounded"
          />
          <button className="bg-black text-white px-4 py-2 rounded">Search</button>
        </div>
        {loading ? (
          <p className="text-center mt-6">Loading jobs...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : (
          <div className="grid grid-cols-4 gap-2 mt-6">
            {jobs.map((job, index) => (
              <Card
                key={index}
                title={job?.title}
                company={job?.company}
                location={job?.location || "Location not specified"}
                salary={job?.salaryRange || "Salary not provided"}
                type={job?.employmentType || "Contractor"}
                logo={job?.image}
                platform={job?.jobProviders[0]?.jobProvider || "Unknown"}
                jobLink={job?.jobProviders[0]?.url || "#"}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
