import { useNavigate } from "react-router-dom";

function ContactButton() {
  const navigate = useNavigate();

  const handleContact = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/role", {
        method: "GET",
        credentials: "include", // 세션/쿠키 유지
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // JWT 사용 시
        }
      });
      const data = await res.json();

      if (data.role === "ROLE_ADMIN") {
        navigate("/contactadmin");
      } else if (data.role === "ROLE_USER") {
        navigate("/contactuser");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Error:", err);
      navigate("/login");
    }
  };

  return <button onClick={handleContact}>문의하기</button>;
}

export default ContactButton;