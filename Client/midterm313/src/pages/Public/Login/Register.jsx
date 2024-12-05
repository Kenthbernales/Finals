import { useState, useRef, useCallback, useEffect } from 'react';
import './Register.css';
import { useNavigate, Link } from 'react-router-dom';
import { useDebounce } from '../../../utils/hooks/useDebounce';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    middleName: '',
    contactNo: '',
    role: 'admin', // Default role
  });

  const [status, setStatus] = useState('idle');
  const [isFieldsDirty, setIsFieldsDirty] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const contactNoRef = useRef();
  const userInputDebounce = useDebounce(formData, 2000);
  const [debounceState, setDebounceState] = useState(false);

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setDebounceState(false);
    setIsFieldsDirty(true);
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.email && formData.password && formData.firstName && formData.lastName && formData.contactNo) {
      setStatus('loading');
      try {
        await axios.post('/admin/register', formData, {
          headers: { 'Content-Type': 'application/json' },
        });
        setStatus('success');
        alert('User registered successfully');
        navigate('/main/movies');
      } catch (error) {
        console.log(error);
        setStatus('error');
        alert('Failed to register');
      }
    } else {
      setIsFieldsDirty(true);
      alert('All fields are required!');
    }
  };

  useEffect(() => {
    setDebounceState(true);
  }, [userInputDebounce]);

  return (
    <div className='Register'>
      <div className='main-container'>
        <h3>Register</h3>
        <form>
          <div className='form-container'>
            <div className='form-group'>
              <label>Email:</label>
              <input
                type='email'
                name='email'
                ref={emailRef}
                value={formData.email}
                onChange={handleOnChange}
                required
              />
              {debounceState && isFieldsDirty && formData.email === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Password:</label>
              <input
                type='password'
                name='password'
                ref={passwordRef}
                value={formData.password}
                onChange={handleOnChange}
                required
              />
              {debounceState && isFieldsDirty && formData.password === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Confirm Password:</label>
              <input
                type='password'
                name='confirmPassword'
                ref={confirmPasswordRef}
                value={formData.confirmPassword}
                onChange={handleOnChange}
                required
              />
              {debounceState && isFieldsDirty && formData.confirmPassword === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>First Name:</label>
              <input
                type='text'
                name='firstName'
                ref={firstNameRef}
                value={formData.firstName}
                onChange={handleOnChange}
                required
              />
              {debounceState && isFieldsDirty && formData.firstName === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Last Name:</label>
              <input
                type='text'
                name='lastName'
                ref={lastNameRef}
                value={formData.lastName}
                onChange={handleOnChange}
                required
              />
              {debounceState && isFieldsDirty && formData.lastName === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='form-group'>
              <label>Middle Name:</label>
              <input
                type='text'
                name='middleName'
                value={formData.middleName}
                onChange={handleOnChange}
              />
            </div>
            <div className='form-group'>
              <label>Contact No:</label>
              <input
                type='text'
                name='contactNo'
                ref={contactNoRef}
                value={formData.contactNo}
                onChange={handleOnChange}
                required
              />
              {debounceState && isFieldsDirty && formData.contactNo === '' && (
                <span className='errors'>This field is required</span>
              )}
            </div>
            <div className='submit-container'>
              <button
                type='button'
                onClick={handleRegister}
                disabled={status === 'loading'}
              >
                {status === 'idle' ? 'Register' : 'Loading...'}
              </button>
            </div>          
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
