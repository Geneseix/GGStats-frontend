// src/utils/queueTypeMap.js
export const QUEUE_TYPE_MAP = {
  450: 'ARAM',
  420: 'Ranked Solo/Duo',   
  440: 'Ranked Flex',
  400: 'Normal',
  430: 'Normal',

};

export function getQueueType(queueId) {
  return QUEUE_TYPE_MAP[queueId] || 'Otro';
}
