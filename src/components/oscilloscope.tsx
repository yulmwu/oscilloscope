import React from 'react'
import Oscilloscope from '../oscilloscope'
import { Button, Text } from '.'
import { Theme, ThemeContext } from '../context/theme'

const App: React.FC = () => {
    const canvas_ref = React.useRef<HTMLCanvasElement>(null)

    const start = () => {
        const audioContext = new AudioContext()

        const oscillator = audioContext.createOscillator()
        oscillator.type = 'sine'
        oscillator.frequency.value = 440
        oscillator.start()

        const scope = new Oscilloscope(oscillator, canvas_ref.current!, { fftSize: 1024 })
        scope.setGain(0.5)
        scope.ctx.strokeStyle = 'red'

        const gain = audioContext.createGain()
        gain.gain.value = 0.5
        oscillator.connect(gain)
        gain.connect(audioContext.destination)

        scope.animate()
    }

    const { toggle } = React.useContext(ThemeContext) as Theme

    return (
        <div className={`px-10`}>
            <Button onClick={start}>
                <Text fontSize='text-3xl'>Start</Text>
            </Button>
            <div className={`block outline outline-1 ${toggle ? 'outline-white' : 'outline-black'} w-[500px]`}>
                <canvas ref={canvas_ref} className='w-full block' />
            </div>
        </div>
    )
}

export default App
