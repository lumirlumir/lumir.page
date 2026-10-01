/**
 * @fileoverview Editorial landing page for a localized route.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { PostCard } from '@/components/article/post-card';
import { type CategoryKey } from '@/data/category';
import { type LangKey, type LangRecord } from '@/data/lang';
import { compareMarkdownDocument } from '@/utils/compare';
import createMarkdownCollection from '@/utils/markdown-collection';
import styles from './page.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface LandingDictionary {
  readonly hero: {
    readonly issue: string;
    readonly location: string;
    readonly kicker: string;
    readonly title: readonly [string, string, string];
    readonly description: string;
    readonly note: string;
    readonly callToAction: string;
    readonly folio: readonly [string, string, string];
  };
  readonly sections: {
    readonly series: SectionDictionary;
    readonly popular: SectionDictionary;
    readonly latest: SectionDictionary;
  };
  readonly markers: {
    readonly series: string;
    readonly popular: string;
    readonly latest: string;
  };
  readonly gallery: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly plates: readonly [GalleryPlate, GalleryPlate, GalleryPlate];
    readonly folio: readonly [string, string, string];
  };
  readonly fieldNotes: {
    readonly eyebrow: string;
    readonly title: string;
    readonly description: string;
    readonly items: readonly [FieldNote, FieldNote, FieldNote];
  };
}

interface SectionDictionary {
  readonly eyebrow: string;
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
const placeholderImage = '/images/editorial/placeholder.webp';

const dictionary = {
  ko: {
    hero: {
      issue: "LUMIR'S DEV JOURNAL — ISSUE 08",
      location: 'SEOUL · 2026',
      kicker: 'CODE, SYSTEMS & THE HUMAN BETWEEN',
      title: ['기술을 읽고,', '구조를 그리며,', '경험을 기록합니다.'],
      description:
        '코드가 제품이 되는 과정에서 발견한 설계, 성능, 협업의 장면을 오래 읽히는 글로 엮습니다.',
      note: '사유와 실험을 위한 기술 에디토리얼',
      callToAction: '오늘의 컬렉션 보기',
      folio: ['VOL. VIII', 'EDITORIAL NOTES ON SOFTWARE', 'PAGE 001'],
    },
    sections: {
      series: {
        eyebrow: 'CURATED SEQUENCES',
        title: '시리즈로 읽기',
        description: '하나의 질문을 여러 각도에서 탐색한 연작입니다.',
      },
      popular: {
        eyebrow: 'MOST READ',
        title: '많이 읽은 글',
        description: '독자들이 오래 머물고 다시 찾아온 기록입니다.',
      },
      latest: {
        eyebrow: 'RECENT NOTES',
        title: '최근에 쓴 글',
        description: '지금 고민하고 실험하는 것들을 가장 먼저 전합니다.',
      },
    },
    markers: {
      series: 'SERIES',
      popular: 'MOST READ',
      latest: 'NOTE',
    },
    gallery: {
      eyebrow: 'VISUAL NOTES / GALLERY WALL 01',
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
      folio: ['OBSERVATION BEFORE EXPLANATION', 'OIL / INK ON PAPER', 'SEOUL, 2026'],
    },
    fieldNotes: {
      eyebrow: 'FIELD NOTES / 2026',
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
      issue: "LUMIR'S DEV JOURNAL — ISSUE 08",
      location: 'SEOUL · 2026',
      kicker: 'CODE, SYSTEMS & THE HUMAN BETWEEN',
      title: ['Reading technology,', 'mapping systems,', 'recording experience.'],
      description:
        'We shape the design, performance, and collaboration found where code becomes a product into writing made to last.',
      note: 'A technical editorial for reflection and experiment',
      callToAction: "View today's collection",
      folio: ['VOL. VIII', 'EDITORIAL NOTES ON SOFTWARE', 'PAGE 001'],
    },
    sections: {
      series: {
        eyebrow: 'CURATED SEQUENCES',
        title: 'Read by series',
        description: 'Sequences that explore one question from several angles.',
      },
      popular: {
        eyebrow: 'MOST READ',
        title: 'Most-read stories',
        description: 'Notes readers stayed with and returned to.',
      },
      latest: {
        eyebrow: 'RECENT NOTES',
        title: 'Latest writing',
        description: 'The questions and experiments currently on the desk.',
      },
    },
    markers: {
      series: 'SERIES',
      popular: 'MOST READ',
      latest: 'NOTE',
    },
    gallery: {
      eyebrow: 'VISUAL NOTES / GALLERY WALL 01',
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
      folio: ['OBSERVATION BEFORE EXPLANATION', 'OIL / INK ON PAPER', 'SEOUL, 2026'],
    },
    fieldNotes: {
      eyebrow: 'FIELD NOTES / 2026',
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
  const posts = Object.values(markdownCollection.byLangSlug[lang])
    .toSorted(compareMarkdownDocument('updated', 'desc', lang))
    .slice(0, 9);
  const seriesPosts = posts.slice(0, 3);
  const popularPosts = posts.slice(3, 6);
  const latestPosts = posts.slice(6, 9);

  return (
    <div className={styles.home} data-page="home">
      <section className={styles.hero} aria-labelledby="home-hero-title">
        <div className={styles['hero-rail']}>
          <p>{copy.hero.issue}</p>
          <span>{copy.hero.location}</span>
        </div>

        <div className={styles['hero-grid']}>
          <p className={styles['hero-kicker']}>{copy.hero.kicker}</p>
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
          {copy.hero.folio.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section
        className={`${styles['post-section']} ${styles['series-section']}`}
        id="series"
        aria-labelledby="series-heading"
      >
        <header className={styles['section-heading']}>
          <span className={styles['section-number']}>01</span>
          <div>
            <p>{copy.sections.series.eyebrow}</p>
            <h2 id="series-heading">{copy.sections.series.title}</h2>
          </div>
          <p className={styles['section-note']}>{copy.sections.series.description}</p>
        </header>
        <div className={`${styles['post-grid']} ${styles['series-grid']}`}>
          {seriesPosts.map((post, index) => (
            <PostCard
              key={post.id}
              lang={lang}
              marker={`${copy.markers.series} ${formatPosition(index + 1)} · ${formatPosition(seriesPosts.length)}`}
              position={index + 1}
              variant="series"
              vMarkdownFileMeta={post}
            />
          ))}
        </div>
      </section>

      <section
        className={`${styles['post-section']} ${styles['popular-section']}`}
        id="popular"
        aria-labelledby="popular-heading"
      >
        <header className={styles['section-heading']}>
          <span className={styles['section-number']}>02</span>
          <div>
            <p>{copy.sections.popular.eyebrow}</p>
            <h2 id="popular-heading">{copy.sections.popular.title}</h2>
          </div>
          <p className={styles['section-note']}>{copy.sections.popular.description}</p>
        </header>
        <div className={`${styles['post-grid']} ${styles['popular-grid']}`}>
          {popularPosts.map((post, index) => (
            <PostCard
              key={post.id}
              lang={lang}
              marker={`${copy.markers.popular} · ${formatPosition(index + 1)}`}
              position={index + 1}
              variant="popular"
              vMarkdownFileMeta={post}
            />
          ))}
        </div>
      </section>

      <section
        className={`${styles['post-section']} ${styles['latest-section']}`}
        id="latest"
        aria-labelledby="latest-heading"
      >
        <header className={styles['section-heading']}>
          <span className={styles['section-number']}>03</span>
          <div>
            <p>{copy.sections.latest.eyebrow}</p>
            <h2 id="latest-heading">{copy.sections.latest.title}</h2>
          </div>
          <p className={styles['section-note']}>{copy.sections.latest.description}</p>
        </header>
        <div className={`${styles['post-grid']} ${styles['latest-grid']}`}>
          {latestPosts.map((post, index) => (
            <PostCard
              key={post.id}
              lang={lang}
              marker={`${copy.markers.latest} · ${formatPosition(index + 1)}`}
              position={index + 1}
              variant="latest"
              vMarkdownFileMeta={post}
            />
          ))}
        </div>
      </section>

      <section
        className={styles['photo-essay']}
        id="photo-notes"
        aria-labelledby="photo-notes-heading"
      >
        <header className={styles['photo-essay-heading']}>
          <p>{copy.gallery.eyebrow}</p>
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
                  src={placeholderImage}
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
          {copy.gallery.folio.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      <section
        className={styles['field-notes']}
        id="field-notes"
        aria-labelledby="field-notes-heading"
      >
        <header>
          <p>{copy.fieldNotes.eyebrow}</p>
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
