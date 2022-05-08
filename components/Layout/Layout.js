import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

import ListsContext from "../../store/lists-context.js";

const Layout = ({ componentName, children }) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const baseClasses = "min-h-screen px-16 flex items-center flex-col";
  const { selectedList } = useContext(ListsContext);

  const selectedListTitle = () => {
    switch (router.pathname) {
      case "/createList":
        return setTitle("Create List");
      case "/lists":
        return setTitle("Lists");
      case "/profile":
        return setTitle("Profile");
      case "/login":
        return setTitle("Sign In");
      default:
        return setTitle("");
    }
  };

  useEffect(() => {
    if (router.query.title && selectedList?.title) {
      setTitle(selectedList.title);
      return;
    }
    selectedListTitle();
  }, [router.query.title, router.pathname, selectedList]);

  let additionalClasses;
  if (componentName === "Profile" || componentName === "Home") {
    additionalClasses = "justify-center";
  } else {
    additionalClasses = "justify-start";
  }

  const combinedClasses = `${baseClasses} ${additionalClasses}`;

  return (
    <div className="mt-20">
      <Navbar selectedListTitle={title} />
      <main className={combinedClasses}>{children}</main>
      <Footer />)
    </div>
  );
};

export default Layout;
