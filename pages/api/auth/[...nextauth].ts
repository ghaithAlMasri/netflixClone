import NextAuth, { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb';
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'


export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),

    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID || '',
      clientSecret:process.env.GOOGLE_CLIENT_SECRET || ''
    }),

    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'passord'
        }
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const user = await prismadb.user.findUnique({ where: {
          email: credentials.email
        }});

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist. Please create an account using this Email to login.');
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('Incorrect Email or Password.');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  adapter: PrismaAdapter(prismadb),
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
