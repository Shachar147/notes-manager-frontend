import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { notesStore } from '../../stores/notes-store';
import { Virtuoso } from 'react-virtuoso';
import NoteItem from '../NoteItem/NoteItem';
import { Box, CircularProgress, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';

interface NoteListProps {
  onSelectNote: (noteId: string | null) => void;
  selectedNoteId: string | null;
}

function NoteList({ onSelectNote, selectedNoteId }: NoteListProps) {
  const { notes, loading, error, fetchNotes, createNote } = notesStore;

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateNewNote = async () => {
      alert("here");
    // Create a new empty note and select it
    await createNote('', ''); // Assuming createNote takes title and content

    // Select the newly created note (assuming backend returns the new note with an ID)
    // For now, let's just refetch and select the first note if available, or handle selection in the store
    // In a real app, the createNote action would ideally return the new note with its ID.
    if (notesStore.notes.length > 0) {
      onSelectNote(notesStore.notes[notesStore.notes.length - 1].id);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography color="error">{error}</Typography>
        <IconButton onClick={() => fetchNotes()}>
          <RefreshIcon />
        </IconButton>
      </Box>
    );
  }

  return (
    <Box sx={{
      width: '300px', // Fixed width for sidebar
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh', // Take full height
      overflowY: 'auto', // Enable scrolling
      backgroundColor: '#f9f9f9', // Light background for sidebar
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#f0f0f0',
      }}>
        <Typography variant="h6" fontWeight="bold">Notes</Typography>
        <IconButton color="primary" onClick={handleCreateNewNote} size="small">
          <AddIcon />
        </IconButton>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {notes.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography>No notes yet. Click '+' to create one!</Typography>
          </Box>
        ) : (
          <Virtuoso
            data={notes}
            itemContent={(index, note) => (
              <NoteItem
                key={note.id}
                note={note}
                isSelected={note.id === selectedNoteId}
                onClick={onSelectNote}
              />
            )}
          />
        )}
      </Box>
    </Box>
  );
}

export default observer(NoteList);