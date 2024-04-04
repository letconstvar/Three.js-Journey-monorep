export default class Time extends EventTarget {
  start: number
  current: number
  elapsed: number
  delta: number

  constructor() {
    super()

    this.start = Date.now()
    this.current = this.start
    this.elapsed = 0
    this.delta = 16 

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    const current = Date.now()
    this.delta = current - this.current
    this.elapsed = current - this.start
    this.current = current

    this.dispatchEvent(new Event('tick'))

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}