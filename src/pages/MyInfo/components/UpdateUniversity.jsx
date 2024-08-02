import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthAxios from '../../../global/interceptor/AuthAxios.jsx';
import { UpdateContext } from '../context/UpdateContext.jsx';

function UpdateUniversity() {
  const { university, setUniversity } = useContext(UpdateContext);
  const [input, setInput] = useState(university);
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const navigate = useNavigate();

  const searchUniversity = async query => {
    try {
      const response = await AuthAxios.get('/members/universities', {
        params: { unvToSearch: query },
      });

      // 응답 데이터가 배열인지 확인하고, 배열이 아니면 빈 배열로 초기화
      if (Array.isArray(response.data.result)) {
        setUniversities(response.data.result);
      } else {
        setUniversities([]);
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching universities:', error);
      setUniversities([]); // 오류가 발생한 경우에도 빈 배열로 초기화
    }
  };

  const handleUniversitySelect = unv => {
    if (window.confirm(`${unv}으로 선택하시겠습니까?`)) {
      setSelectedUniversity(unv);
      setInput(unv);
    }
  };

  const handleNext = () => {
    if (selectedUniversity) {
      setUniversity(selectedUniversity);
      navigate('/updateform/majors');
    } else {
      alert('대학교를 선택하세요.');
    }
  };

  return (
    <div>
      <h2>대학교 설정</h2>
      <input
        type="text"
        value={input}
        onChange={e => {
          setInput(e.target.value);
          searchUniversity(e.target.value);
        }}
        disabled={selectedUniversity !== null}
      />
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {universities.map((unv, index) => (
          <div key={index} onClick={() => handleUniversitySelect(unv)}>
            {unv}
          </div>
        ))}
      </div>
      <button onClick={handleNext}>다음</button>
    </div>
  );
}

export default UpdateUniversity;
