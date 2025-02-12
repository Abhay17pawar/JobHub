const multer = require('multer');
const cloudinary = require('../controller/cloudinary'); // Import Cloudinary
const fs = require('fs');
const axios = require('axios');
const pdf = require('pdf-parse');
const { User } = require("../models/userModel");

const techStacks = {
  front_end_development: ['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js', 'SASS', 'Bootstrap', 'jQuery', 'Next.js', 'Redux', 'GraphQL'],
  web_development: ['HTML', 'CSS', 'JavaScript'],
  backend_development: ['Node.js', 'Express.js', 'Python', 'Java', 'C#', 'Ruby', 'Golang', 'Flask', 'Spring', 'ASP.NET', 'Laravel', 'Django'],
  mobile_app_development: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Xamarin', 'Android', 'iOS'],
  machine_learning: ['TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Matplotlib', 'Seaborn', 'Jupyter'],
  dataEngineering: ['Pandas', 'SQL', 'NoSQL', 'Spark', 'Hive', 'D3.js', 'Apache Kafka', 'Elasticsearch'],
  cloud_computing: ['AWS', 'Google Cloud', 'Azure', 'CloudFormation', 'Lambda', 'Firebase'],
  devOps: ['Docker', 'Kubernetes', 'Jenkins', 'GitLab', 'GitHub', 'CircleCI', 'Terraform'],
  cyber_security: ['Penetration Testing', 'Wireshark', 'Kali Linux', 'OWASP', 'Encryption', 'Hacking'],
  testing: ['Mocha', 'Jest', 'Cypress', 'Selenium', 'JUnit', 'TestNG', 'Postman'],
  blockchain_development: ['Ethereum', 'Solidity', 'Bitcoin', 'Hyperledger', 'Web3.js'],
  analytics: ['Tableau', 'Power BI', 'Google Analytics', 'Mixpanel'],
};

const categorizeSkills = (skills) => {
  // Initialize the categorizedSkills object with all categories
  const categorizedSkills = {
    front_end_development: [],
    backend_development: [],
    web_development: [],
    mobile_app_development: [],
    machine_learning: [],
    // dataEngineering: [],
    cloud_computing: [],
    devOps: [],
    cyber_security: [],
    testing: [],
    blockchain_development: [],
    analytics: [],
    otherTech: [],
  };

  // Loop through all the skills and check which categories they belong to
  skills.forEach(skill => {
    let categorized = false;
    for (const category in techStacks) {
      // If the skill belongs to a category, push it into the category array
      if (techStacks[category].includes(skill)) {
        categorizedSkills[category].push(skill);
        categorized = true;
      }
    }
    // If the skill doesn't match any category, place it in 'otherTech'
    if (!categorized) {
      categorizedSkills.otherTech.push(skill);
    }
  });

  return categorizedSkills;
};

// Function to extract emails from text
const extractEmails = (text) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const emails = text.match(emailRegex);
  return emails || [];
};

// Function to extract skills and categorize them
const extractSkills = (text) => {
  const skills = techStacks.front_end_development.concat(
    techStacks.backend_development,
    techStacks.mobile_app_development,
    techStacks.web_development,
    techStacks.machine_learning,
    techStacks.dataEngineering,
    techStacks.cloud_computing,
    techStacks.devOps,
    techStacks.cyber_security,
    techStacks.testing,
    techStacks.blockchain_development,
    techStacks.analytics
  ).filter(skill => text.includes(skill));

  return categorizeSkills(skills);
};

// Set up multer to handle file upload
const storage = multer.diskStorage({
  destination: './uploads/', // Specify where the file should be saved temporarily
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB size limit
}).single('file');

// Upload file to Cloudinary
const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log('Uploaded file:', req.file);

  cloudinary.uploader.upload(req.file.path, { resource_type: 'auto' }, (error, result) => {
    if (error) {
      console.error('Cloudinary upload error:', error);
      return res.status(500).json({ error: 'Cloudinary upload failed' });
    }

    fs.unlinkSync(req.file.path); // Delete temporary file

    res.status(201).json({
      message: 'File uploaded successfully!',
      file: {
        originalname: req.file.originalname,
        url: result.secure_url, // Cloudinary URL
      },
    });
  });
};

// Extract text from PDF and handle skills/emails extraction
const extractTextFromPDF = async (req, res) => {
  try {
    const { cloudinaryURL } = req.query;

    if (!cloudinaryURL || typeof cloudinaryURL !== 'string') {
      return res.status(400).json({ error: 'Invalid Cloudinary URL' });
    }

    const response = await axios({
      url: cloudinaryURL,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    const pdfPath = './temp.pdf';
    fs.writeFileSync(pdfPath, response.data);

    const data = await pdf(fs.readFileSync(pdfPath));
    const extractedText = data.text;

    const emails = extractEmails(extractedText);
    const skills = extractSkills(extractedText);

    fs.unlinkSync(pdfPath);

    res.status(200).json({
      emails: emails,
      skills: skills,
    });
  } catch (error) {
    console.error('Error extracting text from PDF:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const savePDFdata = async (req, res) => {
  const { email, skills } = req.body;  // Assuming `skills` is an object containing categorized arrays

  try {
    if (!email || !skills) {
      return res.status(400).json({ error: 'Email or skills missing' });
    }

    // Skills are already categorized, no need to categorize again
    // If needed, you could validate that skills are in the correct structure (array of strings per category)

    // Check if the skills object has the required structure
    const validCategories = ['frontend', 'backend','web_development', 'mobile', 'machineLearning', 'dataEngineering', 'cloud', 'devOps', 'cybersecurity', 'testing', 'blockchain', 'analytics', 'otherTech'];
    const isValid = validCategories.every(category => Array.isArray(skills[category]));

    if (!isValid) {
      return res.status(400).json({ error: 'Invalid skills structure' });
    }

    let updatedUser = await User.findOne({ email });

    if (updatedUser) {
      // Update the user's skills
      updatedUser.skills = skills;  // Save the entire categorized object
      await updatedUser.save();
      return res.status(200).send({ message: 'User skills updated successfully' });
    } else {
      // If user doesn't exist, create a new user
      updatedUser = new User({
        email,
        skills: skills,  // Save the entire categorized object
      });
      await updatedUser.save();
      return res.status(201).send({ message: 'New user created with skills' });
    }
  } catch (error) {
    console.error('Error updating or creating user data:', error);
    return res.status(500).send({ message: 'Failed to update or create user data' });
  }
};


module.exports = { upload, uploadFile, extractTextFromPDF, savePDFdata };
