import { AuditLog, AuditLogResponse } from '../types/audit.types';

export default class AuditService {
    private readonly baseUrl = 'http://localhost:3000/api';

    async getEntityHistory(entityType: string, entityId: string): Promise<AuditLog[]> {
        try {
            const response = await fetch(`${this.baseUrl}/audit/entity/${entityType}/${entityId}`);
            const data: AuditLogResponse = await response.json();
            return data.data;
        } catch (error) {
            console.error('Failed to fetch audit history:', error);
            throw error;
        }
    }
} 