import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import NotesList from './notes-list';
import { makeAutoObservable } from 'mobx';

const notes = [
  { id: '1', title: 'Note 1', content: 'Content 1', updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
  { id: '2', title: 'Note 2', content: 'Content 2', updatedAt: new Date().toISOString(), createdAt: new Date().toISOString() },
];

class MockAuditService {
  baseUrl = '';
  getEntityHistory = vi.fn();
}

function createMockStore() {
  return makeAutoObservable({
    notes,
    notesSorted: notes,
    selectedNoteId: '1',
    totalNotes: 2,
    isLoading: false,
    createNote: vi.fn(),
    setSelectedNoteId: vi.fn(),
    duplicateNote: vi.fn(),
    deleteNote: vi.fn(),
    error: null,
    auditStore: {
      auditService: new MockAuditService() as any,
      auditLogs: [],
      isLoading: false,
      error: null,
      fetchAuditLogs: vi.fn(),
      clearAuditLogs: vi.fn(),
      fetchEntityHistory: vi.fn(),
      clearHistory: vi.fn(),
    },
    fetchNotes: vi.fn(),
    updateNote: vi.fn(),
  });
}

describe('NotesList', () => {
  it('renders notes and create button', () => {
    const store = createMockStore();
    render(<NotesList store={store} />);
    expect(screen.getByText('Notes (2)')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('Note 1')).toBeInTheDocument();
    expect(screen.getByText('Note 2')).toBeInTheDocument();
  });

  it('calls createNote when + button is clicked', () => {
    const store = createMockStore();
    render(<NotesList store={store} />);
    fireEvent.click(screen.getByRole('button'));
    expect(store.createNote).toHaveBeenCalled();
  });
}); 