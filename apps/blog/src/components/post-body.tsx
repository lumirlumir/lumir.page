/**
 * @fileoverview Post body with an image zoom dialog.
 */

'use client';

import 'client-only';
import { Dialog, type DialogHandle } from '@lumir/react-kit/components';
import { useEffect, useRef, useState } from 'react';
import type { PropsWithLang } from '@/data/lang';
import styles from './post-body.module.css';

const labels = {
  ko: { zoom: '이미지 확대', close: '닫기' },
  en: { zoom: 'Enlarge image', close: 'Close' },
};

/** Enhances the post's server-rendered Markdown with a shared image dialog. */
export function PostBody({
  lang,
  markup,
}: PropsWithLang<{ markup: { __html: string } }>) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<DialogHandle>(null);
  const [preview, setPreview] = useState<{ src: string; alt: string } | null>(null);
  const { zoom, close } = labels[lang];

  useEffect(() => {
    const images = bodyRef.current!.querySelectorAll<HTMLImageElement>(
      'img[src]:not(.emoji, a *, button *, summary *, [usemap], [role], [tabindex])',
    );
    const controller = new AbortController();
    const options = { signal: controller.signal };

    for (const image of images) {
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-haspopup', 'dialog');
      image.setAttribute('aria-label', image.alt ? `${zoom} (${image.alt})` : zoom);
      image.addEventListener(
        'click',
        () => {
          setPreview({ src: image.currentSrc || image.src, alt: image.alt });
          dialogRef.current?.open();
        },
        options,
      );
      image.addEventListener(
        'keydown',
        event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            image.click();
          }
        },
        options,
      );
    }

    return () => {
      controller.abort();
      for (const image of images) {
        image.removeAttribute('tabindex');
        image.removeAttribute('role');
        image.removeAttribute('aria-haspopup');
        image.removeAttribute('aria-label');
      }
    };
  }, [markup, zoom]);

  return (
    <>
      <div
        className="markdown"
        ref={bodyRef}
        // eslint-disable-next-line react-x/dom-no-dangerously-set-innerhtml -- The HTML comes from local, controlled post files.
        dangerouslySetInnerHTML={markup}
      />
      <Dialog.Root ref={dialogRef}>
        <Dialog.Content
          className={styles.dialog}
          aria-label={zoom}
          aria-description={preview?.alt}
        >
          <Dialog.Close aria-label={close} title={close}>
            {preview && <img src={preview.src} alt={preview.alt} />}
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
