import PropTypes from "prop-types";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = ({ selectedListTitle }) => {
  const { data: session, status } = useSession();

  const liClasses =
    "py-0 px-4 transition ease duration-200 hover:text-honey-yellow";

  return (
    <ul className="flex bg-oxford-blue text-white justify-between fixed top-0 left-0 w-full">
      <Link href="/">
        <a className="m-0 basis-1/4 text-left p-5">
          <li className={liClasses}>Home</li>
        </a>
      </Link>
      <h2 className="text-xl p-5 leading-none flex items-center">
        {selectedListTitle && selectedListTitle}
      </h2>
      {status === "authenticated" ? (
        <div className="flex basis-1/4 justify-end p-5">
          <Link href="/lists">
            <a>
              <li className={liClasses}>Lists</li>
            </a>
          </Link>
          <Link href="/createList">
            <a>
              <li className={liClasses}>Create</li>
            </a>
          </Link>
          <Link href="/profile">
            <a>
              <li className={liClasses}>Profile</li>
            </a>
          </Link>
          <Link href="/login">
            <a
              onClick={() => {
                signOut({ redirect: false });
              }}
            >
              <li className={liClasses}>Signout</li>
            </a>
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <a className="basis-1/4 text-right">
            <li className={liClasses}>Login</li>
          </a>
        </Link>
      )}
    </ul>
  );
};

Navbar.propTypes = {
  selectedList: PropTypes.string,
};

export default Navbar;
