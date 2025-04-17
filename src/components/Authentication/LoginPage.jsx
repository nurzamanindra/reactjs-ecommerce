import React, {useState} from 'react'
import { useLocation, Navigate } from 'react-router-dom'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import './LoginPage.css'
import { login } from '../../services/userService'
import { getUser } from '../../services/userService'

const schema = z.object({
  email: z.string().email({message: "custom message email invalid"}).min(3),
  password: z.string().min(8, {message: "custom message password less dan 8"})
});

const LoginPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(schema)});
  const [formError, setFormError] = useState("");
  
  const location = useLocation();

  const onSubmitForm = async (formData) => {
    try {
      await login(formData);

      const {state} = location;
      window.location = state ? state.from : "/";

    } catch (err) {
      if(err.response && err.response.status === 400){
        setFormError(err.response.data.message);
      } else {
        setFormError(`Unable to connect to backend : ${err.message}`);
      }
    }
  };

  //if user already loged in and try to access this page /login
  //redirect to HomePage "/"
  if(getUser()) {
    return <Navigate to="/"/>
  }

  return (
    <section className='align_center form_page'>
      <form action="" className="authentication_form" onSubmit={handleSubmit(onSubmitForm)}>
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input {...register("email")} autoComplete="off" 
            type="text" id="email" className='form_text_input' placeholder='Enter Your Email Address..'/>
            {errors.email && <em className='form_error'>{errors.email.message}</em>}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input {...register("password")} autoComplete="off" 
            type="password" id="password" className='form_text_input' placeholder='Enter Your Password..'/>
            {errors.password && <em className='form_error'>{errors.password.message}</em>}

          </div>
          {formError && <em className='form_error'>{formError}</em>}
          <button type='submit' className="search_button form_submit">Submit</button>
        </div>
      </form>
    </section>
  )
}

export default LoginPage