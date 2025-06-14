import { observer } from 'mobx-react';
import {useMemo} from 'react';
import NotesStore from './stores/notes-store';
import NotesList from "./components/notes-list/notes-list";
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
        <NotesList store={store} />
    )
}

export default observer(App);