const axios = require("axios");
const cheerio = require("cheerio");

const dashboardData = async (req, res) => {
    const { title, salary, location } = req.body;

        let Newlocation;
        if (location === 'Remote') {
         Newlocation = 'work-from-home';
    }

    const baseUrl = `https://internshala.com/internships/${Newlocation}-${title}-internships/stipend-${salary}`;

    try {
        const response = await axios.get(baseUrl);
        
        if (response.status === 200) {
            const $ = cheerio.load(response.data);

            const internships = $(".individual_internship");
            
            const scrapedData = [];

            internships.each((index, element) => {
                const title = $(element).find(".job-title-href").text().trim();
                const company = $(element).find(".company-name").text().trim();
                const location = $(element).find(".locations a").text().trim();
                const stipend = $(element).find(".stipend").text().trim();
                const jobUrl = "https://internshala.com" + ($(element).find(".company a").attr("href") || "#");
                const logo = $(element).find(".internship_logo img").attr("src") || "";

                scrapedData.push({ title, company, location, stipend, jobUrl, logo });
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
