import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [groupedHistory, setGroupedHistory] = useState({});
  const [expandedDate, setExpandedDate] = useState(null);
  const [error, setError] = useState('');
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === true) return; // 두 번째 실행 방지

    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // setError('로그인이 필요합니다.');
          // setLoading(false);
          alert('로그인이 필요한 서비스입니다.'); // 회원가입 또는 로그인 후 이용해주세요.
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:8080/api/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const sortedHistory = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setHistory(sortedHistory);

        // 날짜별로 그룹화
        const grouped = sortedHistory.reduce((acc, item) => {
          const date = new Date(item.createdAt).toLocaleDateString('ko-KR');
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);
          return acc;
        }, {});
        setGroupedHistory(grouped);

      } catch (err) {
        if (err.response && err.response.status === 401) {
          setError('세션이 만료되었거나 유효하지 않습니다. 다시 로그인해주세요.');
        } else {
          setError('분석 기록을 불러오는 중 오류가 발생했습니다.');
        }
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();

    // StrictMode에서 두 번 실행되는 것을 방지하기 위한 클린업 함수
    return () => {
      effectRan.current = true;
    };
  }, []);

  const toggleDate = (date) => {
    setExpandedDate(expandedDate === date ? null : date);
  };

  if (loading) {
    return <div style={styles.message}>로딩 중...</div>;
  }

  if (error) {
    return <div style={styles.errorMessage}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>분석 기록</h1>
      {history.length === 0 ? (
        <p style={styles.message}>아직 분석 기록이 없습니다.</p>
      ) : (
        <div style={styles.dateGroupContainer}>
          {Object.keys(groupedHistory).map((date) => (
            <div key={date} style={styles.dateGroup}>
              <h2 style={styles.dateHeader} onClick={() => toggleDate(date)}>
                {date} ({groupedHistory[date].length}개)
                <span style={styles.toggleIcon}>{expandedDate === date ? '▲' : '▼'}</span>
              </h2>
              {expandedDate === date && (
                <div style={styles.list}>
                  {groupedHistory[date].map((item) => (
                    <div key={item.historyId} style={styles.card}>
                      <div style={styles.cardHeader}>
                        <span style={styles.category}>{item.category}</span>
                        <span style={styles.date}>{new Date(item.createdAt).toLocaleTimeString('ko-KR')}</span>
                      </div>
                      <div style={styles.cardBody}>
                        <p><strong>입력 리뷰:</strong> {item.inputReview}</p>
                        <p><strong>판단:</strong> <span style={{ color: item.judgment === '광고성' ? 'red' : 'green' }}>{item.judgment}</span></p>
                        <p><strong>유사도 점수:</strong> {item.similarityScore.toFixed(2)}</p>
                        <p><strong>가장 유사한 광고 리뷰:</strong> {item.mostSimilarReview}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 간단한 스타일 객체
const styles = {
  container: { padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '30px' },
  message: { textAlign: 'center', fontSize: '18px', color: '#666' },
  errorMessage: { textAlign: 'center', fontSize: '18px', color: 'red' },
  dateGroupContainer: { display: 'flex', flexDirection: 'column', gap: '20px' },
  dateGroup: { border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' },
  dateHeader: { cursor: 'pointer', backgroundColor: '#f7f7f7', padding: '15px', margin: 0, fontSize: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  toggleIcon: { fontSize: '16px' },
  list: { display: 'flex', flexDirection: 'column', gap: '20px' },
  card: { border: '1px solid #ddd', borderRadius: '8px', padding: '15px', margin: '0 15px 15px 15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px' },
  category: { fontWeight: 'bold', backgroundColor: '#f0f0f0', padding: '5px 10px', borderRadius: '12px' },
  date: { fontSize: '14px', color: '#888' },
  cardBody: { display: 'flex', flexDirection: 'column', gap: '8px' },
};

export default HistoryPage;
