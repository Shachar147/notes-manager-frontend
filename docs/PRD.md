# PRD: AI Chatbot Search for Notes

## Overview

Upgrade the notes-manager app to allow users to search and retrieve notes using a conversational AI chatbot. The chatbot will use an LLM (Ollama) to answer user questions by semantically understanding the question, searching the notes database, and returning a short answer with links to relevant notes.

---

## Goals

- Users can ask questions in natural language.
- The AI chatbot semantically understands the question and finds the most relevant note(s) in the database.
- The chatbot's response is a short, direct answer with links to the relevant note(s) for further reading.
- Simple, intuitive chat UI (icon button, opens chatbot, no chat history).

---

## Features

### 1. AI Chatbot (Semantic Search & Answer)

- Floating icon button at the bottom right of the screen.
- Clicking the icon opens a chatbot window (no chat history).
- User can type a question in natural language.
- Backend endpoint for chat:
  - Receives user question.
  - Uses semantic search (not just keywords) to find the most relevant note(s) in the database.
  - Sends the question and relevant note(s) as context to Ollama LLM.
  - Returns a short, direct answer and links to the relevant note(s) ("Read more").
- Frontend displays the answer and links to the notes used as sources.
- Display questions and answers in a chat conversation style (different colors for user and bot, profile images for each).

### 2. Notes Management (Existing)

- CRUD for notes (title, content, user, createdAt, updatedAt).
- No tags or categories (see current Note entity).
- Embeddings are not returned in GET notes (used only for chat route).

---

## Technical Requirements

### Backend

- Endpoint: POST /api/chat
  - Input: user question
  - Process:
    - Use semantic search (e.g., embeddings) to find relevant notes (title/content fields).
    - Send question and top relevant notes as context to Ollama.
    - Return a short answer and links to the relevant notes.
- Notes database (as per current Note entity: id, title, content, userId, createdAt, updatedAt).
- Embedding generation for notes (if using semantic search).
- Add Ollama service to docker-compose.yml if needed.
- Do not return embeddings in GET notes endpoint (only use for chat).
- Use logger.error for error handling so errors are written to ElasticSearch.
- Track how many times each note is returned as an answer in the chatbot (see Analytics section below).

### Frontend

- Floating icon button (bottom right).
- Clicking opens a simple chatbot window (no chat history).
- User can enter a question and receive a short answer with links to relevant notes.
- Responsive, minimal UI.
- Display chat as a conversation: different colors for user and bot, profile images for each.
- Consider using a React chat UI framework/component for faster development (see below).

### LLM (Ollama)

- Host Ollama server (add to docker-compose.yml if needed).
- Use for both embedding generation (if needed) and chat completion.

### Analytics: Note Usage in Chatbot Answers

- Track how many times each note is returned as a chatbot answer.
- Recommended: Create a new table (e.g., note_chatbot_usage) with columns: id, note_id (FK), timestamp, question, user_id (nullable), etc.
- This allows for detailed BI/analytics and avoids bloating the Note table.
- Optionally, maintain a counter on the Note table for quick access, but store events in a separate table for analytics.

---

## User Story

- As a user, I can click a chat icon, ask a question, and get a short answer with links to relevant notes in the system.

---

## Out of Scope

- Tags, categories, or advanced note organization.
- User management/authentication.
- Note versioning/audit log.
- External document import/export.
- Analytics, feedback, or advanced organization (beyond note usage tracking).
- Chat history or multi-turn conversations.

---

## Implementation Plan Checklist

### Backend
- [x] **Backend - Add Ollama service to docker-compose.yml**
- [x] **Backend - Set up Ollama server and ensure it is accessible from the backend**
- [x] **Backend - Add embedding generation for notes (on create/update)**
- [x] **Backend - Store embeddings in a separate table (note_embedding) for scalability**
- [x] **Backend - Implement semantic search logic (find top relevant notes by embedding similarity)**
- [x] **Backend - Create POST /api/chat endpoint**
- [x] **Backend - In /api/chat, process user question: generate embedding, find relevant notes, send context to Ollama, return short answer + links**
- [x] **Backend - Do not return embeddings in GET notes endpoint**
- [x] **Backend - Add error handling using logger.error so errors are written to ElasticSearch**
- [x] **Backend - Track note usage in chatbot answers: create note_chatbot_usage table and increment usage on each answer**
- [x] **Backend - Write tests for chat endpoint, semantic search, and analytics tracking**

### Frontend
- [ ] **Frontend - Add floating chat icon button to bottom right of the app**
- [ ] **Frontend - Implement chatbot window UI (opens on icon click, closes on outside click or X)**
- [ ] **Frontend - Add input box for user question and submit button**
- [ ] **Frontend - Display AI response: short answer and links to relevant notes**
- [ ] **Frontend - Link to note detail page from chat response**
- [ ] **Frontend - Show loading indicator while waiting for response**
- [ ] **Frontend - Add error handling for failed chat requests**
- [ ] **Frontend - Display chat as conversation: different colors for user and bot, profile images for each**
- [ ] **Frontend - Consider using a React chat UI framework/component (e.g., react-chat-ui, react-chatbot-kit, BotUI, or custom)**
- [ ] **Frontend - Ensure responsive and accessible UI**
- [ ] **Frontend - Write tests for chatbot UI and integration**

### DevOps / General
- [ ] **DevOps - Update documentation for setup and usage of Ollama and new chat feature**
- [ ] **DevOps - Ensure all services work together in local/dev environment**

---

## DB Changes

- Create table: `note_embedding`
  - `id` (PK, uuid)
  - `note_id` (FK to Note, uuid)
  - `embedding` (vector/float[]/jsonb)
  - `created_at` (timestamp)
- Create table: `note_chatbot_usage`
  - `id` (PK, uuid)
  - `note_id` (FK to Note, uuid)
  - `question` (text)
  - `timestamp` (timestamp)
  - `user_id` (nullable, FK to User, uuid)
- (Optional) Add `chatbot_usage_count` column to `Note` for quick stats (int, default 0)
- (If needed) Update docker-compose.yml to add Ollama service

---

## Planned New/Modified Files

### Backend
- [ ] `src/features/notes/notes.embedding.entity.ts` (new) — Note embedding entity/model
- [ ] `src/features/notes/notes.embedding.repository.ts` (new) — Embedding DB logic
- [ ] `src/features/notes/notes.embedding.service.ts` (new) — Embedding generation logic
- [ ] `src/features/notes/notes-chatbot-usage.entity.ts` (new) — Note chatbot usage entity/model
- [ ] `src/features/notes/notes-chatbot-usage.repository.ts` (new) — Usage DB logic
- [ ] `src/features/notes/notes-chatbot-usage.service.ts` (new) — Usage tracking logic
- [ ] `src/features/notes/notes-chat.controller.ts` (new) — Chat endpoint controller
- [ ] `src/features/notes/notes-chat.service.ts` (new) — Chat logic (semantic search, LLM call)
- [ ] `src/features/notes/notes.routes.ts` (modified) — Add chat route
- [ ] `src/features/notes/notes.repository.ts` (modified) — Exclude embeddings from GET notes
- [ ] `src/features/notes/notes.service.ts` (modified) — Integrate embedding and usage logic
- [ ] `src/config/elasticsearch.ts` (modified) — Ensure logger.error integration
- [ ] `docker-compose.yml` (modified) — Add Ollama service
- [ ] Migration files for new tables/columns

### Frontend
- [ ] `src/common/components/chatbot/chatbot-button.tsx` (new) — Floating chat icon button
- [ ] `src/common/components/chatbot/chatbot-window.tsx` (new) — Chatbot UI window
- [ ] `src/common/components/chatbot/chat-message.tsx` (new) — Chat message bubble (user/bot)
- [ ] `src/common/components/chatbot/chatbot.module.css` (new) — Styles for chat UI
- [ ] `src/app.tsx` (modified) — Add chatbot button
- [ ] `src/features/notes/services/notes-api.service.ts` (modified) — Add chat API call
- [ ] Tests for new components/services

### DevOps
- [ ] Documentation updates for setup and usage 