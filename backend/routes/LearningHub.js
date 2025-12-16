const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function getCareerRecommendations({ education, skills, interests }) {
  const prompt = `Suggest 10 to 15 best career paths for a user with:\n- Education: ${education}\n- Skills: ${skills.join(', ')}\n- Interests: ${interests.join(', ')}\nReturn ONLY a valid JSON array (no notes, no code block, no explanation), with each object containing: career_title, reason, required_skills, average_salary, demand_level, learning_resources.`;

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
    throw new Error('Gemini API error: ' + errorMsg);
  }

  let text = '';
  try {
    text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (e) {
    console.error('Error extracting text from Gemini response:', e, data);
  }

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

// Gemini-powered course suggestions for LearningHub
router.post('/courses', async (req, res) => {
  const { query, apiKey } = req.body;
  if (!query) return res.status(400).json({ message: 'Query is required.' });
  const prompt = `Suggest 15-20 online courses (with title, instructor, short description, and direct link) relevant to: "${query}". Return ONLY a valid JSON array (no notes, no code block, no explanation), with each object containing: title, instructor, description, link.`;
  let data;
  const keyToUse = apiKey || GEMINI_API_KEY;
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
    let errorMsg = err.message;
    if (err.response && err.response.data) {
      errorMsg = JSON.stringify(err.response.data);
    }
    return res.status(500).json({ message: 'Gemini API error', error: errorMsg });
  }
  let text = '';
  try {
    text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (e) {}
  let cleanedText = text.replace(/```json|```/g, '').trim();
  let courses = [];
  try {
    const match = cleanedText.match(/\[[\s\S]*?\]/);
    if (match) {
      let jsonStr = match[0].replace(/,(\s*[\]}])/g, '$1');
      courses = JSON.parse(jsonStr);
    } else {
      courses = JSON.parse(cleanedText);
    }
  } catch (e) {
    const courseBlocks = cleanedText.match(/\{[\s\S]*?\}/g);
    if (courseBlocks && courseBlocks.length > 0) {
      courses = courseBlocks.map(block => {
        try {
          return JSON.parse(block.replace(/,(\s*[\]}])/g, '$1'));
        } catch (err) {
          return { title: 'AI Output (Partial)', description: block, instructor: '', link: '' };
        }
      });
    } else {
      courses = [{
        title: 'AI Output (Raw)',
        description: cleanedText,
        instructor: '',
        link: ''
      }];
    }
  }
  return res.json({ courses });
});

// Top course recommendations (static)
router.get('/top-courses', (req, res) => {
  const topCourses = [
    {
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      description: 'Learn web development from scratch with HTML, CSS, JavaScript, Node.js, React, MongoDB and more.',
      link: 'https://www.udemy.com/course/the-complete-web-development-bootcamp/'
    },
    {
      title: 'Machine Learning A-Z',
      instructor: 'Kirill Eremenko',
      description: 'Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.',
      link: 'https://www.udemy.com/course/machinelearning/'
    },
    {
      title: 'UI/UX Design Masterclass',
      instructor: 'Daniel Schifano',
      description: 'Learn UI/UX design from scratch. Master Figma, design systems, user research, and prototyping.',
      link: 'https://www.udemy.com/course/ui-ux-web-design-using-adobe-xd/'
    },
    {
      title: 'Digital Marketing Complete Course',
      instructor: 'Rob Percival',
      description: 'Master digital marketing with SEO, Google Ads, Facebook Ads, email marketing, and analytics.',
      link: 'https://www.udemy.com/course/complete-digital-marketing-course/'
    },
    {
      title: 'Python for Data Science',
      instructor: 'Jose Portilla',
      description: 'Learn Python programming for data science with NumPy, Pandas, Matplotlib, and Seaborn.',
      link: 'https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/'
    }
  ];
  res.json({ courses: topCourses });
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