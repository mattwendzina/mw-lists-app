import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { closeDatabaseConnection, connectToDatabase } from "../../../lib/dbhelper";
import { User } from "../../../lib/schema/User"

export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [CredentialsProvider({
        async authorize(credentials, req) {
            await connectToDatabase()

            const [user] = await User.find({ username: credentials.username })

            if (!user) {
                closeDatabaseConnection()
                throw new Error("User not found!")
            }

            const isValid = await verifyPassword(credentials.password, user.password)

            if (!isValid) {
                closeDatabaseConnection()
                throw new Error("Password is incorrect, please try again")
            }

            closeDatabaseConnection()

            return {
                email: user.email,
            }
        }
    })]
})