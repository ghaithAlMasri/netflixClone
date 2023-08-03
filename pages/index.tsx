import { NextPageContext } from 'next'
import {signOut, getSession} from 'next-auth/react'

export async function getServerSideProps(context:NextPageContext){

  const session = await getSession(context)

  if(!session){
    return{
      redirect:{
        destination: '/auth',
        permanent: false
      }

    }
  }

  return{
    props: {}
  }
  
}

export default function Home() {
  return (
   <>
   <h1 className="text-2xl text-red-500">NETFLIX CLONE</h1>

   <button onClick={()=>{signOut()}} className='h-10  mt-20 w-full bg-white'>Logout</button>
   </>
  )
}
