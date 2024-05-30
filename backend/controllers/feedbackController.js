const Feedback = require('../models/feedbackModel');
const feedbackFunc = async (req, res) => {
    const { name, feedback } = req.body;
    try{
        const newFeedback = new Feedback({ name, feedback });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback saved successfully' });
    }catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
}
module.exports =  feedbackFunc ;