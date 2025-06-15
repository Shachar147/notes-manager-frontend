export enum AuditTopic {
    NOTE_CREATED = 'note.created',
    NOTE_UPDATED = 'note.updated',
    NOTE_DELETED = 'note.deleted',
    NOTE_DUPLICATED = 'note.duplicated'
}

export interface AuditLog {
    id: number;
    eventType: AuditTopic;
    entityType: string;
    entityId: string;
    userId: string;
    oldData?: Record<string, any>;
    newData?: Record<string, any>;
    metadata?: Record<string, any>;
    createdAt: Date;
}

export interface AuditLogResponse {
    status: string;
    data: AuditLog[];
} 