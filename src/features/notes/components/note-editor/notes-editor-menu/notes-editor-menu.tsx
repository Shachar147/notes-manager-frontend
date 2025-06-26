import { useState, useRef } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import CodeIcon from '@mui/icons-material/Code';
import LinkIcon from '@mui/icons-material/Link';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styles from './notes-editor-menu.module.scss';
import { BubbleMenu } from '@tiptap/react';
import { getClasses } from '../../../../../utils/class-utils';
import EmojiPicker, { Theme } from 'emoji-picker-react';

interface NotesEditorMenuProps {
  editor: any;
}

function NotesEditorMenu({ editor }: NotesEditorMenuProps) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerDirection, setPickerDirection] = useState<'up' | 'down'>('down');
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleEmojiSelect = (
    emojiData: { emoji: string },
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    editor.chain().focus().insertContent(emojiData.emoji).run();
    setShowEmojiPicker(false);
  };

  const handleOpenEmojiPicker = () => {
    if (emojiButtonRef.current) {
      const rect = emojiButtonRef.current.getBoundingClientRect();
      const pickerHeight = 400;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      if (spaceBelow < pickerHeight && spaceAbove > pickerHeight) {
        setPickerDirection('up');
      } else {
        setPickerDirection('down');
      }
    }
    setShowEmojiPicker((v) => !v);
  };

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
      <Tooltip title="Emoji" placement="top">
        <IconButton
          ref={emojiButtonRef}
          size="small"
          onClick={handleOpenEmojiPicker}
        >
          <EmojiEmotionsIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      {showEmojiPicker && (
        <div
          style={{
            position: 'absolute',
            zIndex: 2000,
            left: 0,
            ...(pickerDirection === 'down'
              ? { top: 40 }
              : { bottom: 40 }),
          }}
        >
          <EmojiPicker
            theme={Theme.DARK}
            onEmojiClick={handleEmojiSelect}
            width={350}
            height={400}
          />
        </div>
      )}
      <span className={styles.divider} />
      <Tooltip title="Checklist"><IconButton size="small" onClick={() => editor.chain().focus().toggleTaskList().run()}><CheckBoxIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Bulleted List"><IconButton size="small" onClick={() => editor.chain().focus().toggleBulletList().run()}><FormatListBulletedIcon fontSize="small" /></IconButton></Tooltip>
      <Tooltip title="Numbered List"><IconButton size="small" onClick={() => editor.chain().focus().toggleOrderedList().run()}><FormatListNumberedIcon fontSize="small" /></IconButton></Tooltip>
    </BubbleMenu>
  );
};

export default NotesEditorMenu; 