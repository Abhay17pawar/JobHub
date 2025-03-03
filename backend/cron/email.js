const nodemailer = require("nodemailer");

const sendJobListingsEmail = async (email, topJobs) => {
    // Create a transporter object using default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodemailercodesync@gmail.com',
            pass: process.env.EMAIL_PASS, 
        },
    });

    // Styled HTML content for the email
    const jobListHtml = topJobs
        .map(
            (job) => `
            <div style="background: #f9f9f9; padding: 15px; margin-bottom: 15px; border-radius: 8px; box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);">
                <h3 style="color: #333; margin-bottom: 5px;">${job.title}</h3>
                <p style="margin: 5px 0;"><strong>Company:</strong> ${job.company}</p>
                <p style="margin: 5px 0;"><strong>Location:</strong> ${job.location}</p>
                <a href="${job.link}" target="_blank" style="display: inline-block; margin-top: 10px; padding: 10px 15px; background: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Apply Now</a>
            </div>`
        )
        .join('');

    const mailOptions = {
        from: 'abhaypawar0817@gmail.com',
        to: email,
        subject: '🔥 New Job Listings Just for You!',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; background: #f3f3f3;">
                <div style="max-width: 600px; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin: auto;">
                    <h2 style="color: #333; text-align: center;">🔥 New Job Listings for You 🔥</h2>
                    <p style="text-align: center; color: #555;">Find your next big opportunity today!</p>
                    ${jobListHtml}
                    <p style="text-align: center; margin-top: 20px;">Best of luck in your job search!<br>- The JobHub Team</p>
                </div>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email} with job listings`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error);
    }
};

module.exports = { sendJobListingsEmail };
