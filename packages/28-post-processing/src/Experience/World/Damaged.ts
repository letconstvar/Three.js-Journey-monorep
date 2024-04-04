import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import Experience from '..'
import Resources from '../Resources'

export default class Damaged {
  experience: Experience
  resources: Resources

  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources

    this.setDamaged()
  }

  setDamaged() {
    const model = (this.resources.items.DamagedHelmet as GLTF).scene
    this.experience.scene.add(model)
  }
}
