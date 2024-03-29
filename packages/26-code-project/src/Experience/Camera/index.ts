import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Experience from '..'

export default class Camera {
  instance: THREE.PerspectiveCamera
  controls: OrbitControls
  experience: Experience

  constructor() {
    this.experience = new Experience()

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      75,
      this.experience.sizes.width / this.experience.sizes.height,
      0.1,
      100
    )
    this.instance.position.set(0, 0, 2)
    this.experience.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.experience.el)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.experience.sizes.width / this.experience.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }
}
