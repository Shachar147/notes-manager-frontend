import {useMemo} from 'react';
import NotesStore from './stores/notes-store';
import NotesList from "./components/notes-list/notes-list";
import NoteEditor from "./components/note-editor/note-editor";
import {Observer} from "mobx-react";

function App() {
    const store = useMemo(() => new NotesStore(), []);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <NotesList store={store} />
            <div style={{ flex: 1, background: '#fff' }}>
                <NoteEditor store={store} />
            </div>
        </div>
    )
}

export default App;