import * as THREE from 'three'
import Sizes from './utils/Sizes'
import Time from './utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World'
import Resources from './Resources'
import sources from './sources'

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

  constructor(el?: HTMLElement) {
    if (instance) return instance
    console.log('new experience')
    instance = this

    this.el = el

    this.sizes = new Sizes(el)
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
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

  update () {
    this.camera.update()
    this.renderer.update()
  }
}
