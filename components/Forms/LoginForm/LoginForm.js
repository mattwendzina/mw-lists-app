import { useState, useEffect } from "react";
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router"

import { usePasswordValidation } from "../../../hooks/usePasswordValidation"

import Input from "../../ui/Input/Input"
import Button from "../../ui/Button/Button"
import Spinner from "../../ui/Spinner/Spinner";
import { ErrorMessage } from "../../ui/Messages/messages"

const LoginForm = () => {

    const router = useRouter()

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState({ firstPassword: "", secondPassword: "" })
    const [isUser, setIsUser] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

    const usernameHandler = (e) => setUserName(e.target.value)
    const emailHandler = (e) => setEmail(e.target.value)
    const firstPasswordHandler = (e) => setPassword({ ...password, firstPassword: e.target.value })
    const secondPasswordHandler = (e) => setPassword({ ...password, secondPassword: e.target.value })

    // Custom hook that listens for passwords and runs validation checks
    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        match,
        specialChar,
        validUsername,
        validEmail
    ] = usePasswordValidation({
        firstPassword: password.firstPassword,
        secondPassword: password.secondPassword,
        username: username,
        isUser: isUser,
        email: email
    });

    // If switching between existing/new user reset the fields
    useEffect(() => {
        setUserName('')
        setEmail('')
        setPassword({ firstPassword: "", secondPassword: "" })
    }, [isUser])

    // IF a user deletes the first password then also delete the re-entered password
    useEffect(() => {
        if (password.firstPassword.length === 0) {
            setPassword({ firstPassword: "", secondPassword: "" })
            return
        }
    }, [password.firstPassword])

    // Only show error messages for 6 seconds
    useEffect(() => {
        setTimeout(() => {
            setErrorMessage(null)
        }, 6000)
    }, [errorMessage])

    const resetFields = () => {
        setUserName('')
        setEmail('')
        setPassword({ firstPassword: "", secondPassword: "" })
    }

    const createUser = async () => {
        setIsLoading(true)

        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ username: username, email: email, password: password.firstPassword })
        })

        const data = await response.json()

        if (!response.ok) {
            if (data.message === 'Username or email already exists') {
                createErrorMessage('userAlreadyExists')
                return
            }
            createErrorMessage()
        }

        return data
    }

    const login = async () => {
        setIsLoading(true)

        const result = await signIn('credentials', { redirect: false, password: password.firstPassword, username: username })

        if (!result.error) {
            router.replace("/")
            return
        } else {
            console.error("Error", result)
            if (result.error === 'User not found!') {
                createErrorMessage('noUserFound')
            } else if (result.error === 'Password is incorrect, please try again') {
                createErrorMessage('incorrectPassword')
            } else {
                createErrorMessage()
            }
            setIsLoading(false)
        }
    }


    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (!isUser) {
            try {
                await createUser()
                resetFields()
                setIsLoading(false)
                return
            } catch (e) {
                setIsLoading(false)
                resetFields()
                return
            }
        }

        if (isUser) {
            await login()
        }
    }

    const inputs = () =>
    (
        <>
            <Input onChange={usernameHandler} value={username} classes="basis-full placeholder-gray-400 w-full" type="text" label="Username" />
            {!isUser && <Input label="Email" classes="basis-full w-full" type="email" onChange={(e) => {
                emailHandler(e)
            }} value={email} />}
            <Input label="Password" classes="basis-full w-full" type="password" onChange={(e) => {
                firstPasswordHandler(e)
            }} value={password.firstPassword} />
            {!isUser && password.firstPassword && <Input label="Re-enter your password" classes="basis-full w-full" type="password" onChange={(e) => {
                secondPasswordHandler(e)
            }} value={password.secondPassword} />}
        </>
    )

    const actionButtons = () => {
        const buttonName = isUser ? "Login" : "Create User"

        if (!isUser) {
            if (!username || validators().length !== 0 || password.firstPassword === "" || password.secondPassword === "" || !email) {
                return (<Button name={buttonName} classes="mx-auto" disabled />)
            }
            else {
                return (
                    <Button name={buttonName} classes="mx-auto flex items-center" primary >
                        {isLoading && <Spinner />}
                    </Button>
                )
            }
        }

        if (isUser) {
            if (!username || password.firstPassword === "") {
                return (<Button name={buttonName} classes="mx-auto" disabled />)
            }
            else {
                return (<Button classes="mx-auto flex items-center" primary name={buttonName}>
                    {isLoading && <Spinner />}
                </Button>)
            }
        }
    }

    const loginOptions = () => {
        if (isUser) {
            return <div className="text-sm p-2">Not a user? <button><a className="cursor-pointer font-medium" onClick={() => setIsUser(false)}>Create a profile</a></button></div>
        } else {
            return <div className="text-sm p-2">Already a user? <a className="cursor-pointer font-medium" onClick={() => setIsUser(true)}>Login here</a></div>
        }
    }

    const validators = () => {
        return [validLength, hasNumber, upperCase, lowerCase, specialChar, match, validUsername, validEmail].filter(validator => {
            if (validator)
                return <li className="text-xs text-red-600">{validator}</li>
        }
        )
    }

    const createErrorMessage = (error) => {
        switch (error) {
            case 'noUserFound':
                setErrorMessage(<ErrorMessage message="No user found, please try again" />)
                return
            case 'incorrectPassword':
                setErrorMessage(<ErrorMessage message="Incorrect password, please try again" />)
                return
            case 'userAlreadyExists':
                setErrorMessage(<ErrorMessage message="Username or email already exists, please choose another" />)
                return
            default:
                setErrorMessage(<ErrorMessage message="An unexpected error occured!" />)
                return
        }
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                <div className="p-8 bg-white rounded-md shadow-xl w-60 md:w-80">
                    {inputs()}
                    {/* Only show validators if they are creating a new profile - ie - not an existing user */}
                    {!isUser && <ul>{validators()}</ul>}
                    {errorMessage && errorMessage}
                    {actionButtons()}
                </div>
                <div className="text-center text-oxford-blue">
                    {loginOptions()}
                </div>
            </div>
        </form >
    )
}

export default LoginForm