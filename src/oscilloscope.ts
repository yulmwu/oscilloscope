export interface OscilloscopeOptions {
    fftSize?: number
    gain?: number
}

export default class Oscilloscope {
    analyser: AnalyserNode
    timeDomain: Uint8Array
    drawRequest: number
    gain: number
    verticalOffset: number
    public ctx: CanvasRenderingContext2D

    constructor(source: AudioNode, canvas: HTMLCanvasElement, options: OscilloscopeOptions = {}) {
        if (!(source instanceof window.AudioNode)) {
            throw new Error('Invalid source')
        }

        if (source instanceof window.AnalyserNode) {
            this.analyser = source
        } else {
            this.analyser = source.context.createAnalyser()
            source.connect(this.analyser)
        }

        if (options.fftSize) this.analyser.fftSize = options.fftSize
        this.timeDomain = new Uint8Array(this.analyser.fftSize)
        this.drawRequest = 0
        this.gain = options.gain ?? 1
        this.verticalOffset = 0
        this.ctx = canvas.getContext('2d')!
    }

    animate(x0 = 0, y0 = 0, width = this.ctx.canvas.width, height = this.ctx.canvas.height) {
        if (this.drawRequest) {
            throw new Error('Animation already running')
        }

        const drawLoop = () => {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
            this.draw(this.ctx, x0, y0, width, height)
            this.drawRequest = window.requestAnimationFrame(drawLoop)
        }
        drawLoop()
    }

    stop() {
        if (this.drawRequest) {
            window.cancelAnimationFrame(this.drawRequest)
            this.drawRequest = 0
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
        }
    }

    draw(ctx: CanvasRenderingContext2D, x0 = 0, y0 = 0, width = ctx.canvas.width - x0, height = ctx.canvas.height - y0) {
        this.analyser.getByteTimeDomainData(this.timeDomain)
        const step = width / this.timeDomain.length

        ctx.beginPath()

        for (let i = 0; i < this.timeDomain.length; i += 2) {
            const percent = (this.timeDomain[i] / 256) * this.gain + this.verticalOffset
            const x = x0 + i * step
            const y = y0 + height * percent
            ctx.lineTo(x, y)
        }

        ctx.stroke()
    }

    setFFTSize(size: number) {
        this.analyser.fftSize = size
        this.timeDomain = new Uint8Array(this.analyser.fftSize)
    }

    setGain(gain: number) {
        this.gain = gain
        this.verticalOffset = 0.5 - this.gain / 2
    }
}
