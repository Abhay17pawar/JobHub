const mongoose = require("mongoose");

// Define the Job schema
const glassdoorSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    location: {
      type: String,
    },
    salary: {
      type: String,  
    },
    link: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);

const Job = mongoose.model("glassdoorJobs", glassdoorSchema);

module.exports = Job;
