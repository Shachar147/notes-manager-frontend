import axios from 'axios';

export interface ChatNoteRef {
  id: string;
  title: string;
}

export interface ChatResponse {
  answer: string;
  notes: ChatNoteRef[];
}

export const chatApiService = {
  chat: (question: string) =>
    axios.post<ChatResponse>(`/api/chat`, { question }),
};
