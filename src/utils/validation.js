export const validateUsername = username => {
  // 이메일 형식을 검증하는 정규표현식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const usernameRegex = /^[a-zA-Z0-9.@]*$/;
  if (!username) {
    return '아이디는 비어서는 안됩니다.';
  }
  if (username.length < 3 || username.length > 50) {
    return '아이디는 3글자 이상 50글자 미만이어야 합니다.';
  }
  if (!usernameRegex.test(username)) {
    return '아이디에는 이메일 형식과 영문자로만 구성되어야 합니다.';
  }
  if (!emailRegex.test(username)) {
    return '올바른 이메일 형식이 아닙니다.';
  }
  return null;
};

export const validatePassword = password => {
  const passwordRegex = /^[a-zA-Z0-9@#$%^&+=]*$/;
  if (!password) {
    return '비밀번호는 비어서는 안됩니다.';
  }
  if (password.length < 8 || password.length > 100) {
    return '비밀번호는 8글자 이상이어야 하고 100글자를 넘겨서는 안됩니다.';
  }
  if (!passwordRegex.test(password)) {
    return "비밀번호는 영문자와 '@','#','$','%','^','&','+','=' 로 구성되어야 합니다.";
  }
  return null;
};
