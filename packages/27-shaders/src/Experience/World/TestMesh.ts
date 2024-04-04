import * as THREE from 'three'
import Experience from '..'
import { Debug } from '../utils/Debug'

export default class TestMesh {
  experience: Experience
  debug: Debug

  constructor() {
    this.experience = new Experience()
    this.debug = this.experience.debug

    console.log(this.debug.active)
    if (this.debug.active) {
      const testFolder = this.debug.ui.addFolder('test')
    }

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshStandardMaterial({
        color: 'red'
      })
    )
    testMesh.position.set(0, 0.25, 0)
    this.experience.scene.add(testMesh)
  }
}