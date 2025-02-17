const axios = require("axios");
const User = require("../models/userModel");

const linkedin = async (req, res) => {
    const { email, skills } = req.body;
    let location = req.body.location || "remote";
    let keywords = skills || ""; // If skills are passed, use them; otherwise, default to an empty string.

    try {
        if (location == null) {
            location = "remote";
        }

        const dbjobs = await User.findOne({ email });

        if (!dbjobs) {
            return res.status(404).send("User not found");
        }

        let linkedinUrl;
        // Check if skills are passed and valid before making the request
        if (keywords && keywords.length > 0) {
            linkedinUrl = await axios.get(`http://localhost:3000/api/search?keywords=${keywords}&location=${location}&dateSincePosted=past_month`);
        } else {
            // If no valid skills, you can either skip the API call or use a default search term
            linkedinUrl = await axios.get(`http://localhost:3000/api/search?keywords=${'machinelearning'}&location=${location}&dateSincePosted=past_month`);
        }

        const dbskills = dbjobs.skills;
        const techStackNames = Object.keys(dbskills).filter(key => dbskills[key].length > 0);

        if (techStackNames.length > 0) {
            // If techStackNames is provided, fetch jobs based on tech stack
            linkedinUrl = await axios.get(`http://localhost:3000/api/search?keywords=${techStackNames.join(",")}&location=${location}&dateSincePosted=past_month`);
        }

        return res.send(linkedinUrl?.data);

    } catch (error) {
        console.log("error", error);
        return res.status(500).send("Server error");
    }
};


module.exports = { linkedin };
