import React from 'react'
import { Theme, ThemeContext } from '../context/theme'
import { Text, Button } from './'

export default () => {
    const { toggle, toggleTheme } = React.useContext(ThemeContext) as Theme

    return (
        <div className={`fixed w-[100vw] h-[100vh] ${toggle ? 'bg-background' : 'bg-background-light'}`}>
            <div className='fixed bottom-0 right-0 p-5'>
                <Button onClick={toggleTheme}>
                    <Text className='text-[2rem]'>{toggle ? 'Light' : 'Dark'} Mode</Text>
                </Button>
            </div>
        </div>
    )
}
