import Image from 'next/image'
import Input from '@/components/input'
import { useCallback, useState } from 'react'
import { log } from 'console'

const Auth = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')


    const [variant, setVariant] = useState('login')

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => {
            return currentVariant === 'login' ? 'register' : 'login';
        })


    

    }, [])
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
                        <button className='
                        bg-purple-700
                        py-3
                        text-white
                        rounded-md
                        w-full
                        mt-10
                        hover:bg-purple-900
                        transition
                        duration-300
                        font-semibold
                        '>
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
