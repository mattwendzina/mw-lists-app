import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import styles from './navbar.module.css'

const Navbar = () => {
    const { data: session, status } = useSession()

    return (
        <ul className={styles.navbar}>
            <Link href="/">
                <a>
                    <li>Home</li>
                </a>
            </Link>
            {status === "authenticated" ?
                <div className="flex">
                    <Link href="/createList">
                        <a>
                            <li className={liClasses}>Create</li>
                        </a>
                    </Link>
                    <Link href="/profile">
                        <a>
                            <li>Profile</li>
                        </a>
                    </Link>
                    <Link href="/login">
                        <a onClick={() => {
                            signOut({ redirect: false })
                        }}>
                            <li>Signout</li>
                        </a>
                    </Link>
                </div>
                :
                <Link href="/login">
                    <a>
                        <li>Login</li>
                    </a>
                </Link>
            }
        </ul >
    )
}

export default Navbar