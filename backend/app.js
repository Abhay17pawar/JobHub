const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  
const { mongoose } = require("mongoose");
const uploadRoutes = require('./routes/file');
const cron = require("node-cron");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors()); 

app.use(express.json());

const dashboardRoutes = require('./routes/dashboardRoute');
const paymentRoutes = require("./routes/paymentRoute");
const platformRoutes = require("./routes/platform");
const { linkedinCronJobs } = require("./cron/schedule");

app.use('/api', dashboardRoutes);
app.use('/api', uploadRoutes);
app.use('/api',platformRoutes);
app.use("/api/payment", paymentRoutes);

mongoose.connect(MONGO_URI)
        .then(() => {
          console.log("server connected to mongoDB")
          linkedinCronJobs();
        })
        .catch((error) => {
          console.log(() => {
            console.log("error connecting to MongoDB : ",error);
          })
        })


  app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

