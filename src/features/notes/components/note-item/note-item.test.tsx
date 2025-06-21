import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import NoteItem from './note-item';
import { makeAutoObservable } from 'mobx';

const note = {
  id: '1',
  title: 'Test Note',
  content: 'Test content',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};

describe('NoteItem', () => {
  function getHandlers() {
    return {
      onClick: vi.fn(),
      onDelete: vi.fn(),
      onDuplicate: vi.fn(),
    };
  }

  it('renders note title and content', () => {
    const handlers = getHandlers();
    render(
      <NoteItem
        note={note}
        isSelected={false}
        {...handlers}
      />
    );
    expect(screen.getByText('Test Note')).toBeInTheDocument();
    expect(screen.getByText(/Test content|No additional content/)).toBeInTheDocument();
  });

  it('calls onClick when item is clicked', () => {
    const handlers = getHandlers();
    render(
      <NoteItem
        note={note}
        isSelected={false}
        {...handlers}
      />
    );
    fireEvent.click(screen.getByText('Test Note'));
    expect(handlers.onClick).toHaveBeenCalledWith('1');
  });
}); 