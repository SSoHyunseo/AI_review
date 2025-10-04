// src/pages/Contact.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Contact.css";

function ContactUser() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inquiries, setInquiries] = useState([]);

  // 로그인된 사용자 이름 가져오기 (JWT에서 가져온다고 가정)
  const username = localStorage.getItem("username");

  useEffect(() => {
    if (username) {
      axios.get(`/api/inquiries/user/${username}`)
        .then(res => setInquiries(res.data))
        .catch(err => console.error(err));
    }
  }, [username]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const inquiry = { username, title, content };

    axios.post("/api/inquiries", inquiry)
      .then(res => {
        setInquiries([...inquiries, res.data]);
        setTitle("");
        setContent("");
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="contact-container">
      {/* 문의 작성 */}
      <div className="contact-box">
        <h2>문의하기</h2>
        <form onSubmit={handleSubmit}>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <button type="submit">작성하기</button>
        </form>
      </div>

      {/* 나의 문의 내역 */}
      <div className="inquiry-list">
        <h3>나의 문의 내역</h3>
        <ul>
          {inquiries.map((item, index) => (
            <li key={item.id}>
              <strong>{index + 1}. {item.title}</strong> ({item.username})<br />
              문의: {item.content} <br />
              답변: {item.answer ? item.answer : "아직 답변이 없습니다."}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ContactUser;