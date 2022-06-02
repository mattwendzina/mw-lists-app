import { getSession } from "next-auth/react";
import { motion } from "framer-motion";
import ChangePasswordForm from "../components/Forms/ChangePasswordForm/ChangePasswordForm";

const Profile = (props) => {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-4xl p-4">Update Password</h1>
      <ChangePasswordForm email={props.user.email} />
    </motion.div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  // If there isn't a valid authenticated session then redirect to the /login page
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: session,
  };
}

export default Profile;
