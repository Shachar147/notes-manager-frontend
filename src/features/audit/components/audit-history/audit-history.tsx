import {observer, Observer} from 'mobx-react';
import { AuditStore } from '../../stores/audit.store';
import { AuditTopic } from '../../types/audit.types';
import './audit-history.css';

interface AuditHistoryProps {
    store: AuditStore;
}

const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
};

const getEventTypeLabel = (eventType: AuditTopic) => {
    switch (eventType) {
        case AuditTopic.NOTE_CREATED:
            return 'Created';
        case AuditTopic.NOTE_UPDATED:
            return 'Updated';
        case AuditTopic.NOTE_DELETED:
            return 'Deleted';
        case AuditTopic.NOTE_DUPLICATED:
            return 'Duplicated';
        default:
            return eventType;
    }
};

function AuditHistory({ store }: AuditHistoryProps) {
    return (
        <div className="audit-history">
            <h2>Edit History</h2>
            {store.isLoading ? (
                <div className="loading">Loading...</div>
            ) : store.error ? (
                <div className="error">{store.error}</div>
            ) : store.auditLogs.length === 0 ? (
                <div className="no-history">No history available</div>
            ) : (
                <div className="audit-logs">
                    {store.auditLogs.map((log) => (
                        <div key={log.id} className="audit-log">
                            <div className="audit-log-header">
                                <span className="event-type">{getEventTypeLabel(log.eventType)}</span>
                                <span className="timestamp">{formatDate(log.createdAt)}</span>
                            </div>
                            {log.oldData && (
                                <div className="changes">
                                    <div className="old-data">
                                        <h4>Previous</h4>
                                        <pre>{JSON.stringify(log.oldData, null, 2)}</pre>
                                    </div>
                                    <div className="new-data">
                                        <h4>New</h4>
                                        <pre>{JSON.stringify(log.newData, null, 2)}</pre>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default observer(AuditHistory);