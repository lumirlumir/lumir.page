/**
 * @fileoverview timer.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn } from '@lumir/utils';
import NeonFont from '@/components/neon-font';
import { useScenarioContext } from '@/contexts/scenario-context';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Props for the Timer component.
 */
interface TimerProps {
  /**
   * Remaining time in milliseconds.
   */
  remaining: number;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Timer({ remaining }: TimerProps) {
  const { section } = useScenarioContext();
  const { status } = section.timer;
  const remainingSeconds = Math.ceil(remaining / 1_000);
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
