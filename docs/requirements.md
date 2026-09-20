# Text-to-Speech Application

## 1. Project Overview

The Text-to-Speech Application is a full-stack web application that
converts user-provided text into natural-sounding speech.

Users can enter text, select a language and voice, generate speech,
play the generated audio, and download the audio file.

---

## 2. Objectives

- Convert text into speech.
- Provide multiple language options.
- Provide voice selection.
- Provide audio playback.
- Allow users to download generated audio.
- Provide a clean and responsive interface.
- Keep TTS provider credentials secure on the backend.

---

## 3. Core Features

### Text Input

- Text area for entering text.
- Character count.
- Word count.
- Maximum character validation.
- Empty input validation.

### Language Selection

Users can select the desired language.

### Voice Selection

Users can select an available voice based on the selected language.

### Speech Generation

The frontend sends the text, language, and voice information to the backend.

### Audio Playback

Generated speech can be played directly in the browser.

### Audio Download

Users can download the generated audio.

---

## 4. Backend API

### Health Check

GET `/api/health`

### Get Voices

GET `/api/voices`

### Generate Speech

POST `/api/tts`

---

## 5. Technology Stack

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- Axios
- React Hook Form

### Backend

- Node.js
- Express.js
- JavaScript
- ES Modules

### Database

- MongoDB
- Mongoose

### TTS

- Third-party Text-to-Speech provider

---

## 6. Security Requirements

- Never expose TTS API keys in the frontend.
- Store secrets in environment variables.
- Validate user input.
- Configure CORS.
- Use HTTPS in production.
- Implement rate limiting before production deployment.
- Do not permanently store generated audio unless required.

---

## 7. Non-Functional Requirements

- Responsive UI.
- Good API response time.
- Maintainable folder structure.
- Secure environment configuration.
- Proper error handling.
- Clean and reusable components.
- GitHub-ready project structure.

---

## 8. Future Features

- User authentication.
- Speech history.
- Favorite voices.
- Multiple TTS providers.
- Text file upload.
- PDF upload.
- DOCX upload.
- AI text enhancement.
- Audio customization.