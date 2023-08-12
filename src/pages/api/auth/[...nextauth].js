import NextAuth from "next-auth/next";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";


const GOOGLE_CLIENT_ID = '808085950367-b0ifh763q5luresslckta785q6nv9mqq.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'


export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                try {
                    const { email, name, image } = user;

                    const res = await axios.post(`${process.env.NEXT_PUBLIC_PRODUCTION}/api/user`, { email, name, image });

                    if (res.data) {
                        return true
                    }

                } catch (error) {

                    console.log(error.message);
                    return response.status(500).json({ error: 'An error occurred' });

                }
            }
        },

        async jwt({ token, trigger, session, user }) {
            if (trigger === "update") {
                return { ...token, ...session.user }
            }
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token;
            return session
        }
    }
})