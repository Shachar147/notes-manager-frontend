import { observable, action, runInAction } from 'mobx';
import { Note } from '../types/notes';
import { api } from '../services/api';

export class NotesStore {
  @observable notes: Note[] = [];
  @observable loading = false;
  @observable error: string | null = null;
  @observable selectedNoteId: string | null = null;

  @action
  async fetchNotes() {
    this.loading = true;
    try {
      const response = await api.getNotes();
      runInAction(() => {
        this.notes = response.data.data;
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to fetch notes';
        this.loading = false;
      });
    }
  }

  @action
  async createNote(title: string, content: string) {
    this.loading = true;
    try {
      const response = await api.createNote({ title, content });
      runInAction(() => {
        this.notes.push(response.data.data);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to create note';
        this.loading = false;
      });
    }
  }

  @action
  async updateNote(id: string, updates: Partial<Note>) {
    this.loading = true;
    try {
      const response = await api.updateNote(id, updates);
      runInAction(() => {
        const index = this.notes.findIndex(note => note.id === id);
        if (index !== -1) {
          this.notes[index] = response.data.data;
        }
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to update note';
        this.loading = false;
      });
    }
  }

  @action
  async deleteNote(id: string) {
    this.loading = true;
    try {
      await api.deleteNote(id);
      runInAction(() => {
        this.notes = this.notes.filter(note => note.id !== id);
        this.loading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Failed to delete note';
        this.loading = false;
      });
    }
  }

  @action
  async setSelectedNoteId(selectedNoteId: string) {
    this.selectedNoteId = selectedNoteId;
  }
}

export const notesStore = new NotesStore();