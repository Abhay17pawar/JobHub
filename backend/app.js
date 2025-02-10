const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');  
const { mongoose } = require("mongoose");
const uploadRoutes = require('./routes/file');
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors()); 

app.use(express.json());

const dashboardRoutes = require('./routes/dashboardRoute');

app.use('/api', dashboardRoutes);
app.use('/api', uploadRoutes);

mongoose.connect(MONGO_URI)
        .then(() => {
          console.log("server connected to mongoDB")
        })
        .catch((error) => {
          console.log(() => {
            console.log("error connecting to MongoDB : ",error);
          })
        })


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


