// import React, { useState } from "react";

// function ReviewForm() {
//   const [review, setReview] = useState("");
//   const [result, setResult] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8080/review/check", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userReview: review })
//       });

//       if (!response.ok) throw new Error("API 호출 실패");

//       const data = await response.json();
//       setResult(data);
//     } catch (err) {
//       console.error("에러:", err);
//       setResult({ error: "서버 호출 실패" });
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
//       <h2>광고성 리뷰 판별</h2>
//       <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
//         <textarea
//           value={review}
//           onChange={(e) => setReview(e.target.value)}
//           placeholder="리뷰를 입력하세요..."
//           rows="4"
//           style={{
//             width: "100%",
//             padding: "10px",
//             borderRadius: "5px",
//             border: "1px solid #ccc",
//             resize: "none"
//           }}
//         />
//         <br />
//         <button
//           type="submit"
//           style={{
//             marginTop: "10px",
//             padding: "10px 20px",
//             backgroundColor: "#4CAF50",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer"
//           }}
//         >
//           분석하기
//         </button>
//       </form>

//       {result && !result.error && (
//         <div
//           style={{
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             padding: "15px",
//             backgroundColor: "#f9f9f9",
//             boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
//           }}
//         >
//           <h3 style={{ marginBottom: "10px" }}>분석 결과</h3>
//           <p>
//             <strong>광고 여부:</strong>{" "}
//             {result.is_ad ? "광고 리뷰" : "일반 리뷰"}
//           </p>
//           <p>
//             <strong>유사도 점수:</strong>{" "}
//             {(result.similarity_score * 100).toFixed(2)}%
//           </p>
//           <p>
//             <strong>키워드:</strong> {result.keywords.join(", ")}
//           </p>
//           <p>
//             <strong>메시지:</strong> {result.message}
//           </p>
//         </div>
//       )}

//       {result?.error && (
//         <div style={{ color: "red", marginTop: "10px" }}>
//           {result.error}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ReviewForm;
