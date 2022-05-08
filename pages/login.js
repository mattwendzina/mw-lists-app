import { getSession } from "next-auth/react";
import LoginForm from "../components/Forms/LoginForm/LoginForm";

const Login = () => (
  <div>
    <LoginForm />
  </div>
);

export async function getServerSideProps(context) {
  // Here we see if there is an authorized session. If the IS then redirect
  // any attempts to go to the login page to the '/'.
  const session = await getSession({ req: context.req });
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}

export default Login;
