/**
 * TypeScript declarations for CSS modules
 * 
 * This file is MANDATORY for TypeScript to understand CSS module imports.
 * Without these declarations, you'll get errors like:
 * "Cannot find module './component.module.css' or its corresponding type declarations"
 * 
 * CSS modules are files that export an object where:
 * - Keys are the original class names from the CSS file
 * - Values are the generated unique class names (e.g., "button_abc123")
 * 
 * These declarations tell TypeScript that any file ending in .module.css
 * should be treated as a CSS module and return an object with string keys.
 */

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

/**
 * Declaration for regular CSS files (non-modules)
 * Used when importing CSS files that don't use CSS modules
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
} 