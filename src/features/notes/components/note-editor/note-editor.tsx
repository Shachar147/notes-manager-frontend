import React, { useEffect } from 'react';
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

interface NoteEditorProps {
  store: NotesStore;
}

function NoteEditor({ store }: NoteEditorProps) {
  const theme = useTheme();
  const selectedNote = store.notes.find(
    note => note.id === store.selectedNoteId
  );

  const [title, setTitle] = React.useState(selectedNote?.title || '');

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
      // CodeBlockLowlight.configure({ lowlight }),
      BubbleMenu,
      Markdown,
    ],
    content: selectedNote?.content || '',
    editable: true,
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
      editor.commands.setContent(selectedNote.content || '');
    }
    setTitle(selectedNote?.title || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote?.id]);

  const handleSave = async () => {
    if (selectedNote && editor) {
      await store.updateNote(selectedNote.id, {
        title,
        content: editor.getHTML(),
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
    <Box p={4} display="flex" flexDirection="column" gap={2} maxWidth="100%">
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        variant="outlined"
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      />
      {editor && (
        <TiptapBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <Box
            display="flex"
            gap={1}
            alignItems="center"
            bgcolor={theme.palette.grey[900]}
            borderRadius={2}
            p={1}
            boxShadow={theme.shadows[4]}
          >
            <Tooltip title="H1">
              <IconButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                <TitleIcon fontSize="small" />
                <span style={{ fontSize: 10, color: '#fff' }}>H1</span>
              </IconButton>
            </Tooltip>
            <Tooltip title="H2">
              <IconButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <TitleIcon fontSize="small" />
                <span style={{ fontSize: 10, color: '#fff' }}>H2</span>
              </IconButton>
            </Tooltip>
            <Tooltip title="H3">
              <IconButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <TitleIcon fontSize="small" />
                <span style={{ fontSize: 10, color: '#fff' }}>H3</span>
              </IconButton>
            </Tooltip>
            <Tooltip title="Body">
              <IconButton
                onClick={() => editor.chain().focus().setParagraph().run()}
              >
                <span style={{ fontSize: 10, color: '#fff' }}>Body</span>
              </IconButton>
            </Tooltip>
            <Tooltip title="Divider">
              <IconButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
              >
                <HorizontalRuleIcon
                  fontSize="small"
                  style={{ color: '#fff' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Image">
              <IconButton
                onClick={() => {
                  const url = window.prompt('Image URL');
                  if (url) editor.chain().focus().setImage({ src: url }).run();
                }}
              >
                <ImageIcon fontSize="small" style={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Code Block">
              <IconButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              >
                <CodeIcon fontSize="small" style={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Bold">
              <IconButton
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <FormatBoldIcon fontSize="small" style={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Italic">
              <IconButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <FormatItalicIcon fontSize="small" style={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Bullet List">
              <IconButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <FormatListBulletedIcon
                  fontSize="small"
                  style={{ color: '#fff' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title="Numbered List">
              <IconButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <FormatListNumberedIcon
                  fontSize="small"
                  style={{ color: '#fff' }}
                />
              </IconButton>
            </Tooltip>
          </Box>
        </TiptapBubbleMenu>
      )}
      <EditorContent editor={editor} className={styles['tiptap-editor']} spellCheck={false} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        disabled={store.isLoading}
        sx={{ alignSelf: 'flex-start' }}
      >
        Save
      </Button>
    </Box>
  );
}

export default observer(NoteEditor);
