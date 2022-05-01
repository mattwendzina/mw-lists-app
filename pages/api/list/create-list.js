import { getSession } from 'next-auth/react'
import { connectToDatabase, closeDatabaseConnection } from "../../../lib/dbhelper"

import { List } from "../../../lib/schema/List"
import { User } from "../../../lib/schema/User"


const handler = async (req, res) => {
    const data = req.body
    if (req.method !== "POST") {
        return
    }

    const session = await getSession({ req: req })

    if (!session) {
        res.status(401).json({
            message: "Not authenticated!"
        })
        return
    }

    await connectToDatabase()

    const [user] = await User.find({ email: session.user.email })

    const listAlreadyExists = user.lists.some(i => i.title === data.listTitle)

    if (listAlreadyExists) {
        console.log("existingList", listAlreadyExists)
        res.status(422).json({
            message: "List name already exists"
        })
        return
    }

    user.lists = [...user.lists, {
        title: data.listTitle,
        titleLower: data.titleLower,
        items: data.listItems
    }]

    try {
        const result = await user.save()
        res.status(201).json({ message: "New list created", data: result })
        closeDatabaseConnection()
        return
    } catch (error) {
        console.log("ERROR", error)
        res.status(422).json({
            message: "List not created",
            debugInfo: error
        })
    }
    closeDatabaseConnection()
    return
}

export default handler