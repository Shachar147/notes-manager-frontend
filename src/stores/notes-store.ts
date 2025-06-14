import { observable, action, runInAction } from 'mobx';
import { Note } from '../types/notes';
import { api } from '../services/api';

export class NotesStore {
  @observable notes: Note[] = [];
  @observable isLoading = false;
  @observable error: string | null = null;
  @observable selectedNoteId: string | null = null;

  constructor() {
    void this.fetchNotes()
  }

  @action
  async fetchNotes() {
    this.isLoading = true;
    try {
      const response = await api.getNotes();
      runInAction(() => {
        this.notes = response.data.data;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to fetch notes';
        this.isLoading = false;
      });
    }
  }

  @action
  async createNote(title: string, content: string) {
    this.isLoading = true;
    try {
      const response = await api.createNote({ title, content });
      runInAction(() => {
        this.notes.push(response.data.data);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to create note';
        this.isLoading = false;
      });
    }
  }

  @action
  async updateNote(id: string, updates: Partial<Note>) {
    this.isLoading = true;
    try {
      const response = await api.updateNote(id, updates);
      runInAction(() => {
        const index = this.notes.findIndex(note => note.id === id);
        if (index !== -1) {
          this.notes[index] = response.data.data;
        }
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to update note';
        this.isLoading = false;
      });
    }
  }

  @action
  async deleteNote(id: string) {
    this.isLoading = true;
    try {
      await api.deleteNote(id);
      runInAction(() => {
        this.notes = this.notes.filter(note => note.id !== id);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to delete note';
        this.isLoading = false;
      });
    }
  }

  @action
  async setSelectedNoteId(selectedNoteId: string) {
    this.selectedNoteId = selectedNoteId;
  }
}

export default NotesStore;