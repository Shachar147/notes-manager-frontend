import React, { useState, useMemo, forwardRef, useImperativeHandle, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, IconButton, Tooltip } from '@mui/material';
import styles from './collapsible-preview.module.scss';

interface CollapsiblePreviewProps {
  html: string;
}

// Helper to determine heading level (returns 1, 2, 3, or null)
function getHeadingLevel(tag: string): 1 | 2 | 3 | null {
  if (tag === 'H1') return 1;
  if (tag === 'H2') return 2;
  if (tag === 'H3') return 3;
  return null;
}

// Parse HTML and build a tree of sections, assigning a unique key to each section
function parseSections(nodes: Node[], level: 1 | 2 | 3 = 1, keyPrefix = '0') {
  const sections: any[] = [];
  let currentSection: any = null;
  let sectionIndex = 0;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i] as HTMLElement;
    const headingLevel = node.tagName ? getHeadingLevel(node.tagName) : null;
    if (headingLevel && headingLevel <= 3) {
      // New section at the root for any heading
      if (currentSection) sections.push(currentSection);
      currentSection = {
        heading: node,
        children: [],
        level: headingLevel,
        key: `${keyPrefix}-${sectionIndex++}`,
      };
    } else if (headingLevel && headingLevel > level) {
      // Nested section
      const nested = parseSections(nodes.slice(i), headingLevel, `${keyPrefix}-${sectionIndex}`);
      if (currentSection) currentSection.children.push(...nested.sections);
      i += nested.consumed - 1;
    } else {
      if (currentSection) currentSection.children.push(node);
      else sections.push({ heading: null, children: [node], level, key: `${keyPrefix}-${sectionIndex++}` });
    }
  }
  if (currentSection) sections.push(currentSection);
  return { sections, consumed: nodes.length };
}

// Recursive render function
function RenderSection({ section, openMap, onToggle }: { section: any, openMap: Record<string, boolean>, onToggle: (key: string) => void }) {
  const isHeading = !!section.heading;
  const headingText = isHeading ? section.heading.textContent : '';
  const HeadingTag = isHeading ? section.heading.tagName.toLowerCase() : 'div';
  const open = openMap[section.key] !== false; // default to open
  const [headingHovered, setHeadingHovered] = useState(false);
  const [iconHovered, setIconHovered] = useState(false);
  const showIcon = headingHovered || iconHovered;

  // If not a heading, just render the children directly
  if (!isHeading) {
    return (
      <React.Fragment key={section.key}>
        {section.children.map((child: any, idx: number) => {
          if (child.heading || child.level) {
            return <RenderSection key={child.key} section={child} openMap={openMap} onToggle={onToggle} />;
          } else if (child.nodeType === 1) {
            return React.createElement(child.tagName.toLowerCase(), { key: section.key + '-' + idx, dangerouslySetInnerHTML: { __html: child.innerHTML } });
          } else if (child.nodeType === 3) {
            return child.textContent;
          }
          return null;
        })}
      </React.Fragment>
    );
  }

  return (
    <Box key={section.key} className={styles.section}>
      <Box
        className={styles.headingRow}
        onMouseEnter={() => setHeadingHovered(true)}
        onMouseLeave={() => setHeadingHovered(false)}
        onBlur={() => setHeadingHovered(false)}
        onClick={() => onToggle(section.key)}
      >
        <span
          className={
            styles.iconPrefix + ' ' + (showIcon ? styles.iconPrefixVisible : styles.iconPrefixHidden)
          }
          onMouseEnter={e => { e.stopPropagation(); setIconHovered(true); }}
          onMouseLeave={e => { e.stopPropagation(); setIconHovered(false); }}
          onBlur={() => setIconHovered(false)}
        >
          <Tooltip title={open ? 'Collapse' : 'Expand'} placement="top">
            <IconButton size="small" tabIndex={-1}>
              {open ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Tooltip>
        </span>
        <HeadingTag className={styles.heading}>{headingText}</HeadingTag>
      </Box>
      {open && (
        <Box>
          {section.children.map((child: any, idx: number) => {
            if (child.heading || child.level) {
              // Nested section
              return <RenderSection key={child.key} section={child} openMap={openMap} onToggle={onToggle} />;
            } else if (child.nodeType === 1) {
              // Element node
              return React.createElement(child.tagName.toLowerCase(), { key: section.key + '-' + idx, dangerouslySetInnerHTML: { __html: child.innerHTML } });
            } else if (child.nodeType === 3) {
              // Text node
              return child.textContent;
            }
            return null;
          })}
        </Box>
      )}
    </Box>
  );
}

const CollapsiblePreview = forwardRef(function CollapsiblePreview(
  { html }: CollapsiblePreviewProps,
  ref
) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const bodyNodes = Array.from(doc.body.childNodes).filter(
    node => !(node.nodeType === 3 && !node.textContent?.trim())
  );

  let { sections } = useMemo(() => parseSections(bodyNodes, 1), [html]);

  if (sections.length === 0 && bodyNodes.length > 0) {
    sections = [{ heading: null, children: bodyNodes, level: 1, key: 'fallback-0' }];
  }

  // Collect all section keys for expand/collapse all
  function collectSectionKeys(sections: any[]): string[] {
    let keys: string[] = [];
    for (const section of sections) {
      if (section.key) keys.push(section.key);
      if (section.children) {
        for (const child of section.children) {
          if (child.heading || child.level) {
            keys = keys.concat(collectSectionKeys([child]));
          }
        }
      }
    }
    return keys;
  }
  const allKeys = useMemo(() => collectSectionKeys(sections), [sections]);

  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const handleToggle = (key: string) => {
    setOpenMap(prev => ({ ...prev, [key]: !(prev[key] !== false) }));
  };

  // Expand all by default when allKeys changes
  useEffect(() => {
    const newMap: Record<string, boolean> = {};
    allKeys.forEach(key => { newMap[key] = true; });
    setOpenMap(newMap);
  }, [allKeys]);

  useImperativeHandle(ref, () => ({
    expandAll: () => {
      const newMap: Record<string, boolean> = {};
      allKeys.forEach(key => { newMap[key] = true; });
      setOpenMap(newMap);
    },
    collapseAll: () => {
      const newMap: Record<string, boolean> = {};
      allKeys.forEach(key => { newMap[key] = false; });
      setOpenMap(newMap);
    }
  }), [allKeys]);

  return (
    <Box className={styles.root}>
      {sections.map((section) => (
        <RenderSection key={section.key} section={section} openMap={openMap} onToggle={handleToggle} />
      ))}
    </Box>
  );
});

export default CollapsiblePreview; 