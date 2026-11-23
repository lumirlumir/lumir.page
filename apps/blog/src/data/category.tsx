/**
 * @fileoverview Defines the types and metadata for the category.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  BiLogoVisualStudio,
  FaBookOpen,
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaGithub,
  FaHtml5,
  FaLaptopCode,
  FaLinux,
  FaMarkdown,
  FaNodeJs,
  FaNpm,
  FaReact,
  FaScrewdriverWrench,
  GiHummingbird,
  LuNetwork,
  MdDataObject,
  RiJavascriptFill,
  SiCplusplus,
  SiOpenai,
  SiSynology,
  SiThealgorithms,
  TbBrandNextjs,
} from '@lumir/react-kit/svgs';
import type { MetaWithIcons } from './meta';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the key of the category defined in the `categoryMeta` object.
 */
export type CategoryKey = (typeof categoryKeys)[number];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Represents the keys of the category, which are used to identify each category in the `categoryMeta` object.
 * - NOTE: The order here determines the sidebar order, so modify it with care.
 */
export const categoryKeys = [
  'html',
  'markdown',
  'css',
  'cpp',
  'javascript',
  'nodejs',
  'npm',
  'react',
  'nextjs',
  'linux',
  'data',
  'database',
  'git',
  'vscode',
  'openai',
  'baekjoon',
  'programmers',
  'algorithm',
  'network',
  'convention',
  'cs',
  'synology',
  'essay',
] as const;

/**
 * An object containing metadata for the category fields,
 * including their names in English and Korean, as well as associated React icons.
 */
export const categoryMeta = {
  html: {
    name: {
      en: 'HTML',
      ko: 'HTML',
    },
    icons: <FaHtml5 />,
  },
  markdown: {
    name: {
      en: 'Markdown',
      ko: 'Markdown',
    },
    icons: <FaMarkdown />,
  },
  css: {
    name: {
      en: 'CSS',
      ko: 'CSS',
    },
    icons: <FaCss3Alt />,
  },
  cpp: {
    name: {
      en: 'C/C++',
      ko: 'C/C++',
    },
    icons: <SiCplusplus />,
  },
  javascript: {
    name: {
      en: 'JavaScript',
      ko: 'JavaScript',
    },
    icons: <RiJavascriptFill />,
  },
  nodejs: {
    name: {
      en: 'Node.js',
      ko: 'Node.js',
    },
    icons: <FaNodeJs />,
  },
  npm: {
    name: {
      en: 'npm',
      ko: 'npm',
    },
    icons: <FaNpm />,
  },
  react: {
    name: {
      en: 'React',
      ko: 'React',
    },
    icons: <FaReact />,
  },
  nextjs: {
    name: {
      en: 'Next.js',
      ko: 'Next.js',
    },
    icons: <TbBrandNextjs />,
  },
  linux: {
    name: {
      en: 'Linux',
      ko: 'Linux',
    },
    icons: <FaLinux />,
  },
  data: {
    name: {
      en: 'Data Format',
      ko: '데이터 형식',
    },
    icons: <MdDataObject />,
  },
  database: {
    name: {
      en: 'Database',
      ko: '데이터베이스',
    },
    icons: <FaDatabase />,
  },
  git: {
    name: {
      en: 'Git/GitHub',
      ko: '깃/깃허브',
    },
    icons: <FaGithub />,
  },
  vscode: {
    name: {
      en: 'VS Code',
      ko: 'VS Code',
    },
    icons: <BiLogoVisualStudio />,
  },
  openai: {
    name: {
      en: 'OpenAI',
      ko: 'OpenAI',
    },
    icons: <SiOpenai />,
  },
  baekjoon: {
    name: {
      en: 'Baekjoon',
      ko: '백준',
    },
    icons: <FaCode />,
  },
  programmers: {
    name: {
      en: 'Programmers',
      ko: '프로그래머스',
    },
    icons: <GiHummingbird />,
  },
  algorithm: {
    name: {
      en: 'Algorithm',
      ko: '알고리즘',
    },
    icons: <SiThealgorithms />,
  },
  network: {
    name: {
      en: 'Network',
      ko: '네트워크',
    },
    icons: <LuNetwork />,
  },
  convention: {
    name: {
      en: 'Coding Convention',
      ko: '코딩 컨벤션',
    },
    icons: <FaScrewdriverWrench />,
  },
  cs: {
    name: {
      en: 'Computer Science',
      ko: '컴퓨터 과학',
    },
    icons: <FaLaptopCode />,
  },
  synology: {
    name: {
      en: 'Synology NAS',
      ko: 'Synology NAS',
    },
    icons: <SiSynology />,
  },
  essay: {
    name: {
      en: 'Essay',
      ko: '수필',
    },
    icons: <FaBookOpen />,
  },
} as const satisfies Record<CategoryKey, MetaWithIcons>;
