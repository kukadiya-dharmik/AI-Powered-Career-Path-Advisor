const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const GEMINI_API_KEY = 'AIzaSyCvFO-JYDoyD0kRdS_m3-6Rn7lCVD2ylx0';

// POST /chatbot/message - send a message to Gemini and get a response
router.post('/message', async (req, res) => {
  const { message } = req.body;
  console.log('Received message:', message);
  console.log('Using Gemini API key:', GEMINI_API_KEY ? 'SET' : 'NOT SET');
  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }
  try {
    const prompt = message;
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    const data = response.data;
    let text = '';
    try {
      text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } catch (e) {
      text = '';
    }
    res.json({ reply: text });
  } catch (err) {
    let errorMsg = err.message;
    if (err.response && err.response.data) {
      errorMsg = JSON.stringify(err.response.data);
    }
    res.status(500).json({ error: 'Gemini API error: ' + errorMsg });
  }
});

module.exports = router; 