import "./SignupPage.css";
import user from "../../assets/user.webp";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signup } from "../../services/userService";

const schema = z.object({
    name: z.string().min(3),
    email: z.string().email().min(3),
    password: z.string().min(8),
    confirmPassword: z.string(),
    address: z.string().min(16)
}).refine(data => data.password === data.confirmPassword,
    {
        message: "Confirmed Password does not match with Password",
        path: ["confirmPassword"]
    }
)


const SignupPage = () => {
    const [profilePic, setProfilePic]= useState(null);
    const {register, handleSubmit, formState:{errors}} = useForm({resolver: zodResolver(schema)});
    const [formError, setFormError] = useState("");
    let navigate = useNavigate();

    const onSubmitData = async (formData) => {
        try {
            await signup(formData, profilePic);
            window.location = "/";

        } catch (err) {
            if(err.response && err.response.status === 400){
                setFormError(err.response.data.message)
            }
        }
    }

    return (
        <section className='align_center form_page'>
            <form className='authentication_form signup_form' onSubmit={handleSubmit(onSubmitData) }>
                <h2>SignUp Form</h2>

                <div className='image_input_section'>
                    <div className='image_preview'>
                        <img src={profilePic ? URL.createObjectURL(profilePic) : user} id='file-ip-1-preview' />
                    </div>
                    <label htmlFor='file-ip-1' className='image_label'>
                        Upload Image
                    </label>
                    <input 
                    onChange={e => setProfilePic(e.target.files[0])} 
                    type='file' id='file-ip-1' className='image_input' />
                </div>

                {/* Form Inputs */}
                <div className='form_inputs signup_form_input'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            autoComplete="off" 
                            id='name'
                            className='form_text_input'
                            type='text'
                            placeholder='Enter your name'
                            {...register("name")}
                        />
                        {errors.name && <em className="form_error">{errors.name.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            autoComplete="off"
                            id='email'
                            className='form_text_input'
                            type='email'
                            placeholder='Enter your email address'
                            {...register("email")}
                        />
                        {errors.email && <em className="form_error">{errors.email.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter your password'
                            {...register("password")}
                        />
                        {errors.password && <em className="form_error">{errors.password.message}</em>}
                    </div>

                    <div>
                        <label htmlFor='cpassword'>Confirm Password</label>
                        <input
                            id='cpassword'
                            className='form_text_input'
                            type='password'
                            placeholder='Enter confirm password'
                            {...register("confirmPassword")}
                        />
                        {errors.confirmPassword && <em className="form_error">{errors.confirmPassword.message}</em>}
                    </div>

                    <div className='signup_textares_section'>
                        <label htmlFor='address'>Delivery Address</label>
                        <textarea
                            autoComplete="off"
                            id='address'
                            className='input_textarea'
                            placeholder='Enter delivery address'
                            {...register("address")}
                        />
                        {errors.address && <em className="form_error">{errors.address.message}</em>}
                    </div>
                </div>
                {formError && <em className="form_error">{formError}</em>}

                <button className='search_button form_submit' type='submit'>
                    Submit
                </button>
            </form>
        </section>
    );
};

export default SignupPage;