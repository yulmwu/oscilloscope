import React, { useEffect } from 'react'
import Oscilloscope from '../oscilloscope'
import { Button, Text } from '.'
import { Theme, ThemeContext } from '../context/theme'

const App: React.FC = () => {
    const canvas_ref = React.useRef<HTMLCanvasElement>(null)
    const start_ref = React.useRef<HTMLButtonElement>(null)
    const stop_ref = React.useRef<HTMLButtonElement>(null)

    let oscilloscope: Oscilloscope | null = null
    let oscillator_: OscillatorNode | null = null

    useEffect(() => {
        if (stop_ref.current) {
            stop_ref.current.classList.add('disabled')
        }
    })

    const start = () => {
        start_ref.current!.classList.add('disabled')
        stop_ref.current!.classList.remove('disabled')

        const audioContext = new AudioContext()

        const oscillator = audioContext.createOscillator()
        oscillator_ = oscillator
        oscillator.type = 'sine'
        oscillator.frequency.value = 440
        oscillator.start()

        const scope = new Oscilloscope(oscillator, canvas_ref.current!, { fftSize: 1024 })
        oscilloscope = scope
        scope.setGain(0.5)
        scope.ctx.strokeStyle = 'green'

        const gain = audioContext.createGain()
        gain.gain.value = 0.5
        oscillator.connect(gain)
        gain.connect(audioContext.destination)

        scope.animate()
    }

    const stop = () => {
        start_ref.current!.classList.remove('disabled')
        stop_ref.current!.classList.add('disabled')
        oscilloscope?.stop()
        oscillator_?.stop()
    }

    const { toggle } = React.useContext(ThemeContext) as Theme

    return (
        <div className={`px-10`}>
            <div className='inline-block'>
                <Button onClick={start} ref={start_ref}>
                    <Text fontSize='text-3xl'>Start</Text>
                </Button>
                <Button onClick={stop} ref={stop_ref}>
                    <Text fontSize='text-3xl'>Stop</Text>
                </Button>
            </div>
            <div className={`block outline outline-1 ${toggle ? 'outline-white' : 'outline-black'} w-[500px]`}>
                <canvas ref={canvas_ref} className='w-full block' />
            </div>
        </div>
    )
}

export default App
