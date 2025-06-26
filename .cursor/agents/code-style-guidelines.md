# Code Style Guidelines

## 🔁 1. Use `useEffect` Directly — Not `React.useEffect`

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

## 🎨 2. No Inline Styles — Use CSS Modules Instead

✅ **Good**
```tsx
import styles from './my-component.module.scss';

return <div className={styles.container}>Hello</div>;
```

❌ Bad
```tsx
return <div style={{ padding: '10px', color: 'red' }}>Hello</div>;

```

## 🎨 3. No Hex or rgba() in Components — Use Design System Variables

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

## 🎨 4. Each component should be written in lower case and have its' own folder

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

## 🎨 5. Components should be functional instead of consts, also do not use React.FC

## 6. Do not concat classes, use `getClasses`

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

## 7. Do not use React.Fragment, use `<>...</>` instead - unless you need to use params like `key`

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
