import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../common/components/loader/loader';
import Text from '../common/components/text/text';
import styles from './chatbot-statistics.module.css';

interface ChatbotStat {
  title: string;
  noteId: string;
  total: number;
}

function ChatbotStatisticsPage() {
  const [stats, setStats] = useState<ChatbotStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await axios.get<{ success: boolean; data: ChatbotStat[] }>('/api/notes/chatbot-usage-stats');
        setStats(res.data.data);
      } catch (err: any) {
        setError(err?.response?.data?.error || err?.message || 'Failed to fetch statistics');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className={styles.container}>
      <Text variant="headline-3" className={styles.title} as="h2">
        Chatbot Usage Statistics
      </Text>
      {loading && <Loader text="Loading statistics..." />}
      {error && <div className={styles.error}><Text color="red-6">{error}</Text></div>}
      {!loading && !error && (
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.th}><Text variant="headline-6">Note Title</Text></th>
              <th className={styles.th}><Text variant="headline-6">Total Usages</Text></th>
            </tr>
          </thead>
          <tbody>
            {stats.map((row) => (
              <tr key={row.noteId} className={styles.tr}>
                <td className={styles.td}>
                  <a
                    href={`/#note-${row.noteId}`}
                    className={styles.noteLink}
                  >
                    <Text color="blue-5">{row.title}</Text>
                  </a>
                </td>
                <td className={styles.td}>
                  <Text>{row.total}</Text>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ChatbotStatisticsPage; 