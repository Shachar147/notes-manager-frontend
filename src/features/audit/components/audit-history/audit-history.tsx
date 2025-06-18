import {observer, Observer} from 'mobx-react';
import { AuditStore } from '../../stores/audit.store';
import { AuditTopic } from '../../types/audit.types';
import { Text } from '../../../../common/components';
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
            <Text variant="headline-5">Edit History</Text>
            {store.isLoading ? (
                <Text variant="body">Loading...</Text>
            ) : store.error ? (
                <Text variant="disabled">{store.error}</Text>
            ) : store.auditLogs.length === 0 ? (
                <Text variant="body">No history available</Text>
            ) : (
                <div className="audit-logs">
                    {store.auditLogs.map((log) => (
                        <div key={log.id} className="audit-log">
                            <div className="audit-log-header">
                                <Text variant="headline-6" className="event-type">{getEventTypeLabel(log.eventType)}</Text>
                                <Text variant="subhead" className="timestamp">{formatDate(log.createdAt)}</Text>
                            </div>
                            {log.oldData && (
                                <div className="changes">
                                    <div className="old-data">
                                        <Text variant="subhead">Previous</Text>
                                        <pre>{JSON.stringify(log.oldData, null, 2)}</pre>
                                    </div>
                                    <div className="new-data">
                                        <Text variant="subhead">New</Text>
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