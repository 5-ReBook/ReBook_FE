import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAxios from '../../../global/interceptor/AuthAxios.jsx';
import { UpdateContext } from '../context/UpdateContext.jsx';

// todo : 현재 전공목록 불러와서 MajorList에 넣어두고 버튼으로 표시

function UpdateMajors() {
  const { nickname, university, majors, setMajors } = useContext(UpdateContext);
  const [input, setInput] = useState('');
  const [majorsList, setMajorsList] = useState([]);
  const navigate = useNavigate();

  const searchMajor = async query => {
    try {
      const response = await AuthAxios.get('/members/majors', {
        params: { majorToSearch: query },
      });
      if (Array.isArray(response.data.result)) {
        setMajorsList(response.data.result);
      } else {
        setMajorsList([]);
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching majors:', error);
    }
  };

  const handleMajorSelect = major => {
    if (window.confirm(`${major}로 선택하시겠습니까?`)) {
      setMajors(prevMajors => [...prevMajors, major]);
      setInput('');
    }
  };

  const handleMajorRemove = major => {
    setMajors(prevMajors => prevMajors.filter(m => m !== major));
  };

  const handleSubmit = async () => {
    try {
      const response = await AuthAxios.patch('/members', {
        nickname: nickname,
        university: university,
        majors: majors.join(','), // 배열을 콤마로 구분된 문자열로 변환
      });

      if (response.status === 200) {
        alert('업데이트 완료되었습니다.');
        navigate('/myinfo');
      }
    } catch (error) {
      console.error('Error updating information:', error);
      alert('오류가 있었습니다. 마이페이지로 돌아갑니다.');
      navigate('/myinfo');
    }
  };

  return (
    <div>
      <h2>관심 전공 선택</h2>
      <input
        type="text"
        value={input}
        onChange={e => {
          setInput(e.target.value);
          searchMajor(e.target.value);
        }}
      />
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {majorsList.map((major, index) => (
          <div key={index} onClick={() => handleMajorSelect(major)}>
            {major}
          </div>
        ))}
      </div>
      <div>
        {majors.map((major, index) => (
          <button key={index} onClick={() => handleMajorRemove(major)}>
            {major} ✕
          </button>
        ))}
      </div>
      <button onClick={handleSubmit}>완료</button>
    </div>
  );
}

export default UpdateMajors;
