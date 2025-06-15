import axios from 'axios';
import { Note } from '../types/notes';

const API_BASE_URL = '/api/notes';

export const notesApiService = {
  getNotes: () => axios.get<Note[]>(`${API_BASE_URL}/`),

  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) =>
    axios.post<Note>(`${API_BASE_URL}/`, note),

  updateNote: (id: string, note: Partial<Note>) => 
    axios.put<Note>(`${API_BASE_URL}/${id}`, note),
  
  deleteNote: (id: string) => 
    axios.delete(`${API_BASE_URL}/${id}`),

  duplicateNote: (originalNoteId: string) =>
    axios.post<Note>(`${API_BASE_URL}/${originalNoteId}/duplicate`, {}),
};