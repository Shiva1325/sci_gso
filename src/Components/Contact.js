import { useState } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import '../Styles/contact.css';
import ReCAPTCHA from 'react-google-recaptcha';
import useRecaptcha from '../Hooks/Recaptcha';
import Transition from './Transition';
const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();
  const recaptcha_sitekey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });
  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });

    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };
  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
        if(capchaToken){
            setDisabled(true);
      
            const templateParams = {
                name,
                email,
                subject,
                message
            };
            await emailjs.send(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                templateParams,
                process.env.REACT_APP_EMAILJS_USER_ID
            );
            toggleAlert('Thank you for connecting with us. Your request has been recieved.', 'success');
        }
        } catch (e) {
            console.error(e);
            toggleAlert('Please fill in all fields and complete the captcha.', 'danger');
          } finally {
            recaptchaRef.current?.reset();
            setDisabled(false);
            reset();
          }
  };

  return (
    <div className='ContactForm'>
      <div className='contact-container'>
        <div className='row'>
          <div className='FormDiv'>
            <div>
                <u><h1>Get in Touch</h1></u>
            </div>
            <div className='contactForm'>
              <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='name'
                      {...register('name', {
                        required: { value: true, message: 'Please enter your name' },
                        maxLength: {
                          value: 30,
                          message: 'Please use 30 characters or less'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Name'
                    ></input>
                    {errors.name && <span className='errorMessage'>{errors.name.message}</span>}
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      name='email'
                      {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                      })}
                      className='form-control formInput'
                      placeholder='Email address'
                    ></input>
                    {errors.email && (
                      <span className='errorMessage'>Please enter a valid email address</span>
                    )}
                  </div>
                </div>
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      name='subject'
                      {...register('subject', {
                        required: { value: true, message: 'Please enter a subject' },
                        maxLength: {
                          value: 75,
                          message: 'Subject cannot exceed 75 characters'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Subject'
                    ></input>
                    {errors.subject && (
                      <span className='errorMessage'>{errors.subject.message}</span>
                    )}
                  </div>
                </div>
                <div className='row formRow'>
                  <div className='col-textarea'>
                    <textarea
                      rows={3}
                      name='message'
                      {...register('message', {
                        required: true
                      })}
                      className='form-control formInput'
                      placeholder= "Whats's on your mind? questions, concerns, suggestions -> put 'em here" 
                    ></textarea>
                    {errors.message && <span className='errorMessage'>Please enter a message</span>}
                  </div>
                </div>
                <div className='col-12 recaptchaDiv'>
                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={recaptcha_sitekey}
                        onChange={handleRecaptcha}
                        
                    />
                </div>
                <button disabled={!capchaToken} className='submit-btn' type='submit'>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
        {alertInfo.display && (
          <div
            className={`alert alert-${alertInfo.type} alert-dismissible mt-5`}
            role='alert'
          >
            {alertInfo.message}
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='alert'
              aria-label='Close'
              onClick={() =>
                setAlertInfo({ display: false, message: '', type: '' })
              }
            ></button>
          </div>
        )}
    </div>
  );
};

export default Transition(Contact);