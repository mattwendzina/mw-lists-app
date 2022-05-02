import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const Navbar = () => {
    const { data: session, status } = useSession()

    const liClasses = "py-0 px-4 transition ease duration-200 hover:text-honey-yellow"

    return (
        <ul className="flex bg-oxford-blue p-4 text-white justify-between fixed top-0 left-0 w-full">
            <Link href="/">
                <a className="m-0">
                    <li className={liClasses}>Home</li>
                </a>
            </Link>
            {status === "authenticated" ?
                <div className="flex">
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
                        <a onClick={() => {
                            signOut({ redirect: false })
                        }}>
                            <li className={liClasses}>Signout</li>
                        </a>
                    </Link>
                </div>
                :
                <Link href="/login">
                    <a>
                        <li className={liClasses}>Login</li>
                    </a>
                </Link>
            }
        </ul >
    )
}

export default Navbar