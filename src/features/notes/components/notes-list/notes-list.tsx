import { IconButton } from '@mui/material';
import { observer, Observer } from 'mobx-react-lite';
import { Virtuoso } from 'react-virtuoso';
import { Icon, Loader, Text } from '../../../../common/components';
import { getClasses } from '../../../../utils/class-utils';
import NotesStore from '../../stores/notes-store';
import NoteItem from '../note-item/note-item';
import styles from './notes-list.module.css';

interface NoteListProps {
    store: NotesStore
    isMobile?: boolean;
}

function NotesList({ store, isMobile = false }: NoteListProps) {
    const handleCreateNewNote = async () => {
        await store.createNote('New Note', 'my new note content');
        if (store.notes.length > 0) {
            store.setSelectedNoteId(store.notes[store.notes.length - 1].id);
        }
    };

    const handleDuplicateNote = async (noteId: string) => {
        await store.duplicateNote(noteId);
        if (store.notes.length > 0) {
            store.setSelectedNoteId(store.notes[store.notes.length - 1].id);
        }
    }

    if (store.isLoading){
        return (
            <Loader />
        );
    }

    return (
        <div className={getClasses(styles.container, isMobile && styles.mobileContainer)}>
            <div className={styles.header}>
                <Text variant="headline-6">Notes ({store.totalNotes})</Text>
                <IconButton color="primary" onClick={handleCreateNewNote} size="small">
                    <Icon name="plus" size="small" />
                </IconButton>
            </div>

            <div className={styles.list}>
                {store.notes.length === 0 ? (
                    <div className={styles.emptyMessage}>
                        <Text variant="body">No notes yet. Click '+' to create one!</Text>
                    </div>
                ) : (
                    <Virtuoso
                        data={store.notesSorted}
                        overscan={50}
                        itemContent={(_index, note) => <Observer>{() => (
                            <NoteItem
                                key={note.id}
                                note={note}
                                isSelected={note.id == store.selectedNoteId}
                                onClick={store.setSelectedNoteId.bind(store)}
                                onDuplicate={handleDuplicateNote}
                                onDelete={store.deleteNote.bind(store)}
                                // needed to cause re-render when selected note is changed
                                // @ts-ignore
                                selectedNoteId={store.selectedNoteId}
                            />
                        )}</Observer>}
                    />
                )}
            </div>
        </div>
    );
}

export default observer(NotesList);
