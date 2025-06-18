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
import Button from '@mui/material/Button';
import styles from './app.module.css';
import SidebarDrawer from './common/components/SidebarDrawer';
import { useState } from 'react';
import { Icon } from './common/components';

const NotesApp = observer(() => {
    const store = useMemo(() => new NotesStore(), []);
    const auditStore = useMemo(() => new AuditStore(), []);
    const { user, logout } = useAuth();
    const [drawerOpen, setDrawerOpen] = useState(false);

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
                  <div className={styles.headerLeft}>
                    <button
                        className={styles.hamburgerButton}
                        onClick={() => setDrawerOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <Icon name="bars" size="lg" />
                    </button>
                    <img src="/src/images/logo.png" alt="Notes Logo" className={styles.logo} />
                  </div>
                  <div className={styles.headerRight}>
                    <Button
                      variant="outlined"
                      color="primary"
                      component="a"
                      href="/doc/foundation"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Dev Docs
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={logout}
                      className={styles.headerButton}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
                <SidebarDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                  <NotesList store={store} isMobile />
                </SidebarDrawer>
                <div className={styles.contentRow}>
                    <div className={styles.desktopSidebar}>
                      <NotesList store={store} />
                    </div>
                    <div className={styles.mainContentWrapper}>
                      <div className={styles.editorContainer}>
                          <NoteEditor store={store} />
                      </div>
                      {store.selectedNoteId && (
                          <div className={styles.mobileAuditHistoryWrapper}>
                            <AuditHistory store={auditStore} />
                          </div>
                      )}
                    </div>
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