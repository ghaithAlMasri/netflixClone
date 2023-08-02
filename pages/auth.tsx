import Image from 'next/image'
import Input from '@/components/Input'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
const Auth = () => {
    const router = useRouter();
    const [errMsg,setErrMsg] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')


    const [variant, setVariant] = useState('login')

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => {
            setErrMsg('')
            return currentVariant === 'login' ? 'register' : 'login';
        })
    }, [])

    const login = useCallback(async () =>{
        try{
        const resp = await signIn('credentials', {
            email:email,
            password:password,
            redirect: false,
            callbackUrl: '/'
          });

        
        if (resp?.status == 200)
            router.push('/')
        else setErrMsg(resp?.error || '')

        


        }catch(error){
            console.log(error);
        }

    },[email,password,router])

    const register = useCallback(async ()=>{
        let response
        try{
            const resp = await axios.post('/api/register',{
                name,
                lastName,
                email,
                password,
            })
            login()
        }catch(error){
            setErrMsg(error?.response?.data?.error || '')
        }
    },[email,name,lastName,password,login])


    return (
        <div className="relative h-full bg-no-repeat bg-center bg-cover w-full bg-[url('/images/hero.jpg')]">
            <div className="bg-black w-full h-full lg:bg-opacity-50 bg-opacity-25">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" alt="logo" height={48} width={200} className='object-contain' />
                </nav>


                <div className='flex justify-center'>
                    <div className='bg-black bg-opacity-70 px-16 py-16 self-center -mt-20 lg:-mt-14 lg:w-3/5 lg:max-w-md rounded-lg w-11/12'>
                        <h2 className='text-white text-4xl mb-8 font-semibold'>

                            {variant === 'login' ? 'Sign in' : 'Create account'}
                        </h2>

                        <div className='flex flex-col gap-4'>
                            {variant !== 'login' && (
                                <Input
                                    id='name'
                                    value={name}
                                    label='First Name'
                                    onChange={(e: any) => {
                                        setName(e.target.value)
                                    }}
                                    type='text'/>
                            )}

                            {variant !== 'login' && (
                                <Input
                                    id='lastName'
                                    value={lastName}
                                    label='Last Name'
                                    onChange={(e: any) => {
                                        setLastName(e.target.value)
                                    }}
                                    type='text' />
                            )}





                            <Input
                                id='email'
                                value={email}
                                label='Email'
                                onChange={(e: any) => {
                                    setEmail(e.target.value)
                                }}
                                type='email' />


                            <Input
                                id='password'
                                value={password}
                                label='Password'
                                onChange={(e: any) => {
                                    setPassword(e.target.value)
                                }}
                                type='password' />

                        </div>
                        <div className='flex justify-center text-center text-red-700 mt-4'>
                            <span>{errMsg}</span>
                        </div>

                        <button className='
                        bg-purple-700
                        py-3
                        text-white
                        rounded-md
                        w-full
                        mt-3
                        hover:bg-purple-900
                        transition
                        duration-300
                        font-semibold
                        '
                        onClick={variant === 'login' ? login : register}>
                            {variant === 'login' ?
                                'Login' : 'Sign up'}
                        </button>

                        {variant === 'login' ?

                            <p className='text-neutral-500 mt-12'>
                                First time using Movflex?

                                <span className='text-white ml-2 
                            hover:underline cursor-pointer 
                            font-semibold'
                                    onClick={toggleVariant}>
                                    Create account
                                </span>
                            </p>
                            :
                            <p className='text-neutral-500 mt-12'>
                                Already have an account?

                                <span className='text-white ml-2 
                                hover:underline cursor-pointer 
                                font-semibold'
                                    onClick={toggleVariant}>
                                    Sign in
                                </span>
                            </p>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
