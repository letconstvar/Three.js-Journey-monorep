import { GUI } from 'lil-gui'

export class Debug {
  active: boolean
  ui: GUI

  constructor() {
    this.active = window.location.hash === '#debug'

    if (this.active) {
      this.ui = new GUI()
    }
  }
}