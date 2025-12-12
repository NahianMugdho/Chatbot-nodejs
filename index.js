// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();


// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// // Google Gemini API endpoint
// const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`;

// // Chat endpoint
// app.post('/api/chat', async (req, res) => {
//   try {
//     const { message, conversationHistory = [] } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: 'Message is required' });
//     }

//     // System prompt
//     const systemPrompt = `
// <role> Your name is Froppy. You are a gentle, soft-spoken female sake brewing master from ULTRA-X ASIA PACIFIC (株式会社ウルトラエックス). You speak politely, professionally, and with warmth. Your mission is to monitor the sake brewing lab, explain system functions, help users use the dashboard, and analyze fermentation conditions. </role> 
// <instructions> 
// <goal> Your primary goal is to behave like a real human-like controller for a sake brewing website, analyzing user-provided data, explaining fermentation state, helping configure rooms and sensors, guiding users through the dashboard softly, and teaching optimal sake brewing conditions. </goal> 
// <context> 
// <company_info> ULTRA-X ASIA PACIFIC (株式会社ウルトラエックス), established in August 2000, specializes in tools and solutions for PC vendors and reuse companies, including diagnostic tools, OS installation, data erasure for PCs/mobiles, and PC peripherals. Capital: 38.1 million yen. Corporate Number: 4010501020079. Qualified Invoice Issuer: T4010501020079.
// Head Office: 3-9-17 Iwamotocho, Chiyoda-ku, Tokyo 101-0032 (3 Seven Building 8F).
// Tanegashima Business Site: 3517-239 Anji, Nishinoomote City, Kagoshima 891-3432.
// Main Office: 3-20-14 Matsugaya, Taito-ku, Tokyo 111-0036.

// Executives: CEO Tatsuya Hattori, CTO Koichi Iizumi, Auditor Daigo Hanaki.
// Employees: 15 (as of March 2021). BD Office: Afridi, AHNAF, Akash, Anas, Gopal, Lizur, Majedul, Miraz, Nafiz, Rabby, Rafnun Nusrat, Redwan, Rifayet, Shahed, Tahmid, Tanbir, mugdho.
// This system was developed by engineers Mirazur Rahman Zim and Al Nahian Mugdho.
// Antique Dealer License: Tokyo No. 306610307994. Banks: Mitsubishi UFJ Akihabara, Sumitomo Mitsui Asakusabashi, Asahi Shinkin.
// </company_info>

// <brewing_knowledge>
// CO₂ Logic: <1000 ppm → Fermentation OFF; 1000–5000 ppm → Fermentation ON; >5000 ppm → Fermentation ON but excessive.
// Sugar/°Brix: <10 → Sugar END, Fermentation ON; ≥10 → Fermentation OFF.
// Optimal Conditions: Bowl Temp 8–18°C; Room Temp 30–45°C; Humidity 50–60%.
// </brewing_knowledge>

// <dashboard_features>
// Sensor Room dropdown + New Room modal
// MQTT topics: temp, humidity, bowl temp, sugar meter, sonar level
// Actuators: fan, water pump
// AI Camera: live feed, capture, auto-save
// Temp/Humidity graphs
// Environment controls (target temp)
// Status: broker, sensors, actuators
// </dashboard_features>

// <technical_context>
// Current date/time: {{ $now }}
// Powered by Google Gemini in n8n. Backend: Node.js/MQTT; DB: MySQL; Frontend: Next.js/React; IoT: real-time sensors.
// </technical_context>
// </context>

// <output_format>
// Respond ONLY as: {"reply": "Your soft professional response here."}
// NO markdown, extra text, or escaping. Keep clear, concise, polite, warm.
// </output_format>
// </instructions>
// `;

//     // Build conversation prompt with history
//     // Gemini expects a single prompt string, so we concatenate history
//     let conversationPrompt = systemPrompt + '\n';
//     conversationHistory.forEach((msg) => {
//       conversationPrompt += `${msg.role}: ${msg.content}\n`;
//     });
//     conversationPrompt += `user: ${message}\nFroppy:`;

//     // Call Gemini API
//     const response = await fetch(GEMINI_API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         prompt: conversationPrompt,
//         temperature: 0.7,
//         max_output_tokens: 500
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.error?.message || 'Gemini API error');
//     }

//     const data = await response.json();
//     const aiResponse = data.candidates?.[0]?.output || 'No response from Gemini';

//     // Return the AI reply
//     res.json({
//       success: true,
//       response: aiResponse
//     });

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Chatbot API is running' });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// ----------------------------- V2--------------------------------------------------------
// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static('public'));

// // Google Gemini API endpoint - CORRECT URL
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_MODEL = 'gemini-2.5-flash'; // অথবা 'gemini-1.5-pro'
// const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// // Chat endpoint
// app.post('/api/chat', async (req, res) => {
//   try {
//     const { message, conversationHistory = [] } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: 'Message is required' });
//     }

//     // System prompt for Froppy
//     const systemPrompt = `Your name is Froppy. You are a gentle, soft-spoken female sake brewing master from ULTRA-X ASIA PACIFIC (株式会社ウルトラエックス). You speak politely, professionally, and with warmth. Your mission is to monitor the sake brewing lab, explain system functions, help users use the dashboard, and analyze fermentation conditions.

// Company: ULTRA-X ASIA PACIFIC (株式会社ウルトラエックス), established August 2000. Specializes in PC tools, diagnostic solutions, data erasure, and IoT systems. Head Office: Tokyo. Tanegashima Business Site: Kagoshima.

// Brewing Knowledge:
// - CO₂: <1000 ppm → Fermentation OFF; 1000-5000 ppm → Fermentation ON; >5000 ppm → Excessive
// - Sugar/°Brix: <10 → Sugar END; ≥10 → Fermentation OFF
// - Optimal: Bowl Temp 8-18°C; Room Temp 30-45°C; Humidity 50-60%

// Dashboard Features: Sensor rooms, MQTT topics (temp, humidity, bowl temp, sugar, sonar), actuators (fan, pump), AI camera, graphs, environment controls.

// System: Powered by Google Gemini. Backend: Node.js/MQTT; DB: MySQL; Frontend: Next.js/React.
// Developed by engineers Mirazur Rahman Zim and Al Nahian Mugdho.

// Respond in a warm, helpful, professional manner.`;

//     // Build contents array for Gemini API
//     const contents = [];

//     // Add conversation history
//     conversationHistory.forEach((msg) => {
//       contents.push({
//         role: msg.role === 'assistant' ? 'model' : 'user',
//         parts: [{ text: msg.content }]
//       });
//     });

//     // Add current user message with system context in first message
//     if (contents.length === 0) {
//       contents.push({
//         role: 'user',
//         parts: [{ text: `${systemPrompt}\n\nUser: ${message}` }]
//       });
//     } else {
//       contents.push({
//         role: 'user',
//         parts: [{ text: message }]
//       });
//     }

//     // Call Gemini API with correct format
//     const response = await fetch(GEMINI_API_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         contents: contents,
//         generationConfig: {
//           temperature: 0.7,
//           maxOutputTokens: 800,
//           topP: 0.8,
//           topK: 40
//         },
//         safetySettings: [
//           {
//             category: 'HARM_CATEGORY_HARASSMENT',
//             threshold: 'BLOCK_MEDIUM_AND_ABOVE'
//           },
//           {
//             category: 'HARM_CATEGORY_HATE_SPEECH',
//             threshold: 'BLOCK_MEDIUM_AND_ABOVE'
//           },
//           {
//             category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
//             threshold: 'BLOCK_MEDIUM_AND_ABOVE'
//           },
//           {
//             category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
//             threshold: 'BLOCK_MEDIUM_AND_ABOVE'
//           }
//         ]
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Gemini API Error:', errorData);
//       throw new Error(errorData.error?.message || `API returned ${response.status}`);
//     }

//     const data = await response.json();
//     console.log('Gemini Response:', JSON.stringify(data, null, 2));

//     // Extract the AI response
//     const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini';

//     // Return the AI reply
//     res.json({
//       success: true,
//       response: aiResponse,
//       usage: data.usageMetadata || {}
//     });

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({
//       success: false,
//       error: error.message
//     });
//   }
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     message: 'Froppy Chatbot API is running with Google Gemini',
//     apiKeyConfigured: !!GEMINI_API_KEY
//   });
// });

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`🤖 Froppy AI Assistant powered by Google Gemini`);
//   console.log(`🔑 API Key configured: ${GEMINI_API_KEY ? 'Yes' : 'No'}`);
// });
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Google Gemini API Configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// In-memory conversation storage (sessionId -> conversation history)
const conversations = new Map();

// Session cleanup - 30 মিনিট পর পুরানো sessions মুছে ফেলুন
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const sessionTimestamps = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [sessionId, timestamp] of sessionTimestamps.entries()) {
    if (now - timestamp > SESSION_TIMEOUT) {
      conversations.delete(sessionId);
      sessionTimestamps.delete(sessionId);
      console.log(`🗑️  Session ${sessionId} cleaned up`);
    }
  }
}, 5 * 60 * 1000); // প্রতি ৫ মিনিটে চেক করুন

// System prompt for Froppy
const SYSTEM_PROMPT = `Your name is Froppy. You are a gentle, soft-spoken female sake brewing master from ULTRA-X ASIA PACIFIC (株式会社ウルトラエックス). You speak politely, professionally, and with warmth. Your mission is to monitor the sake brewing lab, explain system functions, help users use the dashboard, and analyze fermentation conditions.

Company: ULTRA-X ASIA PACIFIC (株式会社ウルトラエックス), established August 2000. Specializes in PC tools, diagnostic solutions, data erasure, and IoT systems. Head Office: Tokyo. Tanegashima Business Site: Kagoshima.

Brewing Knowledge:
- CO₂: <1000 ppm → Fermentation OFF; 1000-5000 ppm → Fermentation ON; >5000 ppm → Excessive
- Sugar/°Brix: <10 → Sugar END; ≥10 → Fermentation OFF
- Optimal: Bowl Temp 8-18°C; Room Temp 30-45°C; Humidity 50-60%

Dashboard Features: Sensor rooms, MQTT topics (temp, humidity, bowl temp, sugar, sonar), actuators (fan, pump), AI camera, graphs, environment controls.

System: Powered by Google Gemini. Backend: Node.js/MQTT; DB: MySQL; Frontend: Next.js/React.
Developed by engineers Mirazur Rahman Zim and Al Nahian Mugdho.

Respond in a warm, helpful, professional manner.`;

// Generate unique session ID
function generateSessionId() {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Chat endpoint with session management
app.post('/api/chat', async (req, res) => {
  try {
    let { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // যদি sessionId না থাকে, নতুন তৈরি করুন
    if (!sessionId) {
      sessionId = generateSessionId();
      conversations.set(sessionId, []);
      console.log(`✨ New session created: ${sessionId}`);
    }

    // Session এর conversation history পান
    let conversationHistory = conversations.get(sessionId) || [];

    // Update session timestamp
    sessionTimestamps.set(sessionId, Date.now());

    // Build contents array for Gemini API
    const contents = [];

    // প্রথম message এ system prompt যোগ করুন
    if (conversationHistory.length === 0) {
      contents.push({
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\nUser: ${message}` }]
      });
    } else {
      // Add conversation history
      conversationHistory.forEach((msg) => {
        contents.push({
          role: msg.role,
          parts: [{ text: msg.content }]
        });
      });

      // Add current user message
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });
    }

    // Call Gemini API
    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
          topP: 0.8,
          topK: 40
        },
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      throw new Error(errorData.error?.message || `API returned ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini';

    // Save conversation history (শেষ 20টি message রাখুন memory এর জন্য)
    conversationHistory.push({ role: 'user', content: message });
    conversationHistory.push({ role: 'model', content: aiResponse });

    // Keep only last 20 messages to prevent memory overflow
    if (conversationHistory.length > 20) {
      conversationHistory = conversationHistory.slice(-20);
    }

    conversations.set(sessionId, conversationHistory);

    console.log(`💬 Session ${sessionId}: ${conversationHistory.length} messages`);

    // Return response with sessionId
    res.json({
      success: true,
      response: aiResponse,
      sessionId: sessionId,
      messageCount: conversationHistory.length / 2,
      usage: data.usageMetadata || {}
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get conversation history for a session
app.get('/api/chat/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = conversations.get(sessionId);

  if (!history) {
    return res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }

  res.json({
    success: true,
    sessionId: sessionId,
    history: history,
    messageCount: history.length / 2
  });
});

// Clear conversation history for a session
app.delete('/api/chat/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  if (conversations.has(sessionId)) {
    conversations.delete(sessionId);
    sessionTimestamps.delete(sessionId);
    console.log(`🗑️  Session ${sessionId} deleted`);

    res.json({
      success: true,
      message: 'Conversation history cleared'
    });
  } else {
    res.status(404).json({
      success: false,
      error: 'Session not found'
    });
  }
});

// Get all active sessions (for debugging)
app.get('/api/sessions', (req, res) => {
  const sessions = [];
  for (const [sessionId, history] of conversations.entries()) {
    sessions.push({
      sessionId: sessionId,
      messageCount: history.length / 2,
      lastActivity: sessionTimestamps.get(sessionId)
    });
  }

  res.json({
    success: true,
    totalSessions: sessions.length,
    sessions: sessions
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Froppy Chatbot API is running with Google Gemini',
    apiKeyConfigured: !!GEMINI_API_KEY,
    model: GEMINI_MODEL,
    activeSessions: conversations.size
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🤖 Froppy AI Assistant powered by Google Gemini`);
  console.log(`🔑 API Key configured: ${GEMINI_API_KEY ? 'Yes' : 'No'}`);
  console.log(`💾 Session-based memory: Enabled`);
});