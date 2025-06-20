import {observer, Observer} from 'mobx-react';
import { AuditStore } from '../../stores/audit.store';
import { AuditTopic } from '../../types/audit.types';
import { Text, Loader } from '../../../../common/components';
import { stripHtml } from "../../../../utils/utils";
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

// Helper to get changed fields between two objects
const getChangedFields = (oldData: Record<string, any> = {}, newData: Record<string, any> = {}) => {
    const changed: string[] = [];
    const allKeys = new Set([...Object.keys(oldData), ...Object.keys(newData)]);
    allKeys.forEach((key) => {
        if (key === 'updatedAt' || key === 'user') return; // Ignore updatedAt and user
        if (oldData[key] !== newData[key]) {
            changed.push(key);
        }
    });
    return changed;
};

function AuditHistory({ store }: AuditHistoryProps) {
    return (
        <div className="audit-history">
            <Text variant="headline-5">Edit History</Text>
            {store.isLoading ? (
                <Loader text="Loading history..." />
            ) : store.error ? (
                <Text variant="disabled">{store.error}</Text>
            ) : store.auditLogs.length === 0 ? (
                <Text variant="body">No history available</Text>
            ) : (
                <div className="audit-logs">
                    {store.auditLogs.map((log) => {
                        const changedFields = log.oldData && log.newData ? getChangedFields(log.oldData, log.newData) : [];
                        return (
                            <div key={log.id} className="audit-log">
                                <div className="audit-log-header">
                                    <Text variant="headline-6" className="event-type">{getEventTypeLabel(log.eventType)}</Text>
                                    <Text variant="subhead" className="timestamp">{formatDate(log.createdAt)}</Text>
                                </div>
                                {log.oldData && log.newData && changedFields.length > 0 && (
                                    <div className="changes">
                                        <div className="old-data">
                                            <Text variant="subhead">Previous</Text>
                                            {changedFields.map((key) => (
                                                <div key={key} style={{ marginBottom: 4 }}>
                                                    <Text variant="caption">"{key}": </Text>
                                                    <Text variant="body">was {stripHtml(log.oldData?.[key])}</Text>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="new-data">
                                            <Text variant="subhead">New</Text>
                                            {changedFields.map((key) => (
                                                <div key={key} style={{ marginBottom: 4 }}>
                                                    <Text variant="caption">"{key}": </Text>
                                                    <Text variant="body">now {stripHtml(log.newData?.[key])}</Text>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default observer(AuditHistory);