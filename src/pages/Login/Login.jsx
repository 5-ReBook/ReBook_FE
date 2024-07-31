import { useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { UserContext } from '../../context/UserContext';
import AuthAxios from '../../interceptors/AuthAxios';

function Login({ onLogin }) {
  const { setUser } = useContext(UserContext);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async event => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        { username, password },
        { withCredentials: true },
      );

      if (response.status === 200) {
        const token = response.headers.access;
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('Authorization', token);

        // 사용자 정보 요청
        const userInfoResponse = await AuthAxios.get(
          'http://localhost:8080/members',
        );

        if (userInfoResponse.status === 200) {
          const { username, nickname, university, majors } =
            userInfoResponse.data.result;
          setUser({ username, nickname, university, majors }); // Context에 사용자 정보 설정
          console.log('User Info:', userInfoResponse.data);
          onLogin();
          navigate('/Products');
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('등록된 정보가 없습니다.');
      usernameRef.current.value = '';
      passwordRef.current.value = '';
      usernameRef.current.focus();
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">ID:</label>
          <input
            type="text"
            id="username"
            name="username"
            ref={usernameRef}
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="password">PW:</label>
          <input
            type="password"
            id="password"
            name="password"
            ref={passwordRef}
            autoComplete="off"
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <div>
        <Link to="/signup">
          <button>가입하기</button>
        </Link>
      </div>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
