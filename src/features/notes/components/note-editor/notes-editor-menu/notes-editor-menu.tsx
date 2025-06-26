import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TitleIcon from '@mui/icons-material/Title';
import styles from './notes-editor-menu.module.scss';
import { BubbleMenu } from '@tiptap/react';
import { getClasses } from '../../../../../utils/class-utils';

interface NotesEditorMenuProps {
  editor: any;
}

const NotesEditorMenu: React.FC<NotesEditorMenuProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} className={styles.menuRoot}>
      <Tooltip title="Heading 1">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? styles.headingActive : ''}
        >
          <span className={getClasses('notes-headline-6', styles.headingText)}>H1</span>
        </IconButton>
      </Tooltip>
      <Tooltip title="Heading 2">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? styles.headingActive : ''}
        >
          <span className={getClasses('notes-headline-6', styles.headingText)}>H2</span>
        </IconButton>
      </Tooltip>
      <Tooltip title="Heading 3">
        <IconButton
          size="small"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? styles.headingActive : ''}
        >
          <span className={getClasses('notes-headline-6', styles.headingText)}>H3</span>
        </IconButton>
      </Tooltip>
      <span className={styles.divider} />
      <Tooltip title="Bold"><IconButton size="small" onClick={() => editor.chain().focus().toggleBold().run()}><FormatBoldIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Italic"><IconButton size="small" onClick={() => editor.chain().focus().toggleItalic().run()}><FormatItalicIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Strikethrough"><IconButton size="small" onClick={() => editor.chain().focus().toggleStrike().run()}><StrikethroughSIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Code"><IconButton size="small" onClick={() => editor.chain().focus().toggleCode().run()}><CodeIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Link"><IconButton size="small" onClick={() => {
        const url = window.prompt('Enter link URL');
        if (url) editor.chain().focus().setLink({ href: url }).run();
      }}><LinkIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Emoji"><IconButton size="small" onClick={() => window.alert('Emoji picker not implemented yet!')}><EmojiEmotionsIcon fontSize="small" /></IconButton></Tooltip>
      <span className={styles.divider} />
      <Tooltip title="Checklist"><IconButton size="small" onClick={() => editor.chain().focus().toggleTaskList().run()}><CheckBoxIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Bulleted List"><IconButton size="small" onClick={() => editor.chain().focus().toggleBulletList().run()}><FormatListBulletedIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Numbered List"><IconButton size="small" onClick={() => editor.chain().focus().toggleOrderedList().run()}><FormatListNumberedIcon fontSize="small" /></IconButton></Tooltip>
    </BubbleMenu>
  );
};

export default NotesEditorMenu; 