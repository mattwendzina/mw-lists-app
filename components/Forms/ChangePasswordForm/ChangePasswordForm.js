import { useState } from 'react'

import { usePasswordValidation } from "../../../hooks/usePasswordValidation"

import Input from "../../ui/Input/Input"
import Button from "../../ui/Button/Button"
import Spinner from "../../ui/Spinner/Spinner"
import ErrorMessage from "../../ui/ErrorMessage/ErrorMessage"
import ConfirmationMessage from "../../ui/ConfirmationMessage/ConfirmationMessage"

const ChangePasswordForm = ({ email }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)
    const [confirmationMessage, setConfirmationMessage] = useState(null)

    const oldPasswordHandler = (e) => setOldPassword(e.target.value)
    const newPasswordHandler = (e) => setNewPassword(e.target.value)

    const [
        validLength,
        hasNumber,
        upperCase,
        lowerCase,
        specialChar,
    ] = usePasswordValidation({
        firstPassword: newPassword,
        // Fake username required to overide validation logic used in LoginForm page
        username: 'fakeUser'
    });

    const resetMessage = (message, time) => {
        setTimeout(() => {
            message()
        }, time)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch("/api/user/change-password", {
            method: "PATCH",
            body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword, email: email }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        if (!response.ok) {
            console.log("ERROR", data)
            setErrorMessage(<ErrorMessage message={data.message} />)
            resetMessage(setErrorMessage, 5000)
            setOldPassword("")
            setNewPassword("")
            setIsLoading(false)
            return
        }
        setConfirmationMessage(<ConfirmationMessage message={data.message} />)
        resetMessage(setConfirmationMessage, 5000)
        setOldPassword("")
        setNewPassword("")
        setIsLoading(false)
    }

    const inputs = () => (
        <>
            <Input label="Current Password" classes="basis-full w-full" type="password" onChange={(e) => {
                oldPasswordHandler(e)
            }} value={oldPassword} />
            <Input label="New Password" classes="basis-full w-full" type="password" onChange={(e) => {
                newPasswordHandler(e)
            }} value={newPassword} />
        </>
    )

    const actionButtons = () => (
        oldPassword && newPassword && newPassword.length >= 8 && validators().length === 0 ?
            <Button name="Update Password" classes="mx-auto flex items-center" primary >
                {isLoading && <Spinner />}
            </Button>
            :
            <Button name="Update Password" classes="mx-auto" disabled />
    )

    const validators = () => {
        return [validLength, hasNumber, upperCase, lowerCase, specialChar].filter(validator => {
            if (validator)
                return <li className="text-xs text-red-600">{validator}</li>
        }
        )
    }


    return (
        <form onSubmit={onSubmitHandler}>
            <div className="p-8 bg-white rounded-md shadow-xl w-60 md:w-80">
                {inputs()}
                {validators()}
                {errorMessage}
                {confirmationMessage}
                {actionButtons()}
            </div>
        </form>
    )

}

export default ChangePasswordForm;