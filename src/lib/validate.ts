export function validateEmailAndPassword(email, password) {
  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password validation regex
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isEmailValid = emailRegex.test(email);
  const isPasswordValid = passwordRegex.test(password);

  return {
    isEmailValid,
    isPasswordValid,
    isValid: isEmailValid && isPasswordValid,
  };
}
