/**
 * @fileoverview Global type declarations.
 */

// --------------------------------------------------------------------------------
// Module Declaration
// --------------------------------------------------------------------------------

/**
 * Global type declarations for CSS files.
 *
 * This file allows TypeScript to understand imports of CSS files,
 * providing type safety and autocompletion for class names.
 */
declare module '*.css';

/**
 * Global type declarations for CSS modules.
 *
 * This file allows TypeScript to understand imports of CSS modules,
 * providing type safety and autocompletion for class names.
 */
declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>;
  export default classes;
}
