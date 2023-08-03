import Image from 'next/image'
import Input from '@/components/Input'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import spinner from '@/public/images/Spinner-0.6s-94px.svg'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [errMsg, setErrMsg] = useState('')
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

    const login = useCallback(async () => {
        setErrMsg('')
        setIsLoading(true)
        try {
            setIsLoading(true)
            const resp = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false,
                callbackUrl: '/'
            });


            setIsLoading(false)

            
            if (resp?.status == 200)
                router.push('/')
            else setErrMsg(resp?.error || '')

            setIsLoading(false)



        } catch (error) {
            setIsLoading(false)
        }

    }, [email, password, router])

    const register = useCallback(async () => {
        setErrMsg('')
        setIsLoading(true)
        try {
            const resp = await axios.post('/api/register', {
                name,
                lastName,
                email,
                password,
            })
            setIsLoading(false)

            login()
        } catch (error:any) {
            (email === '' || password === '') ? setErrMsg('Please enter desired Email and Password.') :
                setErrMsg(error?.response?.data?.error || '')
            setIsLoading(false)
        }
    }, [email, name, lastName, password, login])


    return (
        <div className="relative h-full bg-no-repeat bg-center bg-cover w-full bg-[url('/images/hero.jpg')] overflow-hidden">
            <div className="bg-black w-full h-full lg:bg-opacity-50 bg-opacity-25">
                <nav className="px-12 py-5">
                    <Image src="/images/logo.png" alt="logo" height={48} width={200} className='object-contain' />
                </nav>


                <div className='flex justify-center'>
                    <div className='bg-black bg-opacity-70 px-16 -mt-20 py-8 self-center overflow-hidden lg:w-3/5 lg:max-w-md rounded-lg w-11/12'>


                        <h2 className='text-white text-4xl mb-8 font-semibold'>

                            {variant === 'login' ? 'Sign in' : 'Create account'}
                        </h2>

                        <div className='flex flex-col gap-4'>
                            {variant !== 'login' && (
                                <Input
                                    id='name'
                                    value={name}
                                    label='Name'
                                    onChange={(e: any) => {
                                        setName(e.target.value)
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
                            {(isLoading && errMsg === '') && (
                                <Image src={spinner} width={60} height={60} alt='load' />
                            )}
                        </div>

                        <div className='flex justify-center items-center gap-10 h-10 my-3'>

                            <div onClick={()=>{
                                setIsLoading(true)
                                signIn('github',{callbackUrl:'/'})
                                setIsLoading(false)
                            
                            }}
                            className='flex justify-center text-center cursor-pointer hover:opacity-50 transition duration-300
                            items-center bg-white rounded-full w-10 h-10 text-3xl'>
                                <FaGithub />
                            </div>

                            <div 
                            onClick={()=>{
                                setIsLoading(true)
                                signIn('google',{callbackUrl:'/'})
                                setIsLoading(false)
                            }}

                            className='flex justify-center text-center 
                            items-center bg-white rounded-full w-10 h-10 text-3xl cursor-pointer  hover:opacity-50 transition duration-300'>
                                <FcGoogle />
                            </div>
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
