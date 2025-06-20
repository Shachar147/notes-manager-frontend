import { ChangedData } from '../components/audit-history/audit-history';

export enum AuditTopic {
  NOTE_CREATED = 'note.created',
  NOTE_UPDATED = 'note.updated',
  NOTE_DELETED = 'note.deleted',
  NOTE_DUPLICATED = 'note.duplicated',
}

export interface AuditLog {
  id: number;
  eventType: AuditTopic;
  entityType: string;
  entityId: string;
  userId: string;
  oldData?: Record<string, ChangedData>;
  newData?: Record<string, ChangedData>;
  metadata?: Record<string, ChangedData>;
  createdAt: Date;
}

export interface AuditLogResponse {
  status: string;
  data: AuditLog[];
}
