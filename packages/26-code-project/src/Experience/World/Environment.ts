import * as THREE from 'three'
import Experience from '..'

export default class Environment {
  experience: Experience
  scene: THREE.Scene
  sunLight: THREE.DirectionalLight

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene

    this.setSunLight()
  }

  setSunLight() {
    this.sunLight = new THREE.DirectionalLight('#ffffff', 3)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3.5, 2, -1.25)
    // const helper = new THREE.DirectionalLightHelper(this.sunLight, 5)
    // this.scene.add(helper)
    this.scene.add(this.sunLight)
  }
}
