/**
 * @fileoverview config.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type { ChangeEventHandler, MouseEvent, MouseEventHandler } from 'react';
import { cn } from '@lumir/utils';

import NeonDiv from '@/components/neon-div';
import NeonFont from '@/components/neon-font';
import { questionTypes, useConfigContext } from '@/contexts/config';

import styles from './config.module.css';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const counters = [
  { key: 'main', label: 'QUESTION-MAIN:' },
  { key: 'sub', label: 'QUESTION-SUB:' },
  { key: 'time', label: 'TIME-LIMIT:' },
] as const;

function Counter({
  onClick,
  count,
  label,
}: {
  onClick: MouseEventHandler<HTMLInputElement>;
  count: number;
  label: string;
}) {
  return (
    <NeonFont
      neonColor={count >= 1 ? 'banana' : 'black'}
      neonSize="s"
      className={cn(styles.counter, count >= 1 || styles.off)}
      style={{
        fontFamily: 'Audiowide',
        fontSize: '40px',
      }}
    >
      <label>
        <input type="button" onClick={onClick} />
        <span>{label}</span>
        <span>{count}</span>
      </label>
    </NeonFont>
  );
}

function Checkbox({
  onChange,
  isChecked,
  label,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
  label: string;
}) {
  return (
    <NeonFont
      neonColor={isChecked ? 'banana' : 'black'}
      neonSize="s"
      className={styles.checkbox}
      style={{
        fontFamily: 'Audiowide',
        fontSize: '40px',
      }}
    >
      <label>
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        <span>{label}</span>
      </label>
    </NeonFont>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Config() {
  const { config, setConfig } = useConfigContext();

  const handleButtonCount = (
    e: MouseEvent<HTMLInputElement>,
    key: (typeof counters)[number]['key'],
  ) => {
    const delta = e.ctrlKey ? -1 : 1;

    setConfig(prev => {
      const next = prev[key] + delta;
      return next >= 0 && next <= 10 ? { ...prev, [key]: next } : prev;
    });
  };

  return (
    <NeonDiv
      className={cn(
        styles.config,
        'custom-scrollbar',
        'custom-main-section',
        'select-none',
        config.visibility || 'custom-invisible-section',
      )}
      neonSize="m"
      neonColor="banana"
    >
      <div>
        <div>
          {questionTypes.map(key => (
            <Checkbox
              key={key}
              onChange={e => {
                const { checked } = e.currentTarget;
                setConfig(prev => ({ ...prev, [key]: checked }));
              }}
              isChecked={config[key]}
              label={key.toUpperCase()}
            />
          ))}
        </div>
        <div>
          {counters.map(({ key, label }) => (
            <Counter
              key={key}
              onClick={e => handleButtonCount(e, key)}
              count={config[key]}
              label={label}
            />
          ))}
        </div>
      </div>
    </NeonDiv>
  );
}
