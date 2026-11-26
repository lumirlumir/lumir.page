/**
 * @fileoverview Editorial landing page for a localized route.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { PostCard } from '@/components/post-card';
import type { CategoryKey } from '@/data/category';
import type { LangKey, LangRecord } from '@/data/lang';
import { compareMarkdownDocument } from '@/utils/compare';
import createMarkdownCollection from '@/utils/markdown-collection';
import styles from './page.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface LandingDictionary {
  readonly hero: {
    readonly title: readonly [string, string, string];
    readonly description: string;
    readonly note: string;
    readonly callToAction: string;
  };
  readonly sections: Record<(typeof postSections)[number]['id'], SectionDictionary>;
  readonly gallery: {
    readonly title: string;
    readonly description: string;
    readonly plates: readonly [GalleryPlate, GalleryPlate, GalleryPlate];
  };
  readonly fieldNotes: {
    readonly title: string;
    readonly description: string;
    readonly items: readonly [FieldNote, FieldNote, FieldNote];
  };
}

interface SectionDictionary {
  readonly title: string;
  readonly description: string;
}

interface GalleryPlate {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
}

interface FieldNote {
  readonly category: CategoryKey;
  readonly title: string;
  readonly description: string;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownCollection = createMarkdownCollection();
const postSections = [
  { id: 'series', eyebrow: 'CURATED SEQUENCES', marker: 'SERIES' },
  { id: 'popular', eyebrow: 'MOST READ', marker: 'MOST READ' },
  { id: 'latest', eyebrow: 'RECENT NOTES', marker: 'NOTE' },
] as const;

const dictionary = {
  ko: {
    hero: {
      title: ['기술을 읽고,', '구조를 그리며,', '경험을 기록합니다.'],
      description:
        '코드가 제품이 되는 과정에서 발견한 설계, 성능, 협업의 장면을 오래 읽히는 글로 엮습니다.',
      note: '사유와 실험을 위한 기술 에디토리얼',
      callToAction: '오늘의 컬렉션 보기',
    },
    sections: {
      series: {
        title: '시리즈로 읽기',
        description: '하나의 질문을 여러 각도에서 탐색한 연작입니다.',
      },
      popular: {
        title: '많이 읽은 글',
        description: '독자들이 오래 머물고 다시 찾아온 기록입니다.',
      },
      latest: {
        title: '최근에 쓴 글',
        description: '지금 고민하고 실험하는 것들을 가장 먼저 전합니다.',
      },
    },
    gallery: {
      title: '회화로 읽는 기술의 장면',
      description:
        '별의 흐름과 먹의 여백처럼, 코드의 구조와 리듬을 오래된 그림의 시선으로 바라봅니다.',
      plates: [
        {
          eyebrow: 'VAN GOGH / COLOR',
          title: '푸른 가지의 리듬',
          description: '분기와 연결이 한 화면에 피어나는 순간.',
        },
        {
          eyebrow: 'SESSHU / INK',
          title: '안개 속의 구조',
          description: '비워 둔 공간이 시스템의 경계를 더 선명하게 만듭니다.',
        },
        {
          eyebrow: 'FAN KUAN / SHAN SHUI',
          title: '산과 길의 위계',
          description: '큰 구조 안에서 작은 흐름이 제자리를 찾는 장면.',
        },
      ],
    },
    fieldNotes: {
      title: '저널 밖의 작업',
      description: '글과 코드 사이에서 이어지는 공개 작업과 작은 모임들.',
      items: [
        {
          category: 'git',
          title: 'CONTRIBUTION',
          description: '오픈소스에 남긴 작은 개선과 배운 점을 정리합니다.',
        },
        {
          category: 'nextjs',
          title: 'PROJECT',
          description: '문제를 관찰하고 직접 만든 도구의 제작기를 기록합니다.',
        },
        {
          category: 'markdown',
          title: 'COMMUNITY',
          description: '함께 읽고 쓰며 성장하는 개발자 커뮤니티의 소식입니다.',
        },
      ],
    },
  },
  en: {
    hero: {
      title: ['Reading technology,', 'mapping systems,', 'recording experience.'],
      description:
        'We shape the design, performance, and collaboration found where code becomes a product into writing made to last.',
      note: 'A technical editorial for reflection and experiment',
      callToAction: "View today's collection",
    },
    sections: {
      series: {
        title: 'Read by series',
        description: 'Sequences that explore one question from several angles.',
      },
      popular: {
        title: 'Most-read stories',
        description: 'Notes readers stayed with and returned to.',
      },
      latest: {
        title: 'Latest writing',
        description: 'The questions and experiments currently on the desk.',
      },
    },
    gallery: {
      title: 'Scenes in technology, read through paintings',
      description:
        'Like the movement of stars and the openness of ink, old paintings reveal the structure and rhythm of code.',
      plates: [
        {
          eyebrow: 'VAN GOGH / COLOR',
          title: 'The rhythm of blue branches',
          description: 'A moment when branches and connections bloom on one screen.',
        },
        {
          eyebrow: 'SESSHU / INK',
          title: 'Structure in the mist',
          description: 'Empty space makes the boundaries of a system clearer.',
        },
        {
          eyebrow: 'FAN KUAN / SHAN SHUI',
          title: 'The hierarchy of mountain and path',
          description: 'Small flows find their place inside a larger structure.',
        },
      ],
    },
    fieldNotes: {
      title: 'Work beyond the journal',
      description: 'Open work and small gatherings continuing between prose and code.',
      items: [
        {
          category: 'git',
          title: 'CONTRIBUTION',
          description: 'Small open-source improvements and the lessons they left behind.',
        },
        {
          category: 'nextjs',
          title: 'PROJECT',
          description: 'Build logs for tools made by observing a problem first.',
        },
        {
          category: 'markdown',
          title: 'COMMUNITY',
          description:
            'News from a developer community growing by reading and writing together.',
        },
      ],
    },
  },
} as const satisfies LangRecord<LandingDictionary>;

function formatPosition(position: number) {
  return String(position).padStart(2, '0');
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/[lang]'>) {
  const awaitedParams = await params;
  const lang = awaitedParams.lang as LangKey;
  const copy = dictionary[lang];
  const vMarkdownFileMetas = await Promise.all(
    markdownCollection.ids
      .filter(id => id.endsWith(`.${lang}`))
      .map(id => markdownCollection.loadVMarkdownFileMeta(id)),
  );
  const posts = vMarkdownFileMetas.toSorted(
    compareMarkdownDocument('updated', 'desc', lang),
  );

  return (
    <div className={styles.home} data-page="home">
      <section className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles['hero-rail']}>
          <p>LUMIR'S DEV JOURNAL — ISSUE 08</p>
          <span>SEOUL · 2026</span>
        </div>

        <div className={styles['hero-grid']}>
          <p className={styles['hero-kicker']}>CODE, SYSTEMS &amp; THE HUMAN BETWEEN</p>
          <h1 id="home-hero-title">
            {copy.hero.title.map(line => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <div className={styles['hero-aside']}>
            <p>{copy.hero.description}</p>
            <span>{copy.hero.note}</span>
          </div>
          <a className={styles['text-link']} href="#series">
            {copy.hero.callToAction}
            <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className={styles['hero-folio']}>
          <span>VOL. VIII</span>
          <span>EDITORIAL NOTES ON SOFTWARE</span>
          <span>PAGE 001</span>
        </div>
      </section>

      {postSections.map(({ id, eyebrow, marker }, sectionIndex) => {
        const { title, description } = copy.sections[id];
        const start = sectionIndex * 3;
        const sectionPosts = posts.slice(start, start + 3);

        return (
          <section
            key={id}
            className={`${styles['post-section']} ${styles[`${id}-section`]}`}
            id={id}
            aria-labelledby={`${id}-heading`}
          >
            <header className={styles['section-heading']}>
              <span className={styles['section-number']}>
                {formatPosition(sectionIndex + 1)}
              </span>
              <div>
                <p>{eyebrow}</p>
                <h2 id={`${id}-heading`}>{title}</h2>
              </div>
              <p className={styles['section-note']}>{description}</p>
            </header>
            <div className={`${styles['post-grid']} ${styles[`${id}-grid`]}`}>
              {sectionPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  marker={
                    id === 'series'
                      ? `${marker} ${formatPosition(index + 1)} · ${formatPosition(sectionPosts.length)}`
                      : `${marker} · ${formatPosition(index + 1)}`
                  }
                  variant={id}
                  vMarkdownFileMeta={post}
                />
              ))}
            </div>
          </section>
        );
      })}

      <section
        className={styles['photo-essay']}
        id="photo-notes"
        aria-labelledby="photo-notes-heading"
      >
        <header className={styles['photo-essay-heading']}>
          <p>VISUAL NOTES / GALLERY WALL 01</p>
          <h2 id="photo-notes-heading">{copy.gallery.title}</h2>
          <span>{copy.gallery.description}</span>
        </header>

        <div className={styles['photo-contact-sheet']}>
          {copy.gallery.plates.map((plate, index) => (
            <figure
              className={`${styles['photo-plate']} ${styles[`photo-plate-${index + 1}`]}`}
              key={plate.title}
            >
              <div className={styles['photo-plate-image']}>
                <img
                  alt=""
                  aria-hidden="true"
                  height={1024}
                  src="/images/editorial/placeholder.webp"
                  width={1536}
                />
                <span>PLATE {formatPosition(index + 1)}</span>
              </div>
              <figcaption>
                <p>{plate.eyebrow}</p>
                <h3>{plate.title}</h3>
                <span>{plate.description}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles['photo-essay-folio']}>
          <span>OBSERVATION BEFORE EXPLANATION</span>
          <span>OIL / INK ON PAPER</span>
          <span>SEOUL, 2026</span>
        </div>
      </section>

      <section
        className={styles['field-notes']}
        id="field-notes"
        aria-labelledby="field-notes-heading"
      >
        <header>
          <p>FIELD NOTES / 2026</p>
          <h2 id="field-notes-heading">{copy.fieldNotes.title}</h2>
          <span>{copy.fieldNotes.description}</span>
        </header>
        <div className={styles['field-grid']}>
          {copy.fieldNotes.items.map((item, index) => (
            <Link href={`/${lang}/categories/${item.category}`} key={item.title}>
              <span>{formatPosition(index + 1)}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <i aria-hidden="true">↗</i>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
