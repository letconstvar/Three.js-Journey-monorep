import * as THREE from 'three'
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World'
import Resources from './Resources'
import sources from './sources'
import { Debug } from './utils/Debug'

let instance: Experience | null = null
export default class Experience {
  el: HTMLElement
  sizes: Sizes
  time: Time
  scene: THREE.Scene
  camera: Camera
  renderer: Renderer
  world: World
  resources: Resources
  debug: Debug

  constructor(el?: HTMLElement) {
    if (instance) return instance
    console.log('new experience')
    instance = this

    this.el = el

    this.debug = new Debug()
    this.sizes = new Sizes(el)
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer(true)
    this.world = new World()

    this.sizes.addEventListener('resize', () => {
      this.resize()
    })

    this.time.addEventListener('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
  }

  destroy() {
    this.sizes.removeEventListener('resize', this.resize)
    this.time.removeEventListener('tick', this.update)

    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose()
        if (child.material instanceof Array) {
          child.material.forEach((material) => material.dispose())
        } else {
          child.material.dispose()
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()

    if (this.debug.active) {
      this.debug.ui.destroy()
    }
  }
}
