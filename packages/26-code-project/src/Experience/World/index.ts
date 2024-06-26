import * as THREE from 'three'
import Experience from '..'
import Environment from './Environment'
import Resources from '../Resources'
import Floor from './Floor'
import TestMesh from './TestMesh'

export default class World {
  experience: Experience
  scene: THREE.Scene
  environment: Environment
  resources: Resources
  floor: Floor

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.resources.addEventListener('ready', () => {
      // 资源准备完毕
      this.environment = new Environment()
      this.floor = new Floor()
      this.experience.camera.instance.position.set(0, 2, 2)

      new TestMesh()
    })
  }
}
