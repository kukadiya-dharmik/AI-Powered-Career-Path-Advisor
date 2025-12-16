const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

console.log('Gemini code is running!'); // Confirm Gemini code is active

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getCareerRecommendations({ education, skills, interests }) {
  const prompt = `Suggest 10 to 15 best career paths for a user with:\n- Education: ${education}\n- Skills: ${skills.join(', ')}\n- Interests: ${interests.join(', ')}\nReturn ONLY a valid JSON array (no notes, no code block, no explanation), with each object containing: career_title, reason, required_skills, average_salary, demand_level, learning_resources.`;

  console.log('Sending prompt to Gemini:', prompt);

  let data;
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=AIzaSyCvFO-JYDoyD0kRdS_m3-6Rn7lCVD2ylx0`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    data = response.data;
  } catch (err) {
    // Improved error handling for Gemini API
    let errorMsg = err.message;
    if (err.response && err.response.data) {
      errorMsg = JSON.stringify(err.response.data);
    }
    console.error('Error from Gemini:', err);
    throw new Error('Gemini API error: ' + errorMsg);
  }

  console.log('Raw Gemini response:', data);
  let text = '';
  try {
    text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (e) {
    console.error('Error extracting text from Gemini response:', e, data);
  }
  console.log('Raw generated_text:', text);

  // Clean up the text: remove code block markers and trim
  let cleanedText = text.replace(/```json|```/g, '').trim();

  // Try to extract JSON from the response
  let recommendations = [];
  try {
    // Find the first JSON array in the cleaned text
    const match = cleanedText.match(/\[[\s\S]*?\]/);
    if (match) {
      let jsonStr = match[0].replace(/,(\s*[\]}])/g, '$1');
      recommendations = JSON.parse(jsonStr);
    } else {
      recommendations = JSON.parse(cleanedText);
    }
  } catch (e) {
    console.error('Error parsing AI response:', e, 'Raw text:', cleanedText);
    // Fallback: try to extract career blocks manually
    const careerBlocks = cleanedText.match(/\{[\s\S]*?\}/g);
    if (careerBlocks && careerBlocks.length > 0) {
      recommendations = careerBlocks.map(block => {
        try {
          return JSON.parse(block.replace(/,(\s*[\]}])/g, '$1'));
        } catch (err) {
          return { title: 'AI Output (Partial)', reason: block, salaryRange: '', demandLevel: '', skills: [], learningSuggestions: [] };
        }
      });
    } else {
      // Final fallback: return the raw text as a single recommendation
      recommendations = [{
        title: 'AI Output (Raw)',
        reason: cleanedText,
        salaryRange: '',
        demandLevel: '',
        skills: [],
        learningSuggestions: []
      }];
    }
  }
  return recommendations;
}

router.post('/recommendations', async (req, res) => {
  const { education, skills, interests } = req.body;
  try {
    const recommendations = await getCareerRecommendations({ education, skills, interests });
    res.json({ recommendations });
  } catch (err) {
    res.status(500).json({ message: 'AI model error', error: err.message });
  }
});

// TEMPORARY: List available Gemini models for this API key
router.get('/list-models', async (req, res) => {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1/models?key=${GEMINI_API_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message, details: err.response?.data });
  }
});

module.exports = router; 