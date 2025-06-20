import React, { useState } from 'react';
import { Box, Paper, Divider } from '@mui/material';
import { Text, Icon } from '../../common/components';
import styles from './foundation.module.css';

export function FoundationPage() {
  // All typography variants
  const typographyVariants = [
    'headline-1',
    'headline-2',
    'headline-3',
    'headline-4',
    'headline-5',
    'headline-6',
    'body',
    'subhead',
    'caption',
    'secondary',
    'disabled',
  ] as const;

  // All color palettes
  const colorPalettes = [
    { name: 'Black & White', colors: ['black', 'white'] },
    {
      name: 'Red Scale',
      colors: ['red-1', 'red-2', 'red-3', 'red-4', 'red-5', 'red-6'],
    },
    {
      name: 'Orange Scale',
      colors: [
        'orange-1',
        'orange-2',
        'orange-3',
        'orange-4',
        'orange-5',
        'orange-6',
      ],
    },
    {
      name: 'Yellow Scale',
      colors: [
        'yellow-1',
        'yellow-2',
        'yellow-3',
        'yellow-4',
        'yellow-5',
        'yellow-6',
      ],
    },
    {
      name: 'Green Scale',
      colors: [
        'green-1',
        'green-2',
        'green-3',
        'green-4',
        'green-5',
        'green-6',
      ],
    },
    {
      name: 'Blue Scale',
      colors: ['blue-1', 'blue-2', 'blue-3', 'blue-4', 'blue-5', 'blue-6'],
    },
    {
      name: 'Indigo Scale',
      colors: [
        'indigo-1',
        'indigo-2',
        'indigo-3',
        'indigo-4',
        'indigo-5',
        'indigo-6',
      ],
    },
    {
      name: 'Purple Scale',
      colors: [
        'purple-1',
        'purple-2',
        'purple-3',
        'purple-4',
        'purple-5',
        'purple-6',
      ],
    },
    {
      name: 'Gray Scale',
      colors: ['gray-1', 'gray-2', 'gray-3', 'gray-4', 'gray-5', 'gray-6'],
    },
    {
      name: 'Dark Blue Scale',
      colors: [
        'dark-blue-1',
        'dark-blue-2',
        'dark-blue-3',
        'dark-blue-4',
        'dark-blue-5',
        'dark-blue-6',
      ],
    },
  ];

  // Sample icons from different categories (only valid FontAwesomeIconName values)
  const sampleIcons = [
    { name: 'home', category: 'Web App' },
    { name: 'user', category: 'Web App' },
    { name: 'search', category: 'Web App' },
    { name: 'heart', category: 'Web App' },
    { name: 'star', category: 'Web App' },
    { name: 'plus', category: 'Web App' },
    { name: 'minus', category: 'Web App' },
    { name: 'check', category: 'Web App' },
    { name: 'times', category: 'Web App' },
    { name: 'trash', category: 'Web App' },
    { name: 'copy', category: 'Web App' },
    { name: 'download', category: 'Web App' },
    { name: 'upload', category: 'Web App' },
    { name: 'envelope', category: 'Web App' },
    { name: 'lock', category: 'Web App' },
    { name: 'unlock', category: 'Web App' },
    { name: 'calendar', category: 'Web App' },
    { name: 'clock-o', category: 'Web App' },
    { name: 'spinner', category: 'Web App' },
    { name: 'info-circle', category: 'Web App' },
    { name: 'question-circle', category: 'Web App' },
    { name: 'exclamation-circle', category: 'Web App' },
    { name: 'check-circle', category: 'Web App' },
    { name: 'times-circle', category: 'Web App' },
    { name: 'folder', category: 'Web App' },
    { name: 'file-text', category: 'Web App' },
    { name: 'image', category: 'Web App' },
    { name: 'camera', category: 'Web App' },
    { name: 'phone', category: 'Web App' },
    { name: 'tablet', category: 'Web App' },
    { name: 'wifi', category: 'Web App' },
    { name: 'signal', category: 'Web App' },
    { name: 'battery-full', category: 'Web App' },
    { name: 'battery-half', category: 'Web App' },
    { name: 'battery-empty', category: 'Web App' },
    { name: 'plug', category: 'Web App' },
    { name: 'power-off', category: 'Web App' },
    { name: 'refresh', category: 'Web App' },
    { name: 'cog', category: 'Web App' },
    { name: 'magic', category: 'Web App' },
    { name: 'gift', category: 'Web App' },
    { name: 'trophy', category: 'Web App' },
    { name: 'flag', category: 'Web App' },
    { name: 'fire', category: 'Web App' },
    { name: 'bolt', category: 'Web App' },
    { name: 'sun-o', category: 'Web App' },
    { name: 'moon-o', category: 'Web App' },
    { name: 'cloud', category: 'Web App' },
    { name: 'umbrella', category: 'Web App' },
    { name: 'leaf', category: 'Web App' },
    { name: 'tree', category: 'Web App' },
    { name: 'paw', category: 'Web App' },
    { name: 'bug', category: 'Web App' },
    { name: 'heartbeat', category: 'Web App' },
    { name: 'ambulance', category: 'Medical' },
    { name: 'stethoscope', category: 'Medical' },
    { name: 'user-md', category: 'Medical' },
    { name: 'wheelchair', category: 'Medical' },
    { name: 'facebook', category: 'Brand' },
    { name: 'twitter', category: 'Brand' },
    { name: 'github', category: 'Brand' },
    { name: 'linkedin', category: 'Brand' },
    { name: 'youtube', category: 'Brand' },
    { name: 'paypal', category: 'Brand' },
    { name: 'android', category: 'Brand' },
    { name: 'windows', category: 'Brand' },
    { name: 'linux', category: 'Brand' },
    { name: 'chrome', category: 'Brand' },
    { name: 'firefox', category: 'Brand' },
    { name: 'safari', category: 'Brand' },
    { name: 'opera', category: 'Brand' },
    { name: 'html5', category: 'Brand' },
    { name: 'css3', category: 'Brand' },
    { name: 'jsfiddle', category: 'Brand' },
    { name: 'codepen', category: 'Brand' },
    { name: 'git', category: 'Brand' },
    { name: 'bitbucket', category: 'Brand' },
    { name: 'stack-overflow', category: 'Brand' },
    { name: 'wordpress', category: 'Brand' },
    { name: 'drupal', category: 'Brand' },
    { name: 'joomla', category: 'Brand' },
    { name: 'angle-left', category: 'Directional' },
    { name: 'angle-right', category: 'Directional' },
    { name: 'angle-up', category: 'Directional' },
    { name: 'angle-down', category: 'Directional' },
    { name: 'chevron-left', category: 'Directional' },
    { name: 'chevron-right', category: 'Directional' },
    { name: 'chevron-up', category: 'Directional' },
    { name: 'chevron-down', category: 'Directional' },
    { name: 'arrow-left', category: 'Directional' },
    { name: 'arrow-right', category: 'Directional' },
    { name: 'arrow-up', category: 'Directional' },
    { name: 'arrow-down', category: 'Directional' },
    { name: 'caret-left', category: 'Directional' },
    { name: 'caret-right', category: 'Directional' },
    { name: 'caret-up', category: 'Directional' },
    { name: 'caret-down', category: 'Directional' },
    { name: 'play', category: 'Video Player' },
    { name: 'pause', category: 'Video Player' },
    { name: 'stop', category: 'Video Player' },
    { name: 'backward', category: 'Video Player' },
    { name: 'forward', category: 'Video Player' },
    { name: 'fast-backward', category: 'Video Player' },
    { name: 'fast-forward', category: 'Video Player' },
    { name: 'step-backward', category: 'Video Player' },
    { name: 'step-forward', category: 'Video Player' },
    { name: 'random', category: 'Video Player' },
    { name: 'expand', category: 'Video Player' },
    { name: 'compress', category: 'Video Player' },
    { name: 'eject', category: 'Video Player' },
    { name: 'youtube-play', category: 'Video Player' },
    { name: 'bold', category: 'Text Editor' },
    { name: 'italic', category: 'Text Editor' },
    { name: 'underline', category: 'Text Editor' },
    { name: 'strikethrough', category: 'Text Editor' },
    { name: 'align-left', category: 'Text Editor' },
    { name: 'align-center', category: 'Text Editor' },
    { name: 'align-right', category: 'Text Editor' },
    { name: 'align-justify', category: 'Text Editor' },
    { name: 'list', category: 'Text Editor' },
    { name: 'list-ol', category: 'Text Editor' },
    { name: 'list-ul', category: 'Text Editor' },
    { name: 'indent', category: 'Text Editor' },
    { name: 'outdent', category: 'Text Editor' },
    { name: 'quote-left', category: 'Text Editor' },
    { name: 'quote-right', category: 'Text Editor' },
    { name: 'link', category: 'Text Editor' },
    { name: 'unlink', category: 'Text Editor' },
    { name: 'paperclip', category: 'Text Editor' },
    { name: 'floppy-o', category: 'Text Editor' },
    { name: 'undo', category: 'Text Editor' },
    { name: 'repeat', category: 'Text Editor' },
    { name: 'cut', category: 'Text Editor' },
    { name: 'copy', category: 'Text Editor' },
    { name: 'paste', category: 'Text Editor' },
    { name: 'scissors', category: 'Text Editor' },
    { name: 'file', category: 'Text Editor' },
    { name: 'files-o', category: 'Text Editor' },
    { name: 'clipboard', category: 'Text Editor' },
    { name: 'table', category: 'Text Editor' },
    { name: 'columns', category: 'Text Editor' },
    { name: 'font', category: 'Text Editor' },
    { name: 'text-height', category: 'Text Editor' },
    { name: 'text-width', category: 'Text Editor' },
    { name: 'paragraph', category: 'Text Editor' },
    { name: 'superscript', category: 'Text Editor' },
    { name: 'subscript', category: 'Text Editor' },
    { name: 'eraser', category: 'Text Editor' },
    { name: 'paint-brush', category: 'Text Editor' },
    { name: 'puzzle-piece', category: 'Text Editor' },
    { name: 'th', category: 'Text Editor' },
    { name: 'th-large', category: 'Text Editor' },
    { name: 'th-list', category: 'Text Editor' },
    { name: 'chain', category: 'Text Editor' },
    { name: 'chain-broken', category: 'Text Editor' },
    { name: 'rotate-left', category: 'Text Editor' },
    { name: 'rotate-right', category: 'Text Editor' },
    { name: 'bar-chart', category: 'Chart' },
    { name: 'bar-chart-o', category: 'Chart' },
    { name: 'line-chart', category: 'Chart' },
    { name: 'pie-chart', category: 'Chart' },
    { name: 'area-chart', category: 'Chart' },
    { name: 'credit-card', category: 'Payment' },
    { name: 'credit-card-alt', category: 'Payment' },
    { name: 'cc-amex', category: 'Payment' },
    { name: 'cc-mastercard', category: 'Payment' },
    { name: 'cc-visa', category: 'Payment' },
    { name: 'cc-paypal', category: 'Payment' },
    { name: 'cc-stripe', category: 'Payment' },
    { name: 'cc-discover', category: 'Payment' },
    { name: 'cc-jcb', category: 'Payment' },
    { name: 'cc-diners-club', category: 'Payment' },
    { name: 'google-wallet', category: 'Payment' },
    { name: 'paypal', category: 'Payment' },
    { name: 'money', category: 'Payment' },
    { name: 'blind', category: 'Accessibility' },
    { name: 'deaf', category: 'Accessibility' },
    { name: 'deafness', category: 'Accessibility' },
    { name: 'hard-of-hearing', category: 'Accessibility' },
    { name: 'low-vision', category: 'Accessibility' },
    { name: 'universal-access', category: 'Accessibility' },
    { name: 'wheelchair', category: 'Accessibility' },
    { name: 'wheelchair-alt', category: 'Accessibility' },
    { name: 'sign-language', category: 'Accessibility' },
    { name: 'signing', category: 'Accessibility' },
    { name: 'volume-control-phone', category: 'Accessibility' },
    { name: 'braille', category: 'Accessibility' },
    { name: 'assistive-listening-systems', category: 'Accessibility' },
    { name: 'american-sign-language-interpreting', category: 'Accessibility' },
    { name: 'asl-interpreting', category: 'Accessibility' },
    { name: 'audio-description', category: 'Accessibility' },
    { name: 'cc', category: 'Accessibility' },
    { name: 'question-circle-o', category: 'Accessibility' },
    { name: 'hand-paper-o', category: 'Hand' },
    { name: 'hand-rock-o', category: 'Hand' },
    { name: 'hand-scissors-o', category: 'Hand' },
    { name: 'hand-lizard-o', category: 'Hand' },
    { name: 'hand-spock-o', category: 'Hand' },
    { name: 'hand-pointer-o', category: 'Hand' },
    { name: 'hand-peace-o', category: 'Hand' },
    { name: 'hand-grab-o', category: 'Hand' },
    { name: 'hand-stop-o', category: 'Hand' },
    { name: 'thumbs-up', category: 'Hand' },
    { name: 'thumbs-o-up', category: 'Hand' },
    { name: 'thumbs-down', category: 'Hand' },
    { name: 'thumbs-o-down', category: 'Hand' },
    { name: 'hand-o-up', category: 'Hand' },
    { name: 'hand-o-down', category: 'Hand' },
    { name: 'hand-o-left', category: 'Hand' },
    { name: 'hand-o-right', category: 'Hand' },
    { name: 'mars', category: 'Gender' },
    { name: 'venus', category: 'Gender' },
    { name: 'mercury', category: 'Gender' },
    { name: 'intersex', category: 'Gender' },
    { name: 'transgender', category: 'Gender' },
    { name: 'transgender-alt', category: 'Gender' },
    { name: 'venus-double', category: 'Gender' },
    { name: 'mars-double', category: 'Gender' },
    { name: 'venus-mars', category: 'Gender' },
    { name: 'mars-stroke', category: 'Gender' },
    { name: 'mars-stroke-v', category: 'Gender' },
    { name: 'mars-stroke-h', category: 'Gender' },
    { name: 'neuter', category: 'Gender' },
    { name: 'genderless', category: 'Gender' },
    { name: 'file-archive-o', category: 'File Type' },
    { name: 'file-audio-o', category: 'File Type' },
    { name: 'file-code-o', category: 'File Type' },
    { name: 'file-excel-o', category: 'File Type' },
    { name: 'file-image-o', category: 'File Type' },
    { name: 'file-movie-o', category: 'File Type' },
    { name: 'file-pdf-o', category: 'File Type' },
    { name: 'file-photo-o', category: 'File Type' },
    { name: 'file-picture-o', category: 'File Type' },
    { name: 'file-powerpoint-o', category: 'File Type' },
    { name: 'file-sound-o', category: 'File Type' },
    { name: 'file-video-o', category: 'File Type' },
    { name: 'file-word-o', category: 'File Type' },
    { name: 'file-zip-o', category: 'File Type' },
    { name: 'circle-o-notch', category: 'Spinner' },
    { name: 'cog', category: 'Spinner' },
    { name: 'refresh', category: 'Spinner' },
    { name: 'spinner', category: 'Spinner' },
  ];

  // Icon search state
  const [iconSearch, setIconSearch] = useState('');
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Filter icons by search
  const filteredIcons = sampleIcons.filter(
    icon =>
      icon.name.includes(iconSearch.toLowerCase()) ||
      icon.category.toLowerCase().includes(iconSearch.toLowerCase())
  );

  // Copy icon name to clipboard
  const handleIconClick = async (iconName: string) => {
    try {
      await navigator.clipboard.writeText(iconName);
      setCopiedIcon(iconName);
      setTimeout(() => setCopiedIcon(null), 1200);
    } catch {
      // do nothing
    }
  };

  return (
    <Box className={styles.container}>
      <Text variant="headline-3" className={styles.pageTitle}>
        Design System Foundation
      </Text>

      {/* Typography Section */}
      <Paper elevation={2} className={styles.section}>
        <Text variant="headline-4" className={styles.sectionTitle}>
          Typography
        </Text>
        <Divider className={styles.divider} />
        <div className={styles.sectionContent}>
          <div className={styles.typographyGrid}>
            {typographyVariants.map(variant => (
              <div key={variant} className={styles.typographyItem}>
                <Text variant={variant} className={styles.typographyLabel}>
                  {variant.replace('-', ' ').toUpperCase()}
                </Text>
                <Text variant={variant}>The quick brown fox</Text>
              </div>
            ))}
          </div>
        </div>
      </Paper>

      {/* Color Palettes Section */}
      <Paper elevation={2} className={styles.section}>
        <Text variant="headline-4" className={styles.sectionTitle}>
          Color Palettes
        </Text>
        <Divider className={styles.divider} />
        <div className={styles.sectionContent}>
          <div className={styles.colorGrid}>
            {colorPalettes.map(palette => (
              <div key={palette.name} className={styles.colorPalette}>
                <Text variant="headline-6" className={styles.paletteName}>
                  {palette.name}
                </Text>
                <div className={styles.colorSwatches}>
                  {palette.colors.map(color => (
                    <div key={color} className={styles.colorSwatch}>
                      <div
                        className={styles.colorBox}
                        style={{ backgroundColor: `var(--notes-${color})` }}
                      />
                      <Text variant="caption" className={styles.colorName}>
                        {color}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Paper>

      {/* Icons Section */}
      <Paper elevation={2} className={styles.section}>
        <Text variant="headline-6" className={styles.sectionTitle}>
          Icons
        </Text>
        <Divider className={styles.divider} />
        <div className={styles.sectionContent}>
          <input
            type="text"
            placeholder="Search icons..."
            value={iconSearch}
            onChange={e => setIconSearch(e.target.value)}
            className={styles.iconSearchInput}
          />
          <div className={styles.iconGrid}>
            {filteredIcons.map(icon => (
              <div
                key={icon.name}
                className={styles.iconItem}
                onClick={() => handleIconClick(icon.name)}
                style={{ cursor: 'pointer', position: 'relative' }}
                title={`Click to copy: ${icon.name}`}
              >
                <Icon name={icon.name} size="lg" />
                <Text variant="caption" className={styles.iconName}>
                  {icon.name}
                </Text>
                <Text variant="caption" className={styles.iconCategory}>
                  {icon.category}
                </Text>
                {copiedIcon === icon.name && (
                  <span className={styles.copiedFeedback}>Copied!</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </Paper>

      {/* Icon Sizes Section */}
      <Paper elevation={2} className={styles.section}>
        <Text variant="headline-4" className={styles.sectionTitle}>
          Icon Sizes
        </Text>
        <Divider className={styles.divider} />
        <div className={styles.sectionContent}>
          <div className={styles.iconSizesGrid}>
            <div className={styles.iconSizeItem}>
              <Icon name="star" size="small" />
              <Text variant="caption">small</Text>
            </div>
            <div className={styles.iconSizeItem}>
              <Icon name="star" size="lg" />
              <Text variant="caption">lg</Text>
            </div>
            <div className={styles.iconSizeItem}>
              <Icon name="star" size="2x" />
              <Text variant="caption">2x</Text>
            </div>
            <div className={styles.iconSizeItem}>
              <Icon name="star" size="3x" />
              <Text variant="caption">3x</Text>
            </div>
            <div className={styles.iconSizeItem}>
              <Icon name="star" size="4x" />
              <Text variant="caption">4x</Text>
            </div>
            <div className={styles.iconSizeItem}>
              <Icon name="star" size="5x" />
              <Text variant="caption">5x</Text>
            </div>
          </div>
        </div>
      </Paper>

      {/* Icon Colors Section */}
      <Paper elevation={2} className={styles.section}>
        <Text variant="headline-4" className={styles.sectionTitle}>
          Icon Colors
        </Text>
        <Divider className={styles.divider} />
        <div className={styles.sectionContent}>
          <div className={styles.iconColorsGrid}>
            <div className={styles.iconColorItem}>
              <Icon name="heart" color="red-5" size="2x" />
              <Text variant="caption">red-5</Text>
            </div>
            <div className={styles.iconColorItem}>
              <Icon name="star" color="yellow-5" size="2x" />
              <Text variant="caption">yellow-5</Text>
            </div>
            <div className={styles.iconColorItem}>
              <Icon name="check" color="green-5" size="2x" />
              <Text variant="caption">green-5</Text>
            </div>
            <div className={styles.iconColorItem}>
              <Icon name="info-circle" color="blue-5" size="2x" />
              <Text variant="caption">blue-5</Text>
            </div>
            <div className={styles.iconColorItem}>
              <Icon name="exclamation-triangle" color="orange-5" size="2x" />
              <Text variant="caption">orange-5</Text>
            </div>
            <div className={styles.iconColorItem}>
              <Icon name="times" color="gray-5" size="2x" />
              <Text variant="caption">gray-5</Text>
            </div>
          </div>
        </div>
      </Paper>
    </Box>
  );
}
