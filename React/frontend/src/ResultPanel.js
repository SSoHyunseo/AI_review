// import React from "react";

// function ResultPanel({ result, reviewText }) {
//   const sendFeedback = async (isPositive) => {
//     try {
//       const res = await fetch("/feedback", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           review: reviewText,
//           judgment: result["판단"],
//           feedback: isPositive
//         })
//       });

//       const data = await res.json();
//       alert(data.message || "피드백이 전송되었습니다.");
//     } catch (error) {
//       console.error("피드백 전송 실패:", error);
//       alert("피드백 전송 중 오류가 발생했습니다.");
//     }
//   };

//   return (
//     <div className="result-panel" style={styles.panel}>
//       <h3>분석 결과</h3>
//       <p><strong>판단:</strong> {result["판단"]}</p>
//       <p><strong>유사도 점수:</strong> {result["유사도 점수"]}%</p>
//       {result["가장 유사한 광고 리뷰"] && (
//         <p><strong>가장 유사한 광고 리뷰:</strong> {result["가장 유사한 광고 리뷰"]}</p>

//       )}
//       <p><strong>광고 키워드:</strong> {result["광고 키워드"].join(", ") || "없음"}</p>
//       <p><strong>비광고 키워드:</strong> {result["비광고 키워드"].join(", ") || "없음"}</p>

//       <div style={styles.feedbackContainer}>
//         <button
//           style={{ ...styles.button, backgroundColor: "#4CAF50" }}
//           onClick={() => sendFeedback(true)}
//         >
//           👍 추천
//         </button>
//         <button
//           style={{ ...styles.button, backgroundColor: "#f44336" }}
//           onClick={() => sendFeedback(false)}
//         >
//           👎 비추천
//         </button>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   panel: {
//     padding: "16px",
//     border: "1px solid #ddd",
//     borderRadius: "8px",
//     backgroundColor: "#fff",
//     maxWidth: "400px"
//   },
//   feedbackContainer: {
//     marginTop: "12px",
//     display: "flex",
//     gap: "8px"
//   },
//   button: {
//     flex: 1,
//     padding: "10px 16px",
//     border: "none",
//     borderRadius: "6px",
//     color: "#fff",
//     fontSize: "14px",
//     cursor: "pointer"
//   }
// };

// export default ResultPanel;
