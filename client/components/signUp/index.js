import { useState } from 'react'
import { useAuth } from '../../lib/auth.js'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

const SignUp = (props) => {
    const { register, handleSubmit, formState: { errors}} = useForm();
    // const onSubmit = data => console.log(data);
    // const onError = (errors, e) => console.log(errors, e)
    const router = useRouter();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    
    const { signUp } = useAuth();

    const onSubmit = async (data) => {
        try {
            const result = await signUp(data);
            if (result.graphQLErrors) {
                console.log(result.graphQLErrors);
            } else {
                router.push('/dashboard')
            }
        } catch(err) {
            console.error(err);
        }
    }
  
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username", { required: 'Required', maxLength: 15, minLength: { value: 3, message: 'Must be between 3 and 15 characters' }})} placeholder="User Name" />
            {errors.username?.type === 'required' && "Username is required"}
            <input {...register("email", { required: true })} placeholder="Email Address" />
            <input {...register("password", { required: true, maxLength: 20, minLength: 6 })} placeholder="Password" type="password" />

            <input type="submit" />
        </form>
    )
  }

  export default SignUp;