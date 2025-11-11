// Simple deterministic response generator using local legalDatabase.
// NOTE: For production integrate with an AI backend or legal DB API.

import legalDatabase from '../data/legalDatabase';

export default function generateResponse(userQuery = '') {
  const lowerQuery = userQuery.toLowerCase();

  // IPC detection
  const ipcMatch = lowerQuery.match(/section\s*(\d+)|ipc\s*(\d+)|(\d{3})\s*ipc/);
  if (ipcMatch) {
    const section = ipcMatch[1] || ipcMatch[2] || ipcMatch[3];
    const ipcData = legalDatabase.ipcSections[section];
    if (ipcData) {
      return {
        type: 'ipc',
        content: `**Section ${section} IPC: ${ipcData.title}**\n\n${ipcData.description}\n\nPunishment: ${ipcData.punishment}\n\nRelated cases:\n${ipcData.relatedCases.map((c) => `• ${c}`).join('\n')}`,
        confidence: 'high',
      };
    }
  }

  // concepts
  for (const [concept, definition] of Object.entries(legalDatabase.legalConcepts)) {
    if (lowerQuery.includes(concept)) {
      return {
        type: 'concept',
        content: `**${concept[0].toUpperCase() + concept.slice(1)}**\n\n${definition}`,
        confidence: 'high',
      };
    }
  }

  // tenant
  if (lowerQuery.includes('landlord') || lowerQuery.includes('evict') || lowerQuery.includes('tenant')) {
    return {
      type: 'guidance',
      content:
        'Tenant Rights (general): Landlords must follow notice and court process before eviction. Check Transfer of Property Act and state rent laws. Consult a local lawyer for state-specific steps.',
      confidence: 'high',
    };
  }

  // contract
  if (lowerQuery.includes('contract') || lowerQuery.includes('agreement')) {
    return {
      type: 'guidance',
      content:
        'Contract basics: Offer, acceptance, consideration, capacity, free consent, lawful object. Remedies: damages, specific performance, injunction.',
      confidence: 'high',
    };
  }

  return {
    type: 'general',
    content:
      'I need more specifics to answer precisely. Try asking "What is Section 420 IPC?" or "My landlord served an eviction notice — what should I do?"',
    confidence: 'low',
  };
}
