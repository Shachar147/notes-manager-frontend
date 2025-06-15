import { makeAutoObservable, runInAction } from 'mobx';
import { AuditLog } from '../types/audit.types';
import AuditService from '../services/audit.service';

export class AuditStore {
    readonly auditService: AuditService;
    auditLogs: AuditLog[] = [];
    isLoading: boolean = false;
    error: string | null = null;

    constructor() {
        makeAutoObservable(this, {
            auditService: false // do not make auditService observable
        });
        this.auditService = new AuditService();
    }

    async fetchEntityHistory(entityType: string, entityId: string) {
        this.isLoading = true;
        this.error = null;
        try {
            const logs = await this.auditService.getEntityHistory(entityType, entityId);
            runInAction(() => {
                this.auditLogs = logs;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to fetch audit history';
            });
            console.error(error);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    clearHistory() {
        this.auditLogs = [];
        this.error = null;
    }
} 