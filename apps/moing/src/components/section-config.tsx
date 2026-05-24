/**
 * @fileoverview section-config.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type ChangeEventHandler, type MouseEvent, type MouseEventHandler } from 'react';
import { cn } from '@lumir/utils';

import NeonDiv from '@/components/neon-div';
import NeonFont from '@/components/neon-font';
import { questionTypes, useConfigContext } from '@/contexts/config-context';

import './section-config.css';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

function ButtonCount({
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
      className={cn('button-count', count >= 1 || 'off')}
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
      className="checkbox"
      style={{
        fontFamily: 'Audiowide',
        fontSize: '40px',
      }}
    >
      <label>
        <input type="checkbox" onChange={onChange} />
        <span>{label}</span>
      </label>
    </NeonFont>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function SectionConfig() {
  const { config, updateConfig } = useConfigContext();

  const handleButtonCount = (
    e: MouseEvent<HTMLInputElement>,
    key: 'main' | 'sub' | 'time',
  ) => {
    if (e.ctrlKey && config[key] - 1 >= 0) {
      updateConfig({ [key]: config[key] - 1 });
    } else if (!e.ctrlKey && config[key] + 1 <= 10) {
      updateConfig({ [key]: config[key] + 1 });
    }
  };

  return (
    <NeonDiv
      className={cn(
        'section-config',
        'custom-flex-center',
        'custom-scrollbar',
        'custom-main-section',
        'transition',
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
              onChange={() =>
                updateConfig({
                  [key]: !config[key],
                })
              }
              isChecked={config[key]}
              label={key.toUpperCase()}
            />
          ))}
        </div>
        <div>
          <ButtonCount
            onClick={e => handleButtonCount(e, 'main')}
            count={config.main}
            label="QUESTION-MAIN:"
          />
          <ButtonCount
            onClick={e => handleButtonCount(e, 'sub')}
            count={config.sub}
            label="QUESTION-SUB:"
          />
          <ButtonCount
            onClick={e => handleButtonCount(e, 'time')}
            count={config.time}
            label="TIME-LIMIT:"
          />
        </div>
      </div>
    </NeonDiv>
  );
}
