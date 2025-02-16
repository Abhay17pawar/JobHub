const axios = require("axios");
const User = require("../models/userModel");

const linkedin = async (req, res) => {
    const { email, skills } = req.body;
    let location = req.body.location || "remote";

    try {

        if(location == null){
            location = "remote";
        };

        const dbjobs = await User.findOne({ email });

        if (!dbjobs) {
            return res.status(404).send("User not found");
        }

        const dbskills = dbjobs.skills;

        const techStackNames = Object.keys(dbskills).filter(key => dbskills[key].length > 0);
        //console.log(techStackNames);

        let linkedinUrl;

        if(skills != null){
         linkedinUrl = await axios.get(`http://localhost:3000/api/search?keywords=${skills}&location=${location}&dateSincePosted=past_month`)
        }
        else{
            if(techStackNames != null){
                linkedinUrl = await axios.get(`http://localhost:3000/api/search?keywords=${techStackNames}&location=remote&dateSincePosted=past_month`)
            }
        }

        return res.send(linkedinUrl?.data); 

    } catch (error) {
        console.log("error", error);
        return res.status(500).send("Server error");
    }
};

module.exports = { linkedin };
