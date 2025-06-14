import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { notesStore } from './stores/notes-store';
import NoteItem from './components/NoteItem/NoteItem';
import NoteList from "./components/NoteList/NoteList";

function App() {
    const [selectedNote, setSelectedNote] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        notesStore.fetchNotes().then(() => {
            setIsLoading(false);
        });
    }, []);

    function renderContent(){
        if (isLoading){
            return (
                <div>
                    Loading...
                </div>
            );
        }

        return (
            <NoteList selectedNoteId={notesStore.selectedNoteId} onSelectNote={notesStore.setSelectedNoteId.bind(notesStore)} />
        )

        // return (
        //     <>
        //         {notesStore.notes.map((note) => (
        //             <NoteItem note={note} isSelected={selectedNote == note.id} onClick={() => setSelectedNote(note.id)}/>
        //         ))}
        //     </>
        // );
    }

    return (
        <div>
        <h1>Notes Manager</h1>
        {renderContent()}
        </div>
    );
}

export default observer(App);