# Text-to-Speech Application

A full-stack web application that converts written text into natural-sounding speech using ElevenLabs, MongoDB, and a modern Next.js frontend.

## Live Demo URL

Live project URL: https://your-production-url.example

## Overview

The application allows users to:

- enter or paste text
- choose a language
- select a voice
- generate speech audio
- play the generated audio in the browser
- download the generated MP3 file
- validate input and handle API errors gracefully

This project demonstrates a complete full-stack workflow involving:

- frontend and backend communication
- REST API design
- TTS provider integration
- MongoDB metadata storage
- audio file generation and serving
- deployment preparation and production configuration

## Features

- Text input with validation
- Character count and word count
- Maximum text length of 5000 characters
- Language selection
- Dynamic voice selection from ElevenLabs
- Generate Speech action
- Audio playback with play, pause, seek, and volume controls
- MP3 download
- MongoDB speech metadata storage
- Centralized backend error handling
- CORS and environment-based configuration

## Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- ShadCN UI
- Fetch API

### Backend

- Node.js
- Express.js
- JavaScript
- ES Modules

### Database

- MongoDB
- Mongoose

### Text-to-Speech Provider

- ElevenLabs

## Project Structure

```text
Web Text To Speech/
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .gitignore
├── server/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── docs/
├── .gitignore
├── README.md
└── package-lock.json
```

## Getting Started

### 1. Install dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

### 2. Configure environment variables

Create environment files for both app folders using the project configuration values.

Frontend example:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Backend example:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
BACKEND_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
TTS_API_KEY=your_elevenlabs_api_key
TTS_ENDPOINT=https://api.elevenlabs.io
```

Important:

- Never commit real secrets to GitHub
- Keep `.env` files local only
- Use deployment secrets for production

## API Endpoints

### Health Check

- `GET /api/health`

### Voices

- `GET /api/voices`

### Generate Speech

- `POST /api/tts`

Example request body:

```json
{
  "text": "Hello, welcome to the Text-to-Speech application.",
  "language": "en",
  "voice": "REAL_ELEVENLABS_VOICE_ID",
  "speed": 1
}
```

Example response:

```json
{
  "success": true,
  "message": "Speech generated successfully",
  "data": {
    "id": "speech_record_id",
    "audioUrl": "http://localhost:5000/audio/generated-file.mp3",
    "text": "Hello, welcome to the Text-to-Speech application.",
    "language": "en",
    "voice": "REAL_ELEVENLABS_VOICE_ID",
    "speed": 1,
    "provider": "elevenlabs",
    "createdAt": "2026-10-04T00:00:00.000Z"
  }
}
```

## MongoDB Setup

- Create a MongoDB Atlas cluster or use a local MongoDB instance
- Add the connection string to `MONGODB_URI`
- The app stores speech metadata such as text, language, voice, speed, audio URL, and creation time

## ElevenLabs Setup

- Create an ElevenLabs account
- Generate an API key
- Store the key in `TTS_API_KEY`
- Use the provider’s voice IDs dynamically from the API
- Do not hardcode fake voice IDs

## Frontend and Backend Flow

```text
User -> Frontend -> Backend API -> ElevenLabs -> Audio File -> Backend -> Frontend Audio Player
```

The app uses the generated backend audio URL to provide playback and download functionality without exposing provider secrets.

## Testing

This project should be tested for:

- empty input validation
- long input validation
- voice and language switching
- loading states
- audio playback
- audio download
- API health checks
- invalid voice and invalid language handling
- provider/network failures

## Error Handling

The backend handles:

- invalid input
- missing text
- invalid voice selection
- unsupported language
- oversized text
- provider failure
- network failure
- server-side errors

Responses follow a consistent success/error structure and avoid exposing sensitive internal details to the user.

## Deployment

Recommended deployment setup:

- Frontend: Vercel
- Backend: Render or Railway
- Database: MongoDB Atlas
- TTS provider: ElevenLabs

### Production environment variables

Set production secrets in the deployment platform environment settings, not in the repository.

## Security Notes

- Do not expose API keys in the frontend
- Do not commit `.env` files to source control
- Use environment variables for all sensitive configuration
- Configure CORS properly for the deployment frontend URL
- Keep backend-only credentials on the server side only
