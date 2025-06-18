import { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { observer } from "mobx-react";
import NotesStore from './features/notes/stores/notes-store';
import NotesList from "./features/notes/components/notes-list/notes-list";
import NoteEditor from "./features/notes/components/note-editor/note-editor";
import { AuditStore } from "./features/audit/stores/audit.store";
import AuditHistory from "./features/audit/components/audit-history/audit-history";
import { AuthProvider } from './features/auth/contexts/auth-context';
import { ProtectedRoute } from './common/protected-route';
import { LoginPage } from './features/auth/components/login/login-page';
import { RegisterPage } from './features/auth/components/register/register-page';
import { FoundationPage } from './pages/foundation/foundation';
import { useAuth } from './features/auth/contexts/auth-context';
import { Text } from './common/components';
import styles from './app.module.css';

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
        <div className={styles.appContainer}>
            <div className={styles.mainColumn}>
                <div className={styles.header}>
                    <Text className={styles.welcome}>Welcome, {user?.email}</Text>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <a href="/doc/foundation" className={styles.devDocsLink} target="_blank" rel="noopener noreferrer">Dev Docs</a>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
                <div className={styles.contentRow}>
                    <NotesList store={store} />
                    <div className={styles.editorContainer}>
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
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <NotesApp />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/doc/foundation"
                        element={
                            <ProtectedRoute>
                                <FoundationPage />
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