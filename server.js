const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const plantRoutes = require('./routes/plantRoutes');
const contactRoutes = require('./routes/contactRoutes');
const jobRoutes = require("./routes/jobRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/users', userRoutes);
app.use('/api/plants', plantRoutes);
app.use('/api', contactRoutes);
app.use("/api/jobs", jobRoutes);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
