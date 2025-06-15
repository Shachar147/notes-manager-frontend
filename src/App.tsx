import {useEffect, useMemo} from 'react';
import NotesStore from './features/notes/stores/notes-store';
import NotesList from "./features/notes/components/notes-list/notes-list";
import NoteEditor from "./features/notes/components/note-editor/note-editor";
import {AuditStore} from "./features/audit/stores/audit.store";
import AuditHistory from "./features/audit/components/audit-history/audit-history";
import {observer} from "mobx-react";

function App() {
    const store = useMemo(() => new NotesStore(), []);
    const auditStore = useMemo(() => new AuditStore(), []);

    useEffect(() => {
        if (store.selectedNoteId) {
            void auditStore.fetchEntityHistory('note', store.selectedNoteId);
        } else {
            auditStore.clearHistory();
        }
    }, [store.selectedNoteId]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <NotesList store={store} />
            <div style={{ flex: 1, background: '#fff' }}>
                <NoteEditor store={store} />
            </div>
            {store.selectedNoteId && (
                <AuditHistory store={auditStore} />
            )}
        </div>
    )
}

export default observer(App);