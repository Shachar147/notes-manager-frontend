import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { notesApiService } from '../services/notes-api.service';
import { Note } from '../types/notes';
import { AuditStore } from '../../audit/stores/audit.store';

export class NotesStore {
  @observable notes: Note[] = [];
  @observable totalNotes: number = 0;
  @observable isLoading = false;
  @observable error: string | null = null;
  @observable selectedNoteId: string | null = null;
  auditStore: AuditStore;

  constructor(auditStore: AuditStore) {
    makeObservable(this);
    this.auditStore = auditStore;
    void this.fetchNotes();
  }

  @action
  async fetchNotes() {
    this.isLoading = true;
    try {
      const response = await notesApiService.getNotes();
      runInAction(() => {
        this.notes = response.data.data.notes;
        this.totalNotes = response.data.data.total;
        this.isLoading = false;
      });
    } catch {
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
      const response = await notesApiService.createNote({ title, content });
      runInAction(() => {
        this.notes.push(response.data.data);
        this.totalNotes += 1;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to create note';
        this.isLoading = false;
      });
    }
  }

  @action
  async duplicateNote(originalNoteId: string) {
    this.isLoading = true;
    try {
      const response = await notesApiService.duplicateNote(originalNoteId);
      runInAction(() => {
        this.notes.push(response.data.data);
        this.totalNotes += 1;
        this.isLoading = false;
      });
    } catch {
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
      const response = await notesApiService.updateNote(id, updates);
      runInAction(() => {
        const index = this.notes.findIndex(note => note.id === id);
        if (index !== -1) {
          this.notes[index] = response.data.data;
        }
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to update note';
        this.isLoading = false;
      });
    }

    void this.auditStore.fetchEntityHistory('note', this.selectedNoteId!);
  }

  @action
  async deleteNote(id: string) {
    this.isLoading = true;
    try {
      await notesApiService.deleteNote(id);
      runInAction(() => {
        if (this.selectedNoteId === id) {
          this.selectedNoteId = null;
          this.auditStore.clearHistory();
        }

        this.notes = this.notes.filter(note => note.id !== id);
        this.totalNotes -= 1;
        this.isLoading = false;
      });
    } catch {
      runInAction(() => {
        this.error = 'Failed to delete note';
        this.isLoading = false;
      });
    }
  }

  @action
  setSelectedNoteId(selectedNoteId: string) {
    this.selectedNoteId = selectedNoteId;
    void this.auditStore.fetchEntityHistory('note', this.selectedNoteId);
  }

  @computed
  get notesSorted() {
    return [...this.notes].sort(
      (a, b) =>
        new Date(b.updatedAt ?? b.createdAt).getTime() -
        new Date(a.updatedAt ?? a.createdAt).getTime()
    );
  }
}

export default NotesStore;
