import styles from './layout.module.css'

import Navbar from "./Navbar/Navbar"
import Footer from "./Footer/Footer"

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar authenticated={false} />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout