import { getSession } from "next-auth/react";
import {
  connectToDatabase,
  closeDatabaseConnection,
} from "../../../lib/dbhelper";

import { User } from "../../../lib/schema/User";

const handler = async (req, res) => {
  if (req.method !== "POST") return;
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({
      message: "Not authenticated!",
    });
    return;
  }
  const listId = req.body;

  await connectToDatabase();

  const [user] = await User.find({ email: session.user.email });

  const updatedLists = user.lists.filter(
    (list) => list._id.toString() !== listId
  );

  user.lists = updatedLists;

  try {
    const result = await user.save();
    res
      .status(201)
      .json({ message: "List successfully deleted!", data: result });
    closeDatabaseConnection();
    return;
  } catch (error) {
    console.log("ERROR", error);
    res.status(422).json({
      message: "List deletion failed!",
      debugInfo: error,
    });
  }
  closeDatabaseConnection();
};

export default handler;
