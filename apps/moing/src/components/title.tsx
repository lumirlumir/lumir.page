/**
 * @fileoverview title.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn } from '@lumir/utils';

import NeonFont from '@/components/neon-font';
import { useScenarioContext } from '@/contexts/scenario-context';

import './title.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Title() {
  const scenario = useScenarioContext();
  const { visibility } = scenario.getSectionObj().title;

  return (
    <div
      className={cn(
        'title',
        'transition',
        'select-none',
        'custom-main-others',
        visibility || 'pointer-events-none opacity-0',
      )}
    >
      <div className="mock">
        <NeonFont
          neonColor="blue"
          neonSize="m"
          style={{ fontFamily: 'Pacifico', fontSize: '50px' }}
        >
          <h1>Mock</h1>
        </NeonFont>
      </div>
      <div className="interview">
        <NeonFont
          neonColor="purple"
          style={{ fontFamily: 'Audiowide', fontSize: '100px' }}
        >
          <h1>Interview</h1>
        </NeonFont>
      </div>
    </div>
  );
}
