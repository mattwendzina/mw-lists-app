import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";

const Layout = ({ componentName, children }) => {
  const baseClasses = "min-h-screen px-16 flex items-center flex-col";

  let additionalClasses;
  if (componentName === "Profile" || componentName === "Home") {
    additionalClasses = "justify-center";
  } else {
    additionalClasses = "justify-start";
  }

  const combinedClasses = `${baseClasses} ${additionalClasses}`;

  return (
    <div className="mt-16">
      <Navbar />
      <main className={combinedClasses}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
