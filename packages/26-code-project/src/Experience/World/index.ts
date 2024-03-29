import * as THREE from 'three'
import Experience from '..'
import Environment from './Environment'
import Resources from '../Resources'

export default class World {
  experience: Experience
  scene: THREE.Scene
  environment: Environment
  resources: Resources

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({
        color: 'red'
      })
    )
    this.scene.add(testMesh)

    this.resources.addEventListener('ready', () => {
      // 资源准备完毕
      this.environment = new Environment()
    })
  }
}
