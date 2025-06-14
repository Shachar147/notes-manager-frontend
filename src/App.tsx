import {useMemo} from 'react';
import NotesStore from './stores/notes-store';
import NotesList from "./components/notes-list/notes-list";

function App() {
    const store = useMemo(() => new NotesStore(), []);

    return (
        <NotesList store={store} />
    )
}

export default App;