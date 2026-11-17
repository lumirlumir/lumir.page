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
import type { Meta } from './meta';

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
    reactIcons: <FaHtml5 />,
  },
  markdown: {
    name: {
      en: 'Markdown',
      ko: 'Markdown',
    },
    reactIcons: <FaMarkdown />,
  },
  css: {
    name: {
      en: 'CSS',
      ko: 'CSS',
    },
    reactIcons: <FaCss3Alt />,
  },
  cpp: {
    name: {
      en: 'C/C++',
      ko: 'C/C++',
    },
    reactIcons: <SiCplusplus />,
  },
  javascript: {
    name: {
      en: 'JavaScript',
      ko: 'JavaScript',
    },
    reactIcons: <RiJavascriptFill />,
  },
  nodejs: {
    name: {
      en: 'Node.js',
      ko: 'Node.js',
    },
    reactIcons: <FaNodeJs />,
  },
  npm: {
    name: {
      en: 'npm',
      ko: 'npm',
    },
    reactIcons: <FaNpm />,
  },
  react: {
    name: {
      en: 'React',
      ko: 'React',
    },
    reactIcons: <FaReact />,
  },
  nextjs: {
    name: {
      en: 'Next.js',
      ko: 'Next.js',
    },
    reactIcons: <TbBrandNextjs />,
  },
  linux: {
    name: {
      en: 'Linux',
      ko: 'Linux',
    },
    reactIcons: <FaLinux />,
  },
  data: {
    name: {
      en: 'Data Format',
      ko: '데이터 형식',
    },
    reactIcons: <MdDataObject />,
  },
  database: {
    name: {
      en: 'Database',
      ko: '데이터베이스',
    },
    reactIcons: <FaDatabase />,
  },
  git: {
    name: {
      en: 'Git/GitHub',
      ko: 'Git/GitHub',
    },
    reactIcons: <FaGithub />,
  },
  vscode: {
    name: {
      en: 'VS Code',
      ko: 'VS Code',
    },
    reactIcons: <BiLogoVisualStudio />,
  },
  openai: {
    name: {
      en: 'OpenAI',
      ko: 'OpenAI',
    },
    reactIcons: <SiOpenai />,
  },
  baekjoon: {
    name: {
      en: 'Baekjoon',
      ko: '백준',
    },
    reactIcons: <FaCode />,
  },
  programmers: {
    name: {
      en: 'Programmers',
      ko: '프로그래머스',
    },
    reactIcons: <GiHummingbird />,
  },
  algorithm: {
    name: {
      en: 'Algorithm',
      ko: '알고리즘',
    },
    reactIcons: <SiThealgorithms />,
  },
  network: {
    name: {
      en: 'Network',
      ko: '네트워크',
    },
    reactIcons: <LuNetwork />,
  },
  convention: {
    name: {
      en: 'Coding Convention',
      ko: '코딩 컨벤션',
    },
    reactIcons: <FaScrewdriverWrench />,
  },
  cs: {
    name: {
      en: 'Computer Science',
      ko: '컴퓨터 과학',
    },
    reactIcons: <FaLaptopCode />,
  },
  synology: {
    name: {
      en: 'Synology NAS',
      ko: 'Synology NAS',
    },
    reactIcons: <SiSynology />,
  },
  essay: {
    name: {
      en: 'Essay',
      ko: '에세이',
    },
    reactIcons: <FaBookOpen />,
  },
} as const satisfies Record<CategoryKey, Meta>;
