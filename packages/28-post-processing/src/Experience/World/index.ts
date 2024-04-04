import * as THREE from 'three'
import Experience from '..'
import Environment from './Environment'
import Resources from '../Resources'
import Floor from './Floor'
import PostProcessing from './PostProcessing'
import Damaged from './Damaged'

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
      new PostProcessing()
      new Damaged()
    })
  }
}
