import React from 'react';
import { observer } from 'mobx-react-lite';
import NotesStore  from '../../stores/notes-store';
import { Virtuoso } from 'react-virtuoso';
import NoteItem from '../NoteItem/NoteItem';
import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface NoteListProps {
  store: NotesStore
}

function NoteList({ store }: NoteListProps) {
  const handleCreateNewNote = async () => {
      alert("here");
    // Create a new empty note and select it
    await store.createNote('', ''); // Assuming createNote takes title and content

    // Select the newly created note (assuming backend returns the new note with an ID)
    // For now, let's just refetch and select the first note if available, or handle selection in the store
    // In a real app, the createNote action would ideally return the new note with its ID.
    if (store.notes.length > 0) {
      store.setSelectedNoteId(store.notes[store.notes.length - 1].id);
    }
  };

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
        {store.notes.length === 0 ? (
          <Box sx={{ padding: 2, textAlign: 'center', color: 'text.secondary' }}>
            <Typography>No notes yet. Click '+' to create one!</Typography>
          </Box>
        ) : (
          <Virtuoso
            data={store.notes}
            itemContent={(index, note) => (
              <NoteItem
                key={note.id}
                note={note}
                isSelected={note.id === store.selectedNoteId}
                onClick={() => store.setSelectedNoteId(note.id)}
              />
            )}
          />
        )}
      </Box>
    </Box>
  );
}

export default observer(NoteList);