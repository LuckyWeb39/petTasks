import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'
import {keyboardKey} from "@testing-library/user-event";

// * 4 - в файле GreetingContainer.tsx дописать типизацию пропсов✅
// * 5 - в файле GreetingContainer.tsx указать нужные типы в useState с name и error✅
// * 6 - в файле GreetingContainer.tsx дописать тип и логику функции setNameCallback
// * 7 - в файле GreetingContainer.tsx дописать логику функций pureAddUser, pureOnBlur, pureOnEnter и проверить их тестами
// * 8 - в файле GreetingContainer.tsx вычислить количество добавленных и имя последнего (totalUsers, lastUserName)

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string,
                            setError: (error: string) => void,
                            setName: (name: string) => void,
                            addUserCallback: (name: string) => void
) => {
    if (!name.trim()) {
        setError('Ошибка! Введите имя!')

    } else {
        addUserCallback(name)
        setError('')
        setName('')

    }
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
}

export const pureOnBlur = (name: string, setError: (error: string) => void) => { // если имя пустое - показать ошибку
    if (!name.trim()) {
        setError('Ошибка! Введите имя!')
    }

}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: ()=>void) => { // если нажата кнопка Enter - добавить
    if (e.key === 'Enter') {
        addUser()
    }
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length// need to fix
    const lastUserName = !error && totalUsers > 0 ? users[totalUsers-1].name : ''// need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
