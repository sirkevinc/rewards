import { useAuth } from '../../lib/auth.js'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import styles from '../../styles/Component.module.css'

const SignUp = (props) => {
    const { register, handleSubmit, formState: { errors }} = useForm();
    const router = useRouter();
    
    const { signUp } = useAuth();

    const onSubmit = async (data) => {
        try {
            const result = await signUp(data);
            if (result.graphQLErrors) {
                props.errorHandler(result.graphQLErrors[0])
            } else {
                router.push('/dashboard')
            }
        } catch(err) {
            console.error(err);
        }
    }
  
    return (
        <form className={styles.register__container} onSubmit={handleSubmit(onSubmit)}>
            <input 
                placeholder='User Name'
                {...register('username', { 
                    required: 'User name is required', 
                    maxLength: {
                        value: 15,
                        message: 'Must be between 3 and 15 characters'
                    }, 
                    minLength: {
                        value: 3,
                        message: 'Must be between 3 and 15 characters'
                    }
                })} 
            />
            <p>{errors.username?.message}</p>
            {/* {errors.username?.type === 'required' && 'Username is required'}
            {errors.username?.type === 'maxLength' || errors.username?.type === 'minLength' && 'Must be between 3 and 15 characters'} */}
            <input
                placeholder='Email Address'
                {...register('email', { 
                    required: 'Email address required',
                    pattern: {
                        value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: 'Please enter a valid email',
                    },
                })} 
            />
            <p>{errors.email?.message}</p>
            <input 
                placeholder='Password' 
                type='password' 
                {...register('password', { 
                    required: 'Password is required', 
                    maxLength: {
                        value: 20,
                        message: 'Must be between 6 and 20 characters'
                    }, 
                    minLength: {
                        value: 6,
                        message: 'Must be between 6 and 20 characters'
                    }
                })} 
            />
            <p>{errors.username?.password}</p>
            {/* {errors.password?.type === 'required' && 'Password is required'}
            {errors.password?.type === 'maxLength' || errors.password?.type === 'minLength' && 'Must be between 6 and 30 characters'} */}
            <input type='submit' value='Register' />
        </form>
    )
  }

  export default SignUp;