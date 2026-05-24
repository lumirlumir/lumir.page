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
import useConfig, { questionTypes } from '@/hooks/use-config';

import './section-config.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  config: ReturnType<typeof useConfig>;
}

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

export default function SectionConfig({ config }: Props) {
  const { configState, handleConfigState } = config;

  const handleButtonCount = (
    e: MouseEvent<HTMLInputElement>,
    key: 'main' | 'sub' | 'time',
  ) => {
    if (e.ctrlKey && configState[key] - 1 >= 0) {
      handleConfigState({ [key]: configState[key] - 1 });
    } else if (!e.ctrlKey && configState[key] + 1 <= 10) {
      handleConfigState({ [key]: configState[key] + 1 });
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
        configState.visibility || 'custom-invisible-section',
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
                handleConfigState({
                  [key]: !configState[key],
                })
              }
              isChecked={configState[key]}
              label={key.toUpperCase()}
            />
          ))}
        </div>
        <div>
          <ButtonCount
            onClick={e => handleButtonCount(e, 'main')}
            count={configState.main}
            label="QUESTION-MAIN:"
          />
          <ButtonCount
            onClick={e => handleButtonCount(e, 'sub')}
            count={configState.sub}
            label="QUESTION-SUB:"
          />
          <ButtonCount
            onClick={e => handleButtonCount(e, 'time')}
            count={configState.time}
            label="TIME-LIMIT:"
          />
        </div>
      </div>
    </NeonDiv>
  );
}
