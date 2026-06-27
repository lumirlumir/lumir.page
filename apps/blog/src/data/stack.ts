/**
 * @fileoverview Defines TODO
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface MusicStack {
  readonly category: 'DAW' | 'Virtual Inst' | 'Synthesizer';
  readonly name: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export const musicStack = [
  {
    category: 'DAW',
    name: 'FLstudio',
  },
  {
    category: 'DAW',
    name: 'ProTools',
  },
  {
    category: 'DAW',
    name: 'Melodyne',
  },
  {
    category: 'DAW',
    name: 'Autotune',
  },
  {
    category: 'DAW',
    name: 'RX7',
  },
  {
    category: 'DAW',
    name: 'Sibelius',
  },
  {
    category: 'Virtual Inst',
    name: 'Waves',
  },
  {
    category: 'Virtual Inst',
    name: 'NIKomplete',
  },
  {
    category: 'Virtual Inst',
    name: 'FabFilter',
  },
  {
    category: 'Virtual Inst',
    name: 'GoodHertz',
  },
  {
    category: 'Virtual Inst',
    name: 'iZotope',
  },
  {
    category: 'Virtual Inst',
    name: 'SoundToys',
  },
  {
    category: 'Virtual Inst',
    name: 'Valhalla',
  },
  {
    category: 'Synthesizer',
    name: 'Serum',
  },
  {
    category: 'Synthesizer',
    name: 'Sylenth1',
  },
  {
    category: 'Synthesizer',
    name: 'Massive',
  },
  {
    category: 'Synthesizer',
    name: 'MassiveX',
  },
  {
    category: 'Synthesizer',
    name: 'Nexus',
  },
] as const satisfies readonly MusicStack[];
