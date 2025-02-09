const linkedIn = require('linkedin-jobs-api');

const queryOptions = {
  keyword: 'java',
  location: 'India',
  dateSincePosted: 'past Week',
  jobType: 'full time',
  remoteFilter: 'remote',
  salary: '100',
  experienceLevel: 'entry level',
  limit: '5',
  page: "0",
};

linkedIn.query(queryOptions).then(response => {
	console.log(response); // An array of Job objects
});