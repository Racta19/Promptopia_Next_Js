import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectDatabase } from "@utils/database";

import User from "@models/user";

const handler = NextAuth ({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session}){
            const sessionUser = await User.findOne({email: session.User.email});
            session.User.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }){
            try {  
                await connectDatabase();
                //Checkk if User already exists
                const userExist = await User.findOne({email: profile.email});
                if(!userExist){
                    await User.create({
                        email: profile.email,
                        name: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.image
                    })
                }
    
            } catch (error) {
                
            }
        }
    }
})

export { handler as GET, handler as POST };