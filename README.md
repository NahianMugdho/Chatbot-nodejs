# 🤖 Chat API with Session Memory

A powerful REST API for conversational AI with built-in session management and memory persistence.

## 🚀 Features

- **Session-based Memory** - Each user gets an isolated conversation context
- **In-memory Storage** - Lightning-fast access using JavaScript `Map()`
- **Auto Cleanup** - Inactive sessions automatically deleted after 30 minutes
- **Message Limit** - Retains last 20 messages to prevent memory overflow
- **RESTful Endpoints** - Complete CRUD operations for chat sessions

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Anthropic API Key

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <project-folder>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
PORT=3000
ANTHROPIC_API_KEY=your_api_key_here
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

### 1. Send Chat Message

Create a new conversation or continue an existing one.

**Endpoint:** `POST /api/chat`

**New Session Example:**
```json
{
  "message": "Hello, my name is Nahian"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Hello Nahian! I'm Froppy...",
  "sessionId": "session_1234567890_abc123",
  "messageCount": 1
}
```

**Continue Session Example:**
```json
{
  "message": "What is my name?",
  "sessionId": "session_1234567890_abc123"
}
```

**Response:**
```json
{
  "success": true,
  "response": "Your name is Nahian!",
  "sessionId": "session_1234567890_abc123",
  "messageCount": 2
}
```

### 2. Get Session History

Retrieve all messages from a specific session.

**Endpoint:** `GET /api/chat/history/:sessionId`

**Example:**
```
GET http://localhost:3000/api/chat/history/session_1234567890_abc123
```

**Response:**
```json
{
  "success": true,
  "sessionId": "session_1234567890_abc123",
  "messages": [
    {
      "role": "user",
      "content": "Hello, my name is Nahian"
    },
    {
      "role": "assistant",
      "content": "Hello Nahian! I'm Froppy..."
    }
  ],
  "messageCount": 2
}
```

### 3. Clear Conversation

Delete all messages from a specific session.

**Endpoint:** `DELETE /api/chat/history/:sessionId`

**Example:**
```
DELETE http://localhost:3000/api/chat/history/session_1234567890_abc123
```

**Response:**
```json
{
  "success": true,
  "message": "Conversation history cleared",
  "sessionId": "session_1234567890_abc123"
}
```

### 4. Get Active Sessions

List all currently active sessions.

**Endpoint:** `GET /api/sessions`

**Example:**
```
GET http://localhost:3000/api/sessions
```

**Response:**
```json
{
  "success": true,
  "activeSessions": [
    {
      "sessionId": "session_1234567890_abc123",
      "messageCount": 5,
      "lastActivity": "2025-12-12T10:30:00.000Z"
    },
    {
      "sessionId": "session_9876543210_xyz789",
      "messageCount": 3,
      "lastActivity": "2025-12-12T10:25:00.000Z"
    }
  ],
  "totalSessions": 2
}
```

### 5. Health Check

Check if the API server is running.

**Endpoint:** `GET /api/health`

**Example:**
```
GET http://localhost:3000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2025-12-12T10:30:00.000Z",
  "uptime": 3600
}
```

## 🎉 Backend Memory Management

### Session-based Memory
- Each user has a different isolated session
- Sessions are identified by unique `sessionId`
- No cross-contamination between users

### In-memory Storage
- Uses JavaScript `Map()` for fast access
- O(1) lookup time for session retrieval
- No database overhead for quick prototyping

### Auto Cleanup
- Inactive sessions automatically deleted after **30 minutes**
- Prevents memory leaks
- Reduces server resource usage

### Message Limit
- Last **20 messages** retained per session
- Prevents memory overflow
- Maintains context while staying efficient

## 🧪 Testing with Postman

### Test Flow:

1. **Start New Conversation:**
   - POST to `/api/chat` without `sessionId`
   - Save the returned `sessionId`

2. **Continue Conversation:**
   - POST to `/api/chat` with saved `sessionId`
   - Bot remembers previous context

3. **Check History:**
   - GET `/api/chat/history/:sessionId`
   - View all messages

4. **Clear Session:**
   - DELETE `/api/chat/history/:sessionId`
   - Start fresh

## 📝 Request Examples

### cURL Examples:

**New Message:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello, my name is Nahian"}'
```

**Continue Conversation:**
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is my name?", "sessionId": "session_1234567890_abc123"}'
```

**Get History:**
```bash
curl http://localhost:3000/api/chat/history/session_1234567890_abc123
```

**Clear History:**
```bash
curl -X DELETE http://localhost:3000/api/chat/history/session_1234567890_abc123
```

## 🔒 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing required fields)
- `404` - Session Not Found
- `500` - Internal Server Error

**Error Response Format:**
```json
{
  "success": false,
  "error": "Error message description"
}
```

## 🚦 Rate Limiting

Consider implementing rate limiting for production:
- Use `express-rate-limit` package
- Limit requests per IP/session
- Prevent abuse and DoS attacks

## 🔐 Security Considerations

For production deployment:
- Add authentication middleware
- Implement API key validation
- Use HTTPS only
- Add request validation
- Implement CORS properly
- Add rate limiting
- Sanitize user inputs

## 📦 Dependencies

```json
{
  "express": "^4.18.0",
  "@anthropic-ai/sdk": "^0.x.x",
  "dotenv": "^16.0.0"
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Mugdho Nahian**
**nahianmugdho@gmail.com**
## 🆘 Support

For issues and questions, please open an issue on GitHub.

---

