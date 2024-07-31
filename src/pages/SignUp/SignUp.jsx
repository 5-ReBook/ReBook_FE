import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const idInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (idInputRef.current) {
      idInputRef.current.focus();
    }
  }, []);

  const handleIdChange = (e) => {
    const newId = e.target.value;

    if (newId.length > 30) {
      setIdError("아이디 길이는 30자를 넘을 수 없습니다.");
    } else if (/[\u3131-\uD79D]/g.test(newId)) {
      setIdError("아이디에는 한글이 포함되어서는 안됩니다.");
    } else if (/[^a-zA-Z0-9]/g.test(newId)) {
      setIdError("아이디에는 특수문자가 포함되어서는 안됩니다.");
    } else {
      setIdError("");
    }

    setId(newId);
  };

  //todo
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;

    if (newPassword.length < 8) {
      setPasswordError("비밀번호는 8자 이상이어야 합니다.");
    } else {
      setPasswordError("");
    }

    setPassword(newPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!idError && !passwordError) {
      try {
        // 서버에 회원 가입 요청 보내기
        const response = await axios.post("http://localhost:8080/join", {
          username: id,
          password: password,
        });

        if (response.status === 200) {
          alert("가입 완료되었습니다. 메인 페이지로 이동합니다.");
          // 회원 가입 성공 시 루트 페이지로 이동
          navigate("/");
        }
      } catch (error) {
        // 실패 시 처리
        setId("");
        setPassword("");
        setIdError("회원 가입 실패, 다시 작성해주세요.");
        if (idInputRef.current) {
          idInputRef.current.focus();
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id">ID: </label>
          <input
            type="text"
            id="id"
            value={id}
            onChange={handleIdChange}
            ref={idInputRef}
            autoComplete="off"
          />
        </div>
        {idError && <div style={{ color: "red" }}>{idError}</div>}
        <div>
          <label htmlFor="password">PW: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="off"
          />
        </div>
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}

export default SignUp;
