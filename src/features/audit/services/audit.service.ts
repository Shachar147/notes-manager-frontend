import { AuditLog, AuditLogResponse } from '../types/audit.types';
import axios from 'axios';

const API_BASE_URL = '/api/audit';

export default class AuditService {
  private readonly baseUrl = 'http://localhost:3000/api';

  async getEntityHistory(
    entityType: string,
    entityId: string
  ): Promise<AuditLog[]> {
    try {
      const response = await axios.get<AuditLogResponse>(
        `${API_BASE_URL}/entity/${entityType}/${entityId}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch audit history:', error);
      throw error;
    }
  }
}
