import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { notesStore } from './stores/notes-store';

const App = observer(() => {
  useEffect(() => {
    notesStore.fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes Manager</h1>
      {/* We'll add components here later */}
    </div>
  );
});

export default App;