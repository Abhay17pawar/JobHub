const axios = require("axios");
const cheerio = require("cheerio");
const User = require("../models/userModel");

const internshala = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Please provide an email.");
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("User not found.");
    }

    const skills = user.skills;

    if (!skills || Object.keys(skills).length === 0) {
      return res.status(404).send("No skills available for this user.");
    }

    const filteredSkills = Object.keys(skills).filter(category => skills[category].length > 0);

    if (filteredSkills.length === 0) {
      return res.status(404).send("No non-empty skills available for this user.");
    }

    const categoriesString = filteredSkills.join(", ");

    return dashboardData(req, res, categoriesString); 

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Server error occurred!");
  }
};

const dashboardData = async (req, res, skills) => {
  
    const titleString = Array.isArray(skills) ? skills.join(',').replace(/_/g, '-') : skills.replace(/_/g, '-');

  const baseUrl = `https://internshala.com/internships/${'work-from-home'}-${titleString}-internships/stipend-${2000}/`;

  try {
    const response = await axios.get(baseUrl);

    if (response.status === 200) {
      const $ = cheerio.load(response.data);

      const internships = $(".individual_internship");
      const scrapedData = [];

      internships.each((index, element) => {
        const jobTitle = $(element).find(".job-title-href").text().trim();
        const company = $(element).find(".company-name").text().trim();
        const jobLocation = $(element).find(".locations a").text().trim();
        const stipend = $(element).find(".stipend").text().trim();
        const jobUrl = "https://internshala.com" + ($(element).find(".company a").attr("href") || "#");
        const logo = $(element).find(".internship_logo img").attr("src") || "";

        scrapedData.push({ jobTitle, company, jobLocation, stipend, jobUrl, logo });
      });

      return res.json({ skills, jobs: scrapedData });
    } else {
      return res.status(500).json({ error: "Failed to fetch the internships page." });
    }
  } catch (error) {
    console.error("Error fetching or scraping the page:", error);
    return res.status(500).json({ error: "Failed to scrape the data." });
  }
};

module.exports = { internshala };
