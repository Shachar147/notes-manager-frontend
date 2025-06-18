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
            <span className="notes-headline-5">Edit History</span>
            {store.isLoading ? (
                <div className="notes-body">Loading...</div>
            ) : store.error ? (
                <div className="notes-disabled">{store.error}</div>
            ) : store.auditLogs.length === 0 ? (
                <div className="notes-body">No history available</div>
            ) : (
                <div className="audit-logs">
                    {store.auditLogs.map((log) => (
                        <div key={log.id} className="audit-log">
                            <div className="audit-log-header">
                                <span className="notes-headline-6 event-type">{getEventTypeLabel(log.eventType)}</span>
                                <span className="notes-subhead timestamp">{formatDate(log.createdAt)}</span>
                            </div>
                            {log.oldData && (
                                <div className="changes">
                                    <div className="old-data">
                                        <span className="notes-subhead">Previous</span>
                                        <pre>{JSON.stringify(log.oldData, null, 2)}</pre>
                                    </div>
                                    <div className="new-data">
                                        <span className="notes-subhead">New</span>
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