let instance: Sizes | null = null
/**
 * @example const sizes = new Sizes()
 * sizes.addEventListener('resize', () => {
 *   console.log(sizes.width, sizes.height)
 * })
 */
export default class Sizes extends EventTarget {
  public width: number
  public height: number
  public devicePixelRatio: number
  public el: HTMLElement

  constructor(el: HTMLElement) {
    if (instance) return instance

    super()
    instance = this

    this.el = el
    this.set()

    window.addEventListener('resize', () => {
      this.set()
      this.dispatchEvent(new Event('resize'))
    })
  }

  private set() {
    this.width = this.el.clientWidth
    this.height = this.el.clientHeight
    this.devicePixelRatio = window.devicePixelRatio || 1
  }
}
