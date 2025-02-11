const axios = require('axios');
const fs = require('fs');
const pdf = require('pdf-parse');

// List of common skills (you can extend this list based on your needs)
const skillsList = [
  // Web Development
  'HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'SASS', 'Bootstrap', 'jQuery', 'jQuery UI', 'TypeScript', 'JSP', 'Next.js', 'Redux', 'WebSockets', 'GraphQL', 'Django', 'Flask',

  // Frontend Development
  'HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Vue.js', 'AngularJS', 'jQuery', 'Bootstrap', 'SASS', 'Tailwind CSS', 'Preact', 'Backbone.js',

  'Node.js', 'Express.js', 'Java', 'C#', 'Python', 'PHP', 'Ruby', 'Golang', 'Rust', 'Django', 'Flask', 'Spring', 'Spring Boot', 'ASP.NET', 'Laravel', 'NestJS',

  'Swift', 'Objective-C', 'Kotlin', 'Java', 'React Native', 'Flutter', 'Xamarin', 'Android', 'iOS', 'Cordova', 'PhoneGap', 'Appcelerator', 'Ionic',

  'React Native', 'Ionic', 'Flutter', 'Xamarin', 'Cordova', 'PhoneGap', 'NativeScript',

  'Python', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'OpenCV', 'Matplotlib', 'Seaborn', 'Scipy', 'Jupyter', 'NLTK', 'spaCy', 'XGBoost', 'LightGBM', 'H2O.ai', 'Deep Learning', 'Reinforcement Learning', 'Neural Networks', 'Computer Vision', 'Natural Language Processing (NLP)', 'MLlib', 'Tesseract OCR',

  'Data Analysis', 'Data Visualization', 'Data Mining', 'Pandas', 'Matplotlib', 'Seaborn', 'Tableau', 'Power BI', 'Big Data', 'ETL', 'D3.js', 'SQL', 'NoSQL', 'Hive', 'Spark', 'Apache Kafka',

  'AWS', 'Amazon Web Services', 'Azure', 'Google Cloud Platform', 'CloudFormation', 'Lambda', 'EC2', 'S3', 'CloudFront', 'GCP', 'Google Cloud Storage', 'Azure DevOps', 'Google Kubernetes Engine (GKE)', 'Azure Kubernetes Service (AKS)', 'Cloud Storage', 'Firebase', 'DigitalOcean',

  'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitLab', 'GitHub', 'Bitbucket', 'Terraform', 'Ansible', 'Puppet', 'Chef', 'CI/CD', 'CircleCI', 'Travis CI', 'Jenkins Pipelines', 'AWS CodePipeline', 'GitOps',

  'MongoDB', 'MySQL', 'PostgreSQL', 'SQLite', 'Oracle', 'MariaDB', 'Redis', 'Cassandra', 'DynamoDB', 'Elasticsearch', 'Firebase', 'Neo4j', 'CouchDB', 'InfluxDB',

  'TCP/IP', 'HTTP', 'HTTPS', 'DNS', 'Nginx', 'Apache', 'Load Balancing', 'VPN', 'WebSocket', 'HTTP/2', 'SSL/TLS', 'DNS', 'SSH',

  'Penetration Testing', 'Ethical Hacking', 'Network Security', 'Firewalls', 'Wireshark', 'OpenSSL', 'Kali Linux', 'OWASP', 'Encryption', 'Hacking', 'Vulnerability Assessment', 'SIEM', 'SOC', 'IDS/IPS', 'Cybersecurity Threats', 'Security Audits',

  'Docker', 'Kubernetes', 'OpenShift', 'Helm', 'Docker Swarm', 'Rancher', 'Apache Mesos', 'Vagrant',

  'Mocha', 'Jest', 'Chai', 'Karma', 'JUnit', 'Selenium', 'TestNG', 'Cypress', 'Puppeteer', 'Postman', 'Jasmine', 'RSpec', 'Enzyme', 'Cucumber', 'Mockito', 'JUnit', 'Katalon Studio',

  'Git', 'GitHub', 'GitLab', 'Bitbucket', 'SVN', 'Mercurial',

  'Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator', 'InVision', 'Axure RP', 'Zeplin', 'Wireframing', 'Prototyping', 'UI Design', 'UX Design',

  'Unity', 'Unreal Engine', 'Cocos2d', 'Godot', 'Blender', 'Game Design', 'Game Development',

  'Ethereum', 'Solidity', 'Bitcoin', 'Smart Contracts', 'Hyperledger', 'Web3.js', 'IPFS', 'Ripple', 'Blockchain', 'Nethereum',

  'RESTful APIs', 'GraphQL', 'WebSockets', 'gRPC', 'SOAP', 'JSON', 'OAuth', 'JWT',

  // Messaging Systems
  'RabbitMQ', 'Kafka', 'ActiveMQ', 'SQS', 'MQTT',

  // Serverless Frameworks
  'AWS Lambda', 'Google Cloud Functions', 'Azure Functions', 'Serverless Framework',

  // Business Intelligence (BI)
  'Tableau', 'Power BI', 'QlikView', 'Looker', 'Domo',

  // Analytics & Reporting
  'Google Analytics', 'Adobe Analytics', 'Matomo', 'Mixpanel', 'Kissmetrics', 'Piwik',

  // IoT (Internet of Things)
  'IoT', 'Raspberry Pi', 'Arduino', 'MQTT', 'Home Automation', 'Sensors',

  // Software Engineering & Architecture
  'SOLID Principles', 'Design Patterns', 'Microservices', 'Monolithic Architecture', 'Event-Driven Architecture', 'CQRS', 'DDD', 'TDD',

  // Agile/Scrum Tools
  'Jira', 'Trello', 'Asana', 'ClickUp', 'Basecamp', 'Monday.com',

  // Other Technologies & Tools
  'Apache Spark', 'Apache Kafka', 'Hadoop', 'ElasticSearch', 'Flink', 'Cassandra', 'RabbitMQ', 'Terraform', 'Vagrant', 'Ansible', 'Chef', 'Puppet', 'Jenkins', 'Nagios', 'Prometheus', 'Grafana'
];

const extractEmails = (text) => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
  const email = text.match(emailRegex); // Returns an array of emails
  return email || []; // If no emails are found, return an empty array
};

// Function to extract skills from text based on the predefined list
const extractSkills = (text) => {
  const skills = skillsList.filter(skill => text.includes(skill));
  return skills;
};

const extractTextFromPDF = async (req, res) => {
  try {
    const { cloudinaryURL } = req.query; // Get the Cloudinary URL from the query parameters

    // Validate if the Cloudinary URL is present
    if (!cloudinaryURL || typeof cloudinaryURL !== 'string') {
      return res.status(400).json({ error: 'Invalid Cloudinary URL' });
    }

    // Download the PDF from Cloudinary using axios
    const response = await axios({
      url: cloudinaryURL,
      method: 'GET',
      responseType: 'arraybuffer', // Fetch the file as a binary buffer
    });

    // Save the PDF temporarily to process it
    const pdfPath = './temp.pdf';
    fs.writeFileSync(pdfPath, response.data); // Write the buffer to a temp file

    // Extract text from the PDF
    const data = await pdf(fs.readFileSync(pdfPath));

    // Extracted text from the PDF
    const extractedText = data.text;

    // Extract emails and skills from the extracted text
    const emails = extractEmails(extractedText);
    const skills = extractSkills(extractedText);

    // Clean up by deleting the temporary PDF file
    fs.unlinkSync(pdfPath);

    // Send back the extracted emails and skills
    res.status(200).json({
      emails: emails,
      skills: skills
    });

  } catch (error) {
    console.error('Error extracting text from PDF:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { extractTextFromPDF };