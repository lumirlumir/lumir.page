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
   * Current count of the timer in milliseconds.
   */
  currentCount: number;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Timer({ currentCount }: TimerProps) {
  const { section } = useScenarioContext();
  const { status } = section.timer;
  const remainingSeconds = Math.ceil(currentCount / 1_000);
  const minute = Math.floor((remainingSeconds / 60) % 60);
  const second = Math.floor(remainingSeconds % 60);

  return (
    <footer
      className={cn(
        'timer',
        'flex-center',
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
