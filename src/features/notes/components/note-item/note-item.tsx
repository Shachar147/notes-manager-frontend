import React from 'react';
import { Note } from '../../types/notes';
import { ListItem, ListItemText, Typography, IconButton } from '@mui/material';
import styles from './note-item.module.css';
import {observer} from "mobx-react";
import Tooltip from '@mui/material/Tooltip';
import {getClasses} from "../../../../utils/class-utils";
import { Icon } from '../../../../common/components';
import { stripHtml } from "../../../../utils/utils";

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
        <div className="flex-row gap-4">
          <IconButton edge="end" aria-label="duplicate" onClick={e => { e.stopPropagation(); onDuplicate(note.id); }} size="small">
            <Icon name="copy" size="small" />
          </IconButton>
          <IconButton edge="end" aria-label="delete" onClick={e => { e.stopPropagation(); !isSelected && onDelete(note.id); }} size="small">
            <Icon name="trash" color={isSelected ? 'gray-4' : 'black'} size="small" />
          </IconButton>
        </div>
      }
    >
      <ListItemText
        primary={
          <Tooltip title={note.title || 'New Note'} placement="top" arrow>
            <span className={getClasses('notes-headline-6', styles.newNoteTitle)}>
              {note.title || 'New Note'}
            </span>
          </Tooltip>
        }
        secondary={
          <>
            <span className="notes-secondary">
              {formattedDate}
            </span>
            <span
              className={getClasses('notes-body', styles.noteContent)}
            >
              — {stripHtml(note.content.substring(0, 50) || 'No additional content')}
            </span>
          </>
        }
      />
    </ListItem>
  );
}

export default observer(NoteItem);