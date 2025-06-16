import { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from "mobx-react";
import NotesStore from './features/notes/stores/notes-store';
import NotesList from "./features/notes/components/notes-list/notes-list";
import NoteEditor from "./features/notes/components/note-editor/note-editor";
import { AuditStore } from "./features/audit/stores/audit.store";
import AuditHistory from "./features/audit/components/audit-history/audit-history";
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useAuth } from './contexts/AuthContext';

const NotesApp = observer(() => {
    const store = useMemo(() => new NotesStore(), []);
    const auditStore = useMemo(() => new AuditStore(), []);
    const { user, logout } = useAuth();

    useEffect(() => {
        if (store.selectedNoteId) {
            void auditStore.fetchEntityHistory('note', store.selectedNoteId);
        } else {
            auditStore.clearHistory();
        }
    }, [store.selectedNoteId]);

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <span style={{ marginRight: '1rem' }}>Welcome, {user?.email}</span>
                    <button onClick={logout}>Logout</button>
                </div>
                <div style={{ display: 'flex', flex: 1 }}>
                    <NotesList store={store} />
                    <div style={{ flex: 1, background: '#fff' }}>
                        <NoteEditor store={store} />
                    </div>
                    {store.selectedNoteId && (
                        <AuditHistory store={auditStore} />
                    )}
                </div>
            </div>
        </div>
    );
});

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <NotesApp />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;