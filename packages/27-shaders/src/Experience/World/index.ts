import * as THREE from 'three'
import Experience from '..'
import Environment from './Environment'
import Resources from '../Resources'
import Floor from './Floor'
// import ShaderTest from './ShaderTest'
import Sea from './Sea'

export default class World {
  experience: Experience
  scene: THREE.Scene
  environment: Environment
  resources: Resources
  floor: Floor
  camera: THREE.PerspectiveCamera
  // shaderTest: ShaderTest
  Sea: Sea

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.camera = this.experience.camera.instance
    this.resources = this.experience.resources

    this.resources.addEventListener('ready', () => {
      this.camera.position.z = 10
      this.camera.position.y = 2
      // this.shaderTest = new ShaderTest()
      this.Sea = new Sea()
    })
  }
}
