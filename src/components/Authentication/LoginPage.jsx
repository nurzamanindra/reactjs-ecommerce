import React, {useState} from 'react'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import './LoginPage.css'
import { login } from '../../services/userService'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email({message: "custom message email invalid"}).min(3),
  password: z.string().min(8, {message: "custom message password less dan 8"})
});

const LoginPage = () => {

  const {register, handleSubmit, formState: {errors}} = useForm({resolver: zodResolver(schema)});
  const [formError, setFormError] = useState("");

  let navigate = useNavigate();

  const onSubmitForm = async (formData) => {
    try {
      await login(formData);
      window.location = "/";

    } catch (err) {
      if(err.response && err.response.status === 400){
        setFormError(err.response.data.message)
      }
    }
  };

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