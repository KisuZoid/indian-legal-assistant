// Centralized legal database (IPC sections, cases, concepts).
// NOTE: Expand this file or load from an API in future.

const legalDatabase = {
  ipcSections: {
    '420': {
      title: 'Cheating and dishonestly inducing delivery of property',
      description:
        'Whoever cheats and thereby dishonestly induces the person deceived to deliver any property ...',
      punishment: 'Up to 7 years imprisonment and fine',
      relatedCases: ['State of Maharashtra v. Balakrishna', 'Hridaya Ranjan Prasad Verma v. State of Bihar'],
    },
    '302': {
      title: 'Punishment for murder',
      description:
        'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.',
      punishment: 'Death or life imprisonment and fine',
      relatedCases: ['Bachan Singh v. State of Punjab', 'Machhi Singh v. State of Punjab'],
    },
    '376': {
      title: 'Punishment for rape',
      description:
        'Whoever commits rape shall be punished with rigorous imprisonment for a term which shall not be less than ten years but may extend to imprisonment for life.',
      punishment: 'Minimum 10 years to life imprisonment and fine',
      relatedCases: ['Mukesh v. State of NCT Delhi', 'State of Punjab v. Gurmit Singh'],
    },
  },
  cases: [
    {
      id: 1,
      title: 'Kesavananda Bharati v. State of Kerala',
      year: 1973,
      court: 'Supreme Court',
      citation: 'AIR 1973 SC 1461',
      principle: 'Basic Structure Doctrine - Parliament cannot alter the basic structure of the Constitution',
      category: 'Constitutional Law',
    },
    {
      id: 2,
      title: 'Vishaka v. State of Rajasthan',
      year: 1997,
      court: 'Supreme Court',
      citation: 'AIR 1997 SC 3011',
      principle: 'Guidelines for prevention of sexual harassment at workplace',
      category: 'Labour Law',
    },
    {
      id: 3,
      title: 'DK Basu v. State of West Bengal',
      year: 1997,
      court: 'Supreme Court',
      citation: 'AIR 1997 SC 610',
      principle: 'Guidelines for arrest and detention to prevent custodial violence',
      category: 'Criminal Law',
    },
  ],
  legalConcepts: {
    bail:
      'Bail is the temporary release of an accused person awaiting trial, on condition that a sum of money is lodged to guarantee their appearance in court. It is governed by CrPC Sections 436-450.',
    'anticipatory bail':
      'Anticipatory bail is a direction to release a person on bail, issued even before the person is arrested. It is granted under Section 438 of CrPC.',
    writ:
      'A writ is a formal written order issued by a court. The Constitution provides for five types of writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo Warranto.',
    injunction:
      'An injunction is a court order requiring a person to do or cease doing a specific action. It can be temporary or permanent.',
  },
};

export default legalDatabase;
