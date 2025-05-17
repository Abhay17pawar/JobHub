const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const app = express();

// Use stealth plugin to avoid bot detection
puppeteer.use(StealthPlugin());

// API endpoint to scrape job listings from Glassdoor
app.get('/scrape-jobs', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true }); // Run in headless mode
        const page = await browser.newPage();

        // Set user-agent to avoid bot detection
        await page.setUserAgent(
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        );

        // Navigate to Glassdoor's job search page (modify query as needed)
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

        // Send the job listings as the response
        res.json({
            success: true,
            data: jobs,
        });

        await browser.close();
    } catch (error) {
        console.error('Error scraping jobs:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while scraping jobs.',
        });
    }
});

// Start the Express server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
