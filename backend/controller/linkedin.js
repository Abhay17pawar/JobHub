const axios = require("axios");
const User = require("../models/userModel");
const LinkedInJob = require("../models/linkedinModel");

const linkedin = async (req, res) => {
    const { email } = req.body;

    try {
        // Find the user in the database by email
        const dbjobs = await User.findOne({ email });

        if (!dbjobs) {
            return res.status(404).send("User not found");
        }

        let linkedinUrl;

        // Get the user's skills from the database
        const dbskills = dbjobs.skills;
        const techStackNames = Object.keys(dbskills).filter(key => dbskills[key].length > 0);

        if (techStackNames.length > 0) {
            const dbJobs = await LinkedInJob.find({});
            // make sure to find on the basis of user

            const filteredJobs = dbJobs
                .filter(job => job.title && !job.title.includes('*')) // Exclude jobs with '*' in the title
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by date (latest first)
                .slice(0, 20); // Limit to the latest 20 jobs

            if (filteredJobs.length > 0) {
                console.log("Fetching the latest 20 jobs from the database");

                // Map through the filtered jobs and return only necessary fields
                const jobsToSend = filteredJobs.map(job => ({
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    jobLink: job.link,
                }));

                return res.send(jobsToSend); 
            } else {
                // If no jobs were found in the database, fetch from the LinkedIn API
                linkedinUrl = await axios.get(`http://localhost:3000/api/search?keywords=${techStackNames.join(",")}&location=Remote&dateSincePosted=past_month`);
                return res.send(linkedinUrl?.data);
            }
        } else {
            // If no skills in the tech stack, fallback to default search (e.g., "machinelearning")
            linkedinUrl = await axios.get(`http://localhost:3000/api/search?keywords=machinelearning&location=Remote&dateSincePosted=past_month`);
            return res.send(linkedinUrl?.data);
        }

    } catch (error) {
        console.log("Error details:", error);
        return res.status(500).send("Server error: " + error.message);
    }
};

module.exports = { linkedin };
