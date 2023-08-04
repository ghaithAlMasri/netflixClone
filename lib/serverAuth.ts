import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import {signOut} from 'next-auth/react'

import prismadb from '@/lib/prismadb';


const serverAuth = async (req: NextApiRequest, res:NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) {
    res.status(405).json({error:'User not in session. Please login again.'})
    signOut()
    throw new Error('Not signed in');
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },

  });

  
  
  if (!currentUser) {
    res.status(305).json({error:'Not signed in.'})
    throw new Error('Not signed in');
  }

  return { currentUser };
}

export default serverAuth;