import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import NoteEditor from './note-editor';
import { makeAutoObservable } from 'mobx';

const note = {
  id: '1',
  title: 'Test Note',
  content: '<p>Test content</p>',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

function createMockStore() {
  return makeAutoObservable({
    notes: [note],
    selectedNoteId: '1',
    updateNote: vi.fn(),
    isLoading: false,
    // add any other required properties/methods if needed
  });
}

describe('NoteEditor', () => {
  it('renders the selected note and Save button', () => {
    const store = createMockStore();
    render(<NoteEditor store={store} />);
    expect(screen.getByLabelText(/title/i)).toHaveValue('Test Note');
    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('calls updateNote when Save is clicked', () => {
    const store = createMockStore();
    render(<NoteEditor store={store} />);
    fireEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(store.updateNote).toHaveBeenCalled();
  });
}); 