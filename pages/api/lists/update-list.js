import { getSession } from "next-auth/react";
import {
  connectToDatabase,
  closeDatabaseConnection,
} from "../../../lib/dbhelper";

import { User } from "../../../lib/schema/User";

const handler = async (req, res) => {
  const session = await getSession({ req: req });
  const data = req.body;
  console.log("DATA", data);
  if (!session) {
    res.status(401).json({
      message: "Not authenticated!",
    });
    return;
  }

  await connectToDatabase();

  const [user] = await User.find({ email: session.user.email });

  const [listToUpdate] = user.lists.filter(
    (list) => list._id.toString() === data.selectedList._id
  );

  listToUpdate.items = data.listItems;

  user.lists = user.lists.map((list) => {
    if (list._id.toString() === listToUpdate._id.toString()) {
      return listToUpdate;
    }
    return list;
  });

  try {
    const result = await user.save();
    res.status(201).json({ message: "List updated!", data: result });
    closeDatabaseConnection();
    return;
  } catch (error) {
    console.log("ERROR", error);
    res.status(422).json({
      message: "List not updated",
      debugInfo: error,
    });
  }
  closeDatabaseConnection();
  return;
};

export default handler;
