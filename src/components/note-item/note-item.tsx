import React from 'react';
import { Note } from '../../types/notes';
import { ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import styles from './note-item.module.css';
import {observer} from "mobx-react";
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

function NoteItem({ note, isSelected, onClick, onDelete, onDuplicate }: NoteItemProps){
  const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <ListItem
      key={isSelected}
      button
      selected={isSelected}
      onClick={() => onClick(note.id)}
      className={isSelected ? styles.listItemSelected : styles.listItem}
      secondaryAction={
        <>
          <IconButton edge="end" aria-label="duplicate" onClick={e => { e.stopPropagation(); onDuplicate(note.id); }} size="small">
            <FileCopyIcon fontSize="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={e => { e.stopPropagation(); onDelete(note.id); }} size="small">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      }
    >
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight="bold">
            {note.title || 'New Note'}
          </Typography>
        }
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.secondary"
            >
              {formattedDate}
            </Typography>
            <Typography
              sx={{
                display: 'inline',
                ml: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '80%', // Adjust as needed
              }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              — {note.content.substring(0, 50) || 'No additional content'}
            </Typography>
          </>
        }
      />
    </ListItem>
  );
}

export default observer(NoteItem);