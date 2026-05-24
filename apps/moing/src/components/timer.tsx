/**
 * @fileoverview timer.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCountdown } from '@lumir/react-kit/hooks';
import { cn } from '@lumir/utils';

import NeonFont from '@/components/neon-font';
import { useScenarioContext } from '@/contexts/scenario-context';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface Props {
  timer: ReturnType<typeof useCountdown>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Timer({ timer }: Props) {
  const { section } = useScenarioContext();
  const { status } = section.timer;
  const [remainingMs] = timer;
  const remainingSeconds = Math.ceil(remainingMs / 1_000);
  const minute = Math.floor((remainingSeconds / 60) % 60);
  const second = Math.floor(remainingSeconds % 60);

  return (
    <footer
      className={cn(
        'timer',
        'custom-flex-center',
        'transition',
        status === 'hidden' && 'pointer-events-none opacity-0',
      )}
    >
      <NeonFont
        neonColor={minute === 0 ? 'red' : 'white'}
        neonSize="s"
        style={{
          fontFamily: 'Audiowide',
          fontSize: '35px',
        }}
      >
        {`${String(minute).padStart(2, '0')} : ${String(second).padStart(2, '0')}`}
      </NeonFont>
    </footer>
  );
}
