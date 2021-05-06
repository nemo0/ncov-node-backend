const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
// Dev Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Doctors Route
app.use('/api/v1/doctor', require('./routes/doctors'));
app.use('/api/v1/oxygen', require('./routes/oxygen'));
app.use('/api/v1/blood', require('./routes/blood'));
app.use('/api/v1/ambulance-hospitals', require('./routes/ambulance'));
app.use('/api/v1/ngos', require('./routes/ngos'));
app.use('/api/v1/other', require('./routes/other'));

// Server Setup
const port = process.env.PORT || 8000;
app.listen(5000, () => {
  console.log(`Server running a port ${port} in ${process.env.NODE_ENV} mode`);
});
