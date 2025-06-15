import { makeAutoObservable, runInAction } from 'mobx';
import { auditApiService, AuditLog } from '../features/notes/services/audit-api.service';

export class AuditStore {
    logs: AuditLog[] = [];
    isLoading = false;
    error: string | null = null;
    selectedEntityId: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchEntityHistory(entityType: string, entityId: string) {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await auditApiService.getEntityHistory(entityType, entityId);
            runInAction(() => {
                this.logs = response.data.data;
                this.selectedEntityId = entityId;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch audit logs';
                this.isLoading = false;
            });
        }
    }

    async fetchEventHistory(eventType: string) {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await auditApiService.getEventHistory(eventType);
            runInAction(() => {
                this.logs = response.data.data;
                this.selectedEntityId = null;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch audit logs';
                this.isLoading = false;
            });
        }
    }

    async fetchDateRangeHistory(startDate: Date, endDate: Date) {
        this.isLoading = true;
        this.error = null;
        try {
            const response = await auditApiService.getDateRangeHistory(startDate, endDate);
            runInAction(() => {
                this.logs = response.data.data;
                this.selectedEntityId = null;
                this.isLoading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch audit logs';
                this.isLoading = false;
            });
        }
    }

    clearLogs() {
        this.logs = [];
        this.selectedEntityId = null;
    }
} 