import { getSession } from "next-auth/react";
import {
  connectToDatabase,
  closeDatabaseConnection,
} from "../../../lib/dbhelper";

import { User } from "../../../lib/schema/User";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    return;
  }

  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({
      message: "Not authenticated!",
    });
    closeDatabaseConnection();
    return;
  }

  await connectToDatabase();

  const [user] = await User.find({ email: session.user.email });

  const lists = user.lists;

  if (lists.length > 0) {
    res.status(201).json({ data: lists });
    closeDatabaseConnection();
    return;
  }

  res.status(200).json({ data: "No Lists Found" });
  closeDatabaseConnection();
};

export default handler;
