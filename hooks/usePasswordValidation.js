import { useState, useEffect } from 'react'

const classNames = "text-xs text-red-600"

const setJsx = (text) => {
    switch (text) {
        case 'password':
            return <li className={classNames}>Password must be at least 8 characters</li>
        case 'lowercase':
            return <li className={classNames}>Password must contain at least 1 upper case character</li>
        case 'uppercase':
            return <li className={classNames}>Password must contain at least 1 lower case character</li>
        case 'number':
            return <li className={classNames}>Password must contain at least 1 number</li>
        case 'special':
            return <li className={classNames}>Password must contain at least 1 special character</li>
        case 'match':
            return <li className={classNames}>The passwords must match</li>
        case 'username':
            return <li className={classNames}>Username must be at least 6 characters</li>
        case 'email':
            return <li className={classNames}>Email address is invalid</li>
        default:
            return null
    }
}


export const usePasswordValidation = ({ firstPassword = "", secondPassword = "", username, email, isUser }) => {
    const resetValidators = () => {
        setUpperCase(null)
        setLowerCase(null)
        setHasNumber(null)
        setSpecialChar(null)
        setMatch(null)
    }

    const [validLength, setValidLength] = useState(null);
    const [hasNumber, setHasNumber] = useState(null);
    const [upperCase, setUpperCase] = useState(null);
    const [lowerCase, setLowerCase] = useState(null);
    const [specialChar, setSpecialChar] = useState(null);
    const [match, setMatch] = useState(null);
    const [validUsername, setValidUsername] = useState(null);
    const [validEmail, setValidEmail] = useState(null);

    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    useEffect(() => {
        if (!username || isUser) {
            return
        }
        if (username.length < 6) {
            setValidUsername(setJsx('username'))
        }
        else {
            setValidUsername(null)
        }

        if (email?.length > 0 && regex.test(email) === false) {
            setValidEmail(setJsx('email'))
        } else {
            setValidEmail(null)
        }
        if (!firstPassword || firstPassword.length < 1) {
            setValidLength(null)
            return
        }
        // If password is less than 8 then don't run other validators
        if (firstPassword.length < 8) {
            setValidLength(setJsx('password'))
            resetValidators()
            return
        }
        setValidLength(null)
        setUpperCase(firstPassword.toLowerCase() !== firstPassword ? null : setJsx('lowercase'))
        setLowerCase(firstPassword.toUpperCase() !== firstPassword ? null : setJsx('uppercase'))
        setHasNumber(/\d/.test(firstPassword) ? null : setJsx('number'));
        setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword) ? null : setJsx('special'));
        if (secondPassword) {
            setMatch(firstPassword && firstPassword === secondPassword ? null : setJsx('match'));
        }
    }, [firstPassword, secondPassword, username, email]);

    return [validLength, hasNumber, upperCase, lowerCase, specialChar, match, validUsername, validEmail];
}

