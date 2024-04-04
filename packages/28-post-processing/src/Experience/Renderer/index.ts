import * as THREE from 'three'
import Experience from '..'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'

export default class Renderer {
  experience: Experience
  instance: THREE.WebGLRenderer
  enableEffectComposer = false
  effectComposer?: EffectComposer

  constructor(enableEffectComposer = false) {
    this.experience = new Experience()
    this.enableEffectComposer = enableEffectComposer

    this.setInstance()
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      antialias: true
    })
    this.instance.setClearColor('#eee')
    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.setSize(this.experience.sizes.width, this.experience.sizes.height)
    this.instance.setPixelRatio(this.experience.sizes.devicePixelRatio)
    this.experience.el.appendChild(this.instance.domElement)

    // enableEffectComposer
    if (this.enableEffectComposer) {
      this.effectComposer = new EffectComposer(this.instance)
      this.effectComposer.setSize(this.experience.sizes.width, this.experience.sizes.height)
      this.effectComposer.setPixelRatio(this.experience.sizes.devicePixelRatio)
      console.log('🎆 %cenableEffectComposer', 'color: #008DDA;', this.enableEffectComposer)
    }
  }

  resize() {
    this.instance.setSize(this.experience.sizes.width, this.experience.sizes.height)
    this.instance.setPixelRatio(this.experience.sizes.devicePixelRatio)

    if (this.enableEffectComposer) {
      this.effectComposer.setSize(this.experience.sizes.width, this.experience.sizes.height)
      this.effectComposer.setPixelRatio(this.experience.sizes.devicePixelRatio)
    }
  }

  update() {
    if (this.enableEffectComposer) {
      this.effectComposer.render()
    } else {
      this.instance.render(this.experience.scene, this.experience.camera.instance)
    }
  }
}
