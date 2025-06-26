# Code Style Guidelines

## Imports

### 1. Use `useEffect` Directly — Not `React.useEffect`

✅ **Good**
```tsx
import { useEffect } from 'react';

useEffect(() => {
  console.log("Component mounted");
}, []);
```

❌ Bad
```tsx
React.useEffect(() => {
  console.log("Component mounted");
}, []);
```

## CSS/SCSS

### 2. No Inline Styles — Use CSS Modules Instead

✅ **Good**
```tsx
import styles from './my-component.module.scss';

return <div className={styles.container}>Hello</div>;
```

❌ Bad
```tsx
return <div style={{ padding: '10px', color: 'red' }}>Hello</div>;

```

### 3. No Hex or rgba() in Components — Use Design System Variables

✅ **Good**
```
// design-system.scss
--notes-red-6: #b71c1c;

// my-component.module.scss
.container {
  background-color: var(--notes-red-6);
}

// my-component.tsx
import styles from './MyComponent.module.scss';

return <div className={styles.container}>Styled</div>;

```

❌ Bad
```
// my-component.module.scss
.container {
  background-color: #007bff;
}

OR

// my-component.tsx
<div style={{ backgroundColor: 'rgba(0, 123, 255, 0.7)' }}>Styled</div>
```

### 4. Use Logical CSS Properties for Spacing and Positioning

Use logical properties like margin-inline-start, margin-inline-end, padding-inline-start, padding-inline-end, inset-inline-start, and inset-inline-end instead of left/right, margin-left/margin-right, padding-left/padding-right, etc. This ensures better RTL support and consistency.

✅ **Good**
```scss
.headingIcon {
  margin-inline-end: 2px;
}
.headingText {
  margin-inline-start: 0px;
  margin-inline-end: 2px;
}
.menuRoot {
  padding-inline-start: 8px;
  padding-inline-end: 8px;
}
.button {
  inset-inline-end: 0;
}
```

❌ Bad
```scss
.headingIcon {
  margin-right: 2px;
}
.headingText {
  margin-left: 0px;
  margin-right: 2px;
}
.menuRoot {
  padding-left: 8px;
  padding-right: 8px;
}
.button {
  right: 0;
}
```

### 5. Never use :global in CSS Modules

Never use :global in CSS Modules. It defeats the purpose of CSS Modules and can cause style conflicts across the app.

✅ **Good**
```scss
// notes-editor-menu.module.scss
.iconButton {
  color: var(--notes-white);
}
```
```tsx
// notes-editor-menu.tsx
<IconButton className={getClasses(styles.iconButton)}>
  ...
</IconButton>
```

❌ Bad
```scss
:global(.MuiIconButton-root) {
  color: var(--notes-white);
}
```

## Components

### 6. Each component should be written in lower case and have its' own folder

✅ **Good**
```
src
.. features
.... notes
...... components
........ note-editor
.......... note-editor.tsx
.......... note-editor.module.css
........ other-component
.......... other-component.tsx
.......... other-component.module.css
```

❌ Bad
```tsx
.. features
.... notes
...... components
........ note-editor
.......... note-editor.tsx
.......... note-editor.module.css
.......... other-component.tsx
.......... other-component.module.css
```

❌ Bad
```tsx
.. features
.... notes
...... components
........ note-editor
.......... note-editor.tsx
.......... note-editor.module.css
.......... OtherComponent.tsx
.......... OtherComponent.module.css
```

### 7. Components should be functional instead of consts, also do not use React.FC

### 8. Do not concat classes, use `getClasses`

✅ **Good**
```
className={
  getClasses(styles.iconPrefix, showIcon ? styles.iconPrefixVisible : styles.iconPrefixHidden)}
}
```

✅ **Good**
```
className={
  getClasses(styles.iconPrefix, showIcon && styles.iconPrefixVisible)}
}
```

❌ Bad
```
className={
  styles.iconPrefix + ' ' + (showIcon ? styles.iconPrefixVisible : styles.iconPrefixHidden)
}
```

### 9. Do not use React.Fragment, use `<>...</>` instead - unless you need to use params like `key`

✅ **Good**
```tsx
return <>
  <div>Item 1</div>
  <div>Item 2</div>
</>;
```

✅ **Good**
```tsx
return <React.Fragment key={section.index}>
  <div>Item 1</div>
  <div>Item 2</div>
</React.Fragment>;
```

❌ Bad
```tsx
return <React.Fragment>
  <div>Item 1</div>
  <div>Item 2</div>
</React.Fragment>;
```

## Typography

### 10. Use Design System Classes for Typography in Components

Use only the classes from design-system.scss (e.g., .notes-headline-6, .notes-body) for typography. Apply them in your component using getClasses in the className prop. Do not use @extend in your CSS modules or set font-size/font-weight directly.

✅ **Good**
```tsx
<MyComponent className={getClasses('notes-headline-6', styles.somethingElse)}>
  ...
</MyComponent>
<Text className={getClasses('notes-body', styles.customText)}>
  ...
</Text>
```

❌ Bad
```scss
.headingText {
  font-size: 12px;
  font-weight: 700;
}
.bodyText {
  font-size: 1rem;
  font-weight: 400;
}
```

### 11. Use Function Declarations for Components, Not React.FC or const

Always define components using function declarations, not as const or with React.FC.

✅ **Good**
```tsx
function MyComponent(props: MyComponentProps) {
  return <div>...</div>;
}
```

❌ Bad
```tsx
const MyComponent: React.FC<MyComponentProps> = (props) => {
  return <div>...</div>;
}

const MyComponent = (props) => {
  return <div>...</div>;
}
```
