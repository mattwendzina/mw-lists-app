import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

const Layout = ({ componentName, children }) => {

    const baseClasses = "min-h-screen px-16 flex items-center flex-col"

    let additionalClasses
    if (componentName === 'CreateList') {
        additionalClasses = "justify-start"
    } else {
        additionalClasses = "justify-center"

    }

    const combinedClasses = `${baseClasses} ${additionalClasses}`

    return (
        <div className="mt-16">
            <Navbar authenticated={false} />
            <main className={combinedClasses}>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout