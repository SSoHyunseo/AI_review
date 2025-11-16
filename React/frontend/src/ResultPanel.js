import React from "react";

function ResultPanel({ result }) {
  let analysisResult = result;

  // If result is a string, parse it as JSON
  if (typeof result === 'string') {
    try {
      analysisResult = JSON.parse(result);
    } catch (error) {
      console.error("Failed to parse result details:", error);
      return <p>결과를 표시할 수 없습니다.</p>;
    }
  }

  if (!analysisResult) {
    return <p>결과가 없습니다.</p>;
  }

  // Safely access properties
  const decision = analysisResult["판단"] || 'N/A';
  const similarityScore = analysisResult["유사도 점수"] !== undefined ? analysisResult["유사도 점수"].toFixed(2) : 'N/A';
  const mostSimilarAdReview = analysisResult["가장 유사한 광고 리뷰"] || "없음";
  const adKeywords = Array.isArray(analysisResult["광고 키워드"]) ? analysisResult["광고 키워드"].join(", ") : "없음";
  const nonAdKeywords = Array.isArray(analysisResult["비광고 키워드"]) ? analysisResult["비광고 키워드"].join(", ") : "없음";

  return (
    <div className="result-panel" style={styles.panel}>
      <h3>분석 결과</h3>
      <p><strong>판단:</strong> {decision}</p>
      <p><strong>유사도 점수:</strong> {similarityScore}%</p>
      <p><strong>가장 유사한 광고 리뷰:</strong> {mostSimilarAdReview}</p>
      <p><strong>광고 키워드:</strong> {adKeywords}</p>
      <p><strong>비광고 키워드:</strong> {nonAdKeywords}</p>
    </div>
  );
}

const styles = {
  panel: {
    padding: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    marginTop: "10px",
  },
};

export default ResultPanel;