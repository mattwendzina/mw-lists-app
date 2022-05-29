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

  const lists = await getData(session)

  if (lists.length > 0) {
    res.status(201).json({ data: lists });
    closeDatabaseConnection();
    return;
  }

  res.status(200).json({ data: "No Lists Found" });
  closeDatabaseConnection();
};

export const getData = async (session) => {
  await connectToDatabase();

  let user
  try {
    user = await User.find({ email: session.user.email })
  } catch (e) {
    return "No Lists Found"
  }

  return user[0].lists;
}

export default handler;
