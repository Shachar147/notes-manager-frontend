import React from 'react';
import { Note } from '../../types/notes';
import { ListItem, ListItemText, Typography } from '@mui/material';
import styles from './note-item.module.css';
import {observer} from "mobx-react";

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: (id: string) => void;
}

function NoteItem({ note, isSelected, onClick }: NoteItemProps){
  const formattedDate = new Date(note.updatedAt).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  console.log("hereee", isSelected);

  return (
    <ListItem
      button
      selected={isSelected}
      onClick={() => onClick(note.id)}
      sx={styles.listItem}
    >
      <ListItemText
        primary={
          <Typography variant="body1" fontWeight="bold">
            {note.title || 'New Note'}
          </Typography>
        }
        secondary={
          <React.Fragment>
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
          </React.Fragment>
        }
      />
    </ListItem>
  );
}

export default observer(NoteItem);