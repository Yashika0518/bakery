const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const feedbackSchema = new mongoose.Schema({
    message: String
});
const Feedback = mongoose.model('Feedback', feedbackSchema);

app.post('/feedback', async (req, res) => {
    const newFeedback = new Feedback({ message: req.body.message });
    await newFeedback.save();
    res.json({ success: true, message: "Feedback submitted" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
