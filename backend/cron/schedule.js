const cron = require("node-cron");
const axios = require("axios");
const User = require("../models/userModel");
const LinkedInJob = require("../models/linkedinModel");
const { sendJobListingsEmail } = require("./email");

const linkedinCronJobs = async () => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            console.log("No users found in the database.");
            return;
        }

        console.log(`Found ${users.length} users to process.`);  // Log the number of users

        for (let user of users) {
            const { email, skills } = user;
            let location = "Remote"; // You can customize this based on user preferences

            const dbskills = user.skills;
            const techStackNames = Object.keys(dbskills).filter(key => dbskills[key].length > 0);

            if (techStackNames.length > 0) {
                try {
                    console.log(`Fetching jobs for ${email} with skills: ${techStackNames.join(", ")}`);  // Log the skills

                    const linkedinUrl = await axios.get(
                        `http://localhost:3000/api/search?keywords=${techStackNames.join(",")}&location=${location}&dateSincePosted=past_month`
                    );

                    const jobListings = linkedinUrl?.data?.jobs || [];  

                    console.log(`Found ${jobListings.length} job listings for ${email}`);  // Log the job listings

                    const newJobListings = [];

                    for (let job of jobListings) {
                        const { title, company, location, link } = job;

                        if (title.includes('*')) {
                            console.log(`Skipping job with invalid title: ${title}`);
                            continue;
                        }

                        const existingJob = await LinkedInJob.findOne({ link });

                        if (!existingJob) {
                            newJobListings.push({
                                title,
                                company,
                                location,
                                link
                            });

                            const newJob = new LinkedInJob({
                                email,
                                title,
                                company,
                                location,
                                link
                            });

                            await newJob.save();
                            console.log(`New job saved: ${title} at ${company}`);
                        } else {
                            console.log(`Job already exists: ${title} at ${company}`);
                        }
                    }

                    // Log if there are new job listings
                    console.log(`Found ${newJobListings.length} new job listings for ${email}`);

                    if (newJobListings.length > 0) {
                        const topJobs = newJobListings.slice(0, 20); // Get the top 20 new jobs
                        await sendJobListingsEmail(email, topJobs); // Send the email with the top jobs
                        console.log(`Sent top 20 new job listings to ${email}`);
                    }

                } catch (error) {
                    console.error(`Error fetching jobs for user ${email}:`, error);
                }
            } else {
                console.log(`No valid skills found for user: ${email}`);
            }
        }
    } catch (error) {
        console.error("Error during cron job execution:", error);
    }
};


// Cron job to run the job fetching every 6 hours
cron.schedule("0 */6 * * *", async () => {
    console.log("Running cron job to fetch LinkedIn jobs for all users...");
    
    try {
        // Call the linkedinCronJobs function to fetch jobs for all users and send emails
        await linkedinCronJobs();
        console.log("Cron job completed.");
    } catch (error) {
        console.error("Error during cron job execution:", error);
    }
});

module.exports = { linkedinCronJobs };
