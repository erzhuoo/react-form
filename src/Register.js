import React, { useState, useEffect } from 'react';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      // 模拟提交成功
      setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
    }
  }, [isSubmitted]);

  const validateUsername = () => {
    if (!username.trim()) {
      return '请输入用户名';
    } else if (username.length < 6) {
      return '用户名长度不能少于6个字符';
    }
    return '';
  };

  const validateEmail = () => {
    if (!email.trim()) {
      return '请输入邮箱地址';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return '请输入有效的邮箱地址';
    }
    return '';
  };

  const validatePassword = () => {
    if (!password.trim()) {
      return '请输入密码';
    }
    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (password.length < 8 || !passwordRegex.test(password)) {
      return '密码必须包含数字、字母和特殊字符，且长度至少为8';
    }
    return '';
  };

  const validateConfirmPassword = () => {
    if (!confirmPassword.trim()) {
      return '请输入确认密码';
    } else if (confirmPassword !== password) {
      return '两次输入的密码不一致';
    }
    return '';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch(name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      default:
        return;
    }
    validateFields(name, value);
  };

  const validateFields = (fieldName, fieldValue) => {
    let newErrors = { ...errors };
    switch(fieldName) {
      case 'username':
        newErrors.username = validateUsername();
        break;
      case 'email':
        newErrors.email = validateEmail();
        break;
      case 'password':
        newErrors.password = validatePassword();
        break;
      case 'confirmPassword':
        newErrors.confirmPassword = validateConfirmPassword();
        break;
    }
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      username: validateUsername(),
      email: validateEmail(),
      password: validatePassword(),
      confirmPassword: validateConfirmPassword(),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) return;

    // 模拟提交
    setIsSubmitted(true);
  };

  return (
      <div className="register-container">
        {isSubmitted && (
            <div className="success-message">
              注册成功！请稍后跳转到登录页面。
            </div>
        )}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label>用户名</label>
            <input
                type="text"
                name="username"
                value={username}
                onChange={handleInputChange}
                placeholder="请输入用户名（至少6位）"
            />
            {errors.username && (
                <div className="error-message">{errors.username}</div>
            )}
          </div>

          <div className="input-group">
            <label>邮箱</label>
            <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="请输入邮箱地址"
            />
            {errors.email && (
                <div className="error-message">{errors.email}</div>
            )}
          </div>

          <div className="input-group">
            <label>密码</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                placeholder="请输入密码（至少8位，包含数字、字母和特殊字符）"
            />
            {errors.password && (
                <div className="error-message">{errors.password}</div>
            )}
          </div>

          <div className="input-group">
            <label>确认密码</label>
            <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                placeholder="请再次输入密码"
            />
            {errors.confirmPassword && (
                <div className="error-message">{errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="submit-button">
            立即注册
          </button>
        </form>
      </div>
  );
}

export default Register;
