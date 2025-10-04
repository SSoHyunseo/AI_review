import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Contact.css";

function Contact() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !title || !content) return;

    const newInquiry = { name, title, content };
    setInquiries([...inquiries, newInquiry]);

    // 입력 초기화
    setName("");
    setTitle("");
    setContent("");
  };

  return (
    <div className="contact-container">

      {/* 문의 작성 */}
      <div className="contact-box">
        <h2>문의하기</h2>
        <form onSubmit={handleSubmit}>
          <label>이름</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

      {/* 문의 목록 */}
      <div className="inquiry-list">
        <h3>문의 목록</h3>
        <ul>
          {inquiries.map((item, index) => (
            <li key={index}>
              <strong>{index + 1}. {item.title}</strong> ({item.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contact;