import React from 'react'
import { Text, Oscilloscope } from './components'

const App: React.FC = () => {
    return (
        <div>
            <Text fontSize='text-5xl' className='p-5'>Oscilloscope</Text>
            <Oscilloscope />
        </div>
    )
}

export default App
