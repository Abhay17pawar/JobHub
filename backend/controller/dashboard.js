const axios = require("axios");
const cheerio = require("cheerio");
const User = require("../models/userModel");

const dashboardData = async (req, res) => {
    const { email } = req.body;
    console.log("email is this : ",email);
    try {
        // Fetch user data based on email
        const newJobs = await User.findOne({ email: email });
        

        // If no user is found, return an error message
        if (!newJobs) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract skills from the user document
        const skills = newJobs.skills;

        // Filter out skills with empty arrays (length > 0)
        const filteredSkills = Object.keys(skills)
            .filter(skill => skills[skill].length > 0) // Filter out skills with empty arrays
            .map(skill => skill.replace(/_/g, '-')); 

        const formattedTitle = filteredSkills.join(',');

        console.log("Formatted skills:", formattedTitle);

        let baseUrl;
        if(formattedTitle.length != 0){
         baseUrl = `https://internshala.com/internships/${formattedTitle}-internship/`;
        }
        else{
            baseUrl = "http://internshala.com/internships/software-development-internship/stipend-1000"
        }

        const response = await axios.get(baseUrl);

        if (response.status === 200) {
            const $ = cheerio.load(response.data);

            const internships = $(".individual_internship");
            let scrapedData = [];

            internships.each((index, element) => {
                const jobTitle = $(element).find(".job-title-href").text().trim();
                const company = $(element).find(".company-name").text().trim();
                const jobLocation = $(element).find(".locations a").text().trim();
                const stipend = $(element).find(".stipend").text().trim();
                const jobUrl = "https://internshala.com" + ($(element).find(".company a").attr("href") || "#");
                const logo = $(element).find(".internship_logo img").attr("src") || "";

                scrapedData.unshift({ jobTitle, company, jobLocation, stipend, jobUrl, logo });
            });

            // Send the scraped data as response
            res.json({ jobs: scrapedData });
        } else {
            res.status(500).json({ error: "Failed to fetch the internships page." });
        }

    } catch (error) {
        console.error("Error fetching or scraping the page:", error);
        res.status(500).json({ error: "Failed to scrape the data." });
    }
};

module.exports = {
    dashboardData,
};
