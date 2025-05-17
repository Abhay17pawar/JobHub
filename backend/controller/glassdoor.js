const puppeteer = require('puppeteer-extra');
const { default: axios } = require("axios");
const glassdoorJobs = require("../models/glassdoorModel"); // Assuming this is the mongoose model for job listings
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

// Use stealth plugin to avoid bot detection
puppeteer.use(StealthPlugin());

const glassdoor = async (req, res) => {
    try {
        const { title, location, salary } = req.body;

        // Validate that the required fields exist in the request body
        if (!title || !location || !salary) {
            return res.status(400).json({ message: "Missing required fields: title, location, or salary" });
        }

        // Launch Puppeteer in headless mode
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // Set user-agent to avoid bot detection
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        );

        // Construct the URL for the Glassdoor job search page
        const url = `https://www.glassdoor.co.in/Job/${location}-india-${title}-jobs-SRCH_IL.0,12_IS12563_KO13,33.htm?minSalary=${salary}`;
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Wait for job listings to load
        await page.waitForSelector('[data-test="jobListing"]');

        // Extract job listings
        const jobs = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('[data-test="jobListing"]')).map(job => ({
                title: job.querySelector('[data-test="job-title"]')?.innerText.trim() || 'N/A',
                company: job.querySelector('span[class^="EmployerProfile_compactEmployerName"]') 
                        || job.querySelector('div[class^="EmployerProfile_employerNameContainer"] span') 
                        || job.querySelector('.employerName') 
                    ? job.querySelector('span[class^="EmployerProfile_compactEmployerName"]')?.innerText.trim() 
                    || job.querySelector('div[class^="EmployerProfile_employerNameContainer"] span')?.innerText.trim() 
                    || job.querySelector('.employerName')?.innerText.trim() 
                    : 'N/A',
                location: job.querySelector('.JobCard_location__Ds1fM')?.innerText.trim() || 'N/A',
                salary: job.querySelector('[data-test="detailSalary"]')?.innerText.trim() || 'Not Disclosed',
                link: job.querySelector('[data-test="job-link"]') 
                    ? 'https://www.glassdoor.com' + job.querySelector('[data-test="job-link"]').getAttribute('href') 
                    : 'N/A',
            }));
        });

        // Save the scraped job listings to the database
        if (jobs && jobs.length > 0) {
            await glassdoorJobs.insertMany(jobs); // Use insertMany to save the array of jobs
            res.status(200).json({
                message: "Jobs scraped and saved successfully!",
                data: jobs, // Optionally return the saved jobs as part of the response
            });
        } else {
            res.status(404).json({
                message: "No jobs found for the given search criteria.",
            });
        }

        // Close the browser after scraping
        await browser.close();
    } catch (error) {
        console.error("Error saving job data: ", error);
        res.status(500).json({ message: "Error scraping or saving job data", error: error.message });
    }
};

module.exports = {
    glassdoor
};
