import React, { useState, useEffect } from "react";
import axios from "axios";

function ContactAdmin() {
  const [inquiries, setInquiries] = useState([]);
  const [answerMap, setAnswerMap] = useState({});

  useEffect(() => {
    axios.get("/api/inquiries")
      .then(res => setInquiries(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAnswerChange = (id, value) => {
    setAnswerMap({ ...answerMap, [id]: value });
  };

  const handleAnswerSubmit = (id) => {
    const answer = answerMap[id];
    if (!answer) return;

    axios.put(`/api/inquiries/${id}/answer`, answer, {
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        alert("답변이 등록되었습니다.");
        setInquiries(inquiries.map(q => q.id === id ? res.data : q));
        setAnswerMap({ ...answerMap, [id]: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>회원 문의 관리</h2>
      {inquiries.map((q) => (
        <div key={q.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px", borderRadius: "8px" }}>
          <p><strong>{q.title}</strong> ({q.username})</p>
          <p>{q.content}</p>
          <p>답변: {q.answer || "아직 없음"}</p>

          <textarea
            placeholder="답변을 입력하세요"
            value={answerMap[q.id] || ""}
            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
            style={{ width: "100%", height: "60px" }}
          />
          <button onClick={() => handleAnswerSubmit(q.id)}>답변 등록</button>
        </div>
      ))}
    </div>
  );
}

export default ContactAdmin;