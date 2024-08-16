export const validateUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9.@]*$/;
    if (!username) {
      return "Username cannot be null";
    } else if (username.length < 3 || username.length > 50) {
      return "Username must be between 3 and 50 characters";
    } else if (!usernameRegex.test(username)) {
      return "Username can only contain alphanumeric characters";
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      return "Invalid email format";
    }
    return null;
  };
  
  export const validatePassword = (password) => {
    const passwordRegex = /^[a-zA-Z0-9@#$%^&+=]*$/;
    if (!password) {
      return "Password cannot be null";
    } else if (password.length < 8 || password.length > 100) {
      return "Password must be between 8 and 100 characters";
    } else if (!passwordRegex.test(password)) {
      return "Password can only contain alphanumeric characters and '@','#','$','%','^','&','+','='";
    }
    return null;
  };