import React from 'react';
import { observer } from 'mobx-react-lite';
import NotesStore from '../../stores/notes-store';
import { Virtuoso } from 'react-virtuoso';
import NoteItem from '../note-item/note-item';
import {Typography, IconButton, CircularProgress} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import styles from './notes-list.module.css';

interface NoteListProps {
    store: NotesStore
}

function NotesList({ store }: NoteListProps) {
    const handleCreateNewNote = async () => {
        await store.createNote('New Note', 'my new note content');
        if (store.notes.length > 0) {
            store.setSelectedNoteId(store.notes[store.notes.length - 1].id);
        }
    };

    if (store.isLoading){
        return (
            <div className="loader-container">
                <CircularProgress />
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Typography variant="h6" fontWeight="bold">Notes</Typography>
                <IconButton color="primary" onClick={handleCreateNewNote} size="small">
                    <AddIcon />
                </IconButton>
            </div>

            <div className={styles.list}>
                {store.notes.length === 0 ? (
                    <div className={styles.emptyMessage}>
                        <Typography>No notes yet. Click '+' to create one!</Typography>
                    </div>
                ) : (
                    <Virtuoso
                        data={store.notes}
                        overscan={50}
                        itemContent={(_index, note) => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                isSelected={note.id === store.selectedNoteId}
                                onClick={() => store.setSelectedNoteId(note.id)}
                            />
                        )}
                    />
                )}
            </div>
        </div>
    );
}

export default observer(NotesList);
