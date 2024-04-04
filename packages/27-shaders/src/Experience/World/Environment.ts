import * as THREE from 'three'
import Experience from '..'
import Resources from '../Resources'

type environmentMap = {
  intensity: number
  texture: THREE.CubeTexture
}

export default class Environment {
  experience: Experience
  scene: THREE.Scene
  sunLight: THREE.DirectionalLight
  resources: Resources
  environmentMap: environmentMap

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setSunLight()
    this.setEnvironmentMap()
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

  setEnvironmentMap() {
    this.environmentMap = {
      intensity: 0.4,
      texture: this.resources.items.environmentTexture as THREE.CubeTexture,
    }
    this.scene.environment = this.environmentMap.texture

    this.updateMaterial()
  }

  updateMaterial() {
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        child.material.envMap = this.environmentMap.texture
        child.material.envMapIntensity = this.environmentMap.intensity
        child.material.needsUpdate = true
      }
    })
  }
}
