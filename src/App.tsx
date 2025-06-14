import { observer } from 'mobx-react';
import {useMemo} from 'react';
import NotesStore from './stores/notes-store';
import NoteList from "./components/NoteList/NoteList";
import {CircularProgress} from "@mui/material";

function App() {
    const store = useMemo(() => new NotesStore(), []);

    if (store.isLoading){
        return (
            <div className="flex-col gap-10 align-items-center">
                <CircularProgress />
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <NoteList store={store} />
    )
}

export default observer(App);