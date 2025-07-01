import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Box, TextField } from '@mui/material';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Image from '@tiptap/extension-image';
import NotesStore from '../../stores/notes-store';
import { Text } from '../../../../common/components';
import { BubbleMenu } from '@tiptap/extension-bubble-menu';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import CodeIcon from '@mui/icons-material/Code';
import TitleIcon from '@mui/icons-material/Title';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import ImageIcon from '@mui/icons-material/Image';
import { IconButton, Tooltip } from '@mui/material';
import styles from './note-editor.module.scss';
import { useTheme } from '@mui/material/styles';
import Code from '@tiptap/extension-code';
import Blockquote from '@tiptap/extension-blockquote';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import HardBreak from '@tiptap/extension-hard-break';
import { Markdown } from 'tiptap-markdown';
import CodeBlock from '@tiptap/extension-code-block';
import { InputRule, inputRules } from 'prosemirror-inputrules';
import { Extension } from '@tiptap/core';
import { getClasses } from '../../../../utils/class-utils';
import CollapsiblePreview from '../collapsible-preview/collapsible-preview';
import NotesEditorMenu from './notes-editor-menu/notes-editor-menu';

interface NoteEditorProps {
  store: NotesStore;
}

// Custom input rule extension for replacing '->' with '→' and '<-' with '←'
const ArrowInputRule = Extension.create({
  name: 'arrowInputRule',
  addProseMirrorPlugins() {
    return [
      inputRules({
        rules: [
          // Short right arrow
          new InputRule(/->$/, (state, match, start, end) => {
            if (!match) return null;
            return state.tr.insertText('→', start, end);
          }),
          // Short left arrow
          new InputRule(/<-$/, (state, match, start, end) => {
            if (!match) return null;
            return state.tr.insertText('←', start, end);
          }),
          // Long right arrow (2 or more dashes)
          new InputRule(/-+>$/, (state, match, start, end) => {
            if (!match) return null;
            // If 2 or more dashes, use long arrow
            return state.tr.insertText('⟶', start, end);
          }),
          // Long left arrow (2 or more dashes)
          new InputRule(/<-+$/, (state, match, start, end) => {
            if (!match) return null;
            // If 2 or more dashes, use long arrow
            return state.tr.insertText('⟵', start, end);
          }),
        ],
      }),
    ];
  },
});

function NoteEditor({ store }: NoteEditorProps) {
  const theme = useTheme();
  const selectedNote = store.notes.find(
    note => note.id === store.selectedNoteId
  );

  const [title, setTitle] = useState(selectedNote?.title || '');
  const isEditMode = store.isEditMode;
  const collapsiblePreviewRef = useRef();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      HorizontalRule,
      Image,
      Code,
      Blockquote,
      Link,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Underline,
      Strike,
      Highlight,
      TaskList,
      TaskItem,
      HardBreak,
      CodeBlock,
      BubbleMenu,
      Markdown,
      ArrowInputRule,
    ],
    content: selectedNote?.content || '',
    editable: isEditMode,
    editorProps: {
      handlePaste(view, event) {
        const items = event.clipboardData?.items;
        if (items) {
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
              const file = item.getAsFile();
              if (file) {
                const reader = new FileReader();
                reader.onload = readerEvent => {
                  const src = readerEvent.target?.result;
                  if (typeof src === 'string') {
                    view.dispatch(
                      view.state.tr.replaceSelectionWith(
                        view.state.schema.nodes.image.create({ src })
                      )
                    );
                  }
                };
                reader.readAsDataURL(file);
                return true; // Prevent default paste
              }
            }
          }
        }
        return false; // Let other handlers run
      },
    },
  });

  useEffect(() => {
    if (editor && selectedNote) {
      try {
        editor.commands.setContent(selectedNote.content || '', { source: 'markdown' });
      } catch {
        editor.commands.setContent(selectedNote.content || '');
      }
    }
    setTitle(selectedNote?.title || '');
    // store.setEditMode(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote?.id]);

  // Ensure editor is editable or read-only based on isEditMode
  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditMode);
    }
  }, [editor, isEditMode]);

  const handleSave = async () => {
    if (selectedNote && editor) {
      await store.updateNote(selectedNote.id, {
        title,
        content: editor.storage.markdown.getMarkdown(),
      });
    }
  };

  if (!selectedNote) {
    return (
      <Box p={4}>
        <Text variant="headline-6">Select a note to view and edit</Text>
      </Box>
    );
  }

  return (
    <Box p={4} display="flex" flexDirection="column" maxWidth="100%" style={{ position: 'relative' }}>
      {/* Toggle Button and Expand/Collapse All */}
      <Box style={{ position: 'absolute', top: 16, right: 32, zIndex: 2, display: 'flex', gap: 8 }}>
        {!isEditMode && (
          <>
            <Button variant="outlined" size="small" onClick={() => collapsiblePreviewRef.current?.expandAll?.()}>Expand All</Button>
            <Button variant="outlined" size="small" onClick={() => collapsiblePreviewRef.current?.collapseAll?.()}>Collapse All</Button>
          </>
        )}
        <Button
          variant="outlined"
          size="small"
          onClick={() => store.setEditMode(!store.isEditMode)}
        >
          {isEditMode ? 'Preview' : 'Edit'}
        </Button>
      </Box>
      <div style={{ height: 16 }} /> {/* Add gap below the button */}
      <TextField
          label="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          placeholder="Your Note Title"
          sx={{ mb: 2 }}
          style={{ fontWeight: 700 }}
          className={getClasses(styles.titleClass, !isEditMode && 'display-none')}
          disabled={!isEditMode}
        />
      <h1 className={getClasses("margin-bottom-16", "margin-inline-start-16", isEditMode && 'display-none')}>{title}</h1>
      {editor && (
        <NotesEditorMenu editor={editor} />
      )}
      {editor && (
        isEditMode ? (
          <EditorContent
            editor={editor}
            className={styles['tiptap-editor']}
            spellCheck={false}
          />
        ) : (
          <CollapsiblePreview ref={collapsiblePreviewRef} html={editor.getHTML()} />
        )
      )}

      {isEditMode && (
        <>
              <div style={{ height: 16 }} /> {/* Add gap below the button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={store.isLoading}
          sx={{ alignSelf: 'flex-start' }}
        >
          Save
        </Button>
        </>
      )}
    </Box>
  );
}

export default observer(NoteEditor);
