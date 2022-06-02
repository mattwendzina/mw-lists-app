import PropTypes from "prop-types";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = ({ pageTitle }) => {
  const { data: session, status } = useSession();

  const liClasses = "py-0 px-2 transition ease duration-200 flex-1 text-center";

  return (
    <ul className="flex p-5 bg-oxford-blue text-white justify-between fixed top-0 left-0 w-full items-center">
      <li className={`${liClasses} !text-left`}>
        <Link href="/">
          <a className="m-0 basis-1/4 text-left p-5 hover:text-honey-yellow">
            Home
          </a>
        </Link>
      </li>
      <li className="text-xl leading-none flex items-center basis-1/2 justify-center">
        {pageTitle && (pageTitle.pageName || pageTitle.listName)}
      </li>
      {status === "authenticated" ? (
        <div className="flex basis-1/4 justify-end">
          <li className={liClasses}>
            <Link href="/lists">
              <a>Lists</a>
            </Link>
          </li>
          <li className={liClasses}>
            <Link href="/createList">
              <a>Create</a>
            </Link>
          </li>
          <li className={liClasses}>
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </li>
          <li className={liClasses}>
            <Link href="/login">
              <a
                onClick={() => {
                  signOut({ redirect: false });
                }}
              >
                Signout
              </a>
            </Link>
          </li>
        </div>
      ) : (
        <li className={`${liClasses} text-right`}>
          <Link href="/login">
            <a className="basis-1/4 p-5 text-right hover:text-honey-yellow">
              Login
            </a>
          </Link>
        </li>
      )}
    </ul>
  );
};

Navbar.propTypes = {
  selectedList: PropTypes.string,
};

export default Navbar;
