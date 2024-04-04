import * as THREE from 'three'
import Experience from '..'

export default class Renderer {
  experience: Experience
  instance: THREE.WebGLRenderer

  constructor() {
    this.experience = new Experience()

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      antialias: true
    })
    this.instance.setClearColor('#000')
    this.instance.setSize(this.experience.sizes.width, this.experience.sizes.height)
    this.instance.setPixelRatio(this.experience.sizes.devicePixelRatio)
    this.experience.el.appendChild(this.instance.domElement)
  }

  resize() {
    this.instance.setSize(this.experience.sizes.width, this.experience.sizes.height)
    this.instance.setPixelRatio(this.experience.sizes.devicePixelRatio)
  }

  update() {
    this.instance.render(this.experience.scene, this.experience.camera.instance)
  }
}
