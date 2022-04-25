import { connectToDatabase, closeDatabaseConnection } from "../../../lib/dbhelper"
import { hashPassword } from "../../../lib/auth"
import { User } from "../../../lib/schema/User"

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return
    }
    const data = JSON.parse(req.body)

    const { username, email, password } = data

    await connectToDatabase()

    const existingUsername = await User.find({ username: username })
    const existingEmail = await User.find({ email: email })

    if (existingUsername.length > 0 || existingEmail.length > 0) {
        res.status(422).json({ message: "Username or email already exists" })
        closeDatabaseConnection()
        return
    }

    const hashedPassword = await hashPassword(password)

    try {
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        })
        res.status(201).json({ message: "User Created!", data: newUser })
        closeDatabaseConnection()
        return
    } catch (error) {
        console.error("Error", error)
        res.status(400).json({
            message: 'User not saved!',
            debugInfo: error
        })
    }
    closeDatabaseConnection()
}

export default handler