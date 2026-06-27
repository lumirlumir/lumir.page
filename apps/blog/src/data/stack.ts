/**
 * @fileoverview Defines the technology stack used in the project.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * A stack represents a technology or tool that is used in a specific category.
 */
interface Stack<Category extends string> {
  /**
   * The category of the stack.
   */
  readonly category: Category;

  /**
   * The name of the stack.
   */
  readonly name: string;

  /**
   * Confidence level of the technology, where:
   * - `1` = Beginner
   * - `2` = Intermediate
   * - `3` = Advanced
   * - `4` = Expert
   */
  readonly confidence?: 1 | 2 | 3 | 4;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const musicStack = [
  {
    category: 'DAW',
    name: 'FLstudio',
  },
  {
    category: 'DAW',
    name: 'ProTools',
  },
  {
    category: 'DAW',
    name: 'Melodyne',
  },
  {
    category: 'DAW',
    name: 'Autotune',
  },
  {
    category: 'DAW',
    name: 'RX7',
  },
  {
    category: 'DAW',
    name: 'Sibelius',
  },
  {
    category: 'Virtual Inst',
    name: 'Waves',
  },
  {
    category: 'Virtual Inst',
    name: 'NIKomplete',
  },
  {
    category: 'Virtual Inst',
    name: 'FabFilter',
  },
  {
    category: 'Virtual Inst',
    name: 'GoodHertz',
  },
  {
    category: 'Virtual Inst',
    name: 'iZotope',
  },
  {
    category: 'Virtual Inst',
    name: 'SoundToys',
  },
  {
    category: 'Virtual Inst',
    name: 'Valhalla',
  },
  {
    category: 'Synthesizer',
    name: 'Serum',
  },
  {
    category: 'Synthesizer',
    name: 'Sylenth1',
  },
  {
    category: 'Synthesizer',
    name: 'Massive',
  },
  {
    category: 'Synthesizer',
    name: 'MassiveX',
  },
  {
    category: 'Synthesizer',
    name: 'Nexus',
  },
] as const satisfies readonly Stack<'DAW' | 'Virtual Inst' | 'Synthesizer'>[];

export const techStack = [
  {
    category: 'Markup',
    name: 'Markdown',
    confidence: 4,
  },
  {
    category: 'Markup',
    name: 'HTML5',
    confidence: 3,
  },
  {
    category: 'Markup',
    name: 'Pug',
    confidence: 1,
  },
  {
    category: 'Markup',
    name: 'MDX',
    confidence: 1,
  },
  {
    category: 'Style',
    name: 'CSS3',
    confidence: 3,
  },
  {
    category: 'Style',
    name: 'SCSS',
    confidence: 3,
  },
  {
    category: 'Style',
    name: 'TailwindCSS',
    confidence: 1,
  },
  {
    category: 'Language',
    name: 'C',
    confidence: 3,
  },
  {
    category: 'Language',
    name: 'Cpp',
    confidence: 3,
  },
  {
    category: 'Language',
    name: 'JavaScript',
    confidence: 3,
  },
  {
    category: 'Language',
    name: 'Java',
    confidence: 2,
  },
  {
    category: 'Language',
    name: 'Python',
    confidence: 2,
  },
  {
    category: 'Language',
    name: 'JSON',
    confidence: 2,
  },
  {
    category: 'Language',
    name: 'YAML',
    confidence: 2,
  },
  {
    category: 'Library',
    name: 'React',
    confidence: 3,
  },
  {
    category: 'Library',
    name: 'Next.js',
    confidence: 2,
  },
  {
    category: 'Library',
    name: 'OpenAI',
    confidence: 2,
  },
  {
    category: 'Library',
    name: 'shx',
    confidence: 2,
  },
  {
    category: 'Node.js',
    name: 'Node.js',
    confidence: 3,
  },
  {
    category: 'Node.js',
    name: 'Dotenv',
    confidence: 2,
  },
  {
    category: 'Node.js',
    name: 'Webpack',
    confidence: 2,
  },
  {
    category: 'Node.js',
    name: 'Babel',
    confidence: 2,
  },
  {
    category: 'Convention',
    name: 'Textlint',
    confidence: 4,
  },
  {
    category: 'Convention',
    name: 'ESLint',
    confidence: 3,
  },
  {
    category: 'Convention',
    name: 'Stylelint',
    confidence: 3,
  },
  {
    category: 'Convention',
    name: 'Prettier',
    confidence: 3,
  },
  {
    category: 'Convention',
    name: 'EditorConfig',
    confidence: 3,
  },
  {
    category: 'Convention',
    name: 'Markdownlint',
    confidence: 3,
  },
  {
    category: 'Convention',
    name: 'ClangFormat',
    confidence: 3,
  },
  {
    category: 'Testing',
    name: 'Mocha',
    confidence: 2,
  },
  {
    category: 'Testing',
    name: 'Codecov',
    confidence: 2,
  },
  {
    category: 'Testing',
    name: 'Istanbuljs/nyc',
    confidence: 1,
  },
  {
    category: 'Editor',
    name: 'VScode',
    confidence: 3,
  },
  {
    category: 'Editor',
    name: 'VisualStudio',
    confidence: 2,
  },
  {
    category: 'Git',
    name: 'Git',
    confidence: 3,
  },
  {
    category: 'Git',
    name: 'Github',
    confidence: 3,
  },
  {
    category: 'Git',
    name: 'GithubPages',
    confidence: 3,
  },
  {
    category: 'Git',
    name: 'GithubActions',
    confidence: 3,
  },
  {
    category: 'OS',
    name: 'Windows',
    confidence: 3,
  },
  {
    category: 'OS',
    name: 'Linux',
    confidence: 3,
  },
  {
    category: 'OS',
    name: 'Ubuntu',
    confidence: 3,
  },
  {
    category: 'OS',
    name: 'Docker',
    confidence: 2,
  },
  {
    category: 'Cloud Platform',
    name: 'Vercel',
    confidence: 3,
  },
  {
    category: 'Cloud Platform',
    name: 'GCP',
    confidence: 2,
  },
  {
    category: 'Cloud Platform',
    name: 'NCP',
    confidence: 1,
  },
  {
    category: 'Microsoft Hancom',
    name: 'Excel',
    confidence: 3,
  },
  {
    category: 'Microsoft Hancom',
    name: 'PowerPoint',
    confidence: 3,
  },
  {
    category: 'Microsoft Hancom',
    name: 'Hancom',
    confidence: 3,
  },
  {
    category: 'Microsoft Hancom',
    name: 'Word',
    confidence: 2,
  },
] as const satisfies readonly Stack<
  | 'Markup'
  | 'Style'
  | 'Language'
  | 'Library'
  | 'Node.js'
  | 'Convention'
  | 'Testing'
  | 'Editor'
  | 'Git'
  | 'OS'
  | 'Cloud Platform'
  | 'Microsoft Hancom'
>[];
