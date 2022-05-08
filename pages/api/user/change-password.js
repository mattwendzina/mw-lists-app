import { getSession } from "next-auth/react";
import {
  connectToDatabase,
  closeDatabaseConnection,
} from "../../../lib/dbhelper";

import { hashPassword, verifyPassword } from "../../../lib/auth";
import { User } from "../../../lib/schema/User";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  // Check that the request is coming from an authenticated user
  if (!session) {
    res.status(401).json({
      message: "Not authenticated!",
    });
    return;
  }

  const { oldPassword, newPassword, email } = req.body;

  await connectToDatabase();

  const [user] = await User.find({ email: email });

  if (!user) {
    closeDatabaseConnection();
    res.status(404).json({ message: "User not found!" });
  }

  const isValid = await verifyPassword(oldPassword, user.password);

  if (!isValid) {
    closeDatabaseConnection();
    res.status(422).json({ message: "Old password is invalid" });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  user.password = hashedPassword;

  const result = await user.save();
  res
    .status(200)
    .json({ result: result, message: "Password successfully updated!" });
  closeDatabaseConnection();
  return;
};

export default handler;
