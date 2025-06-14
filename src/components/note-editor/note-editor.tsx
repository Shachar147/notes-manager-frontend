import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Note } from '../../types/notes';
import { TextField, Button, Box, Typography } from '@mui/material';
import NotesStore from '../../stores/notes-store';

interface NoteEditorProps {
  store: NotesStore;
}

function NoteEditor({ store }: NoteEditorProps) {
  const selectedNote = store.notes.find(note => note.id === store.selectedNoteId);
  const [title, setTitle] = useState(selectedNote?.title ?? '');
  const [content, setContent] = useState(selectedNote?.content ?? '');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setTitle(selectedNote?.title || '');
    setContent(selectedNote?.content || '');
    setDirty(false);
  }, [selectedNote?.id]);

  const handleSave = async () => {
    if (selectedNote && dirty) {
      await store.updateNote(selectedNote.id, { title, content });
      setDirty(false);
    }
  };

  if (store.isLoading) {
      return;
  }

  if (!selectedNote) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="text.secondary">Select a note to view and edit</Typography>
      </Box>
    );
  }

  return (
    <Box p={4} display="flex" flexDirection="column" gap={2} maxWidth={600}>
      <TextField
        label="Title"
        value={title}
        onChange={e => { setTitle(e.target.value); setDirty(true); }}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        label="Content"
        value={content}
        onChange={e => { setContent(e.target.value); setDirty(true); }}
        variant="outlined"
        fullWidth
        multiline
        minRows={10}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={!dirty || store.isLoading}
        sx={{ alignSelf: 'flex-start' }}
      >
        Save
      </Button>
    </Box>
  );
}

export default observer(NoteEditor);