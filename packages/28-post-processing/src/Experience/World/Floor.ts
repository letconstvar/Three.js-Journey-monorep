import * as THREE from 'three'
import Experience from '..'
import Resources from '../Resources'

export default class Floor {
  experience: Experience
  resources: Resources
  scene: THREE.Scene
  texture: {
    bump: THREE.Texture
    diffuse: THREE.Texture
    roughness: THREE.Texture
    intensity: number
    wrapS: typeof THREE.RepeatWrapping
    wrapT: typeof THREE.RepeatWrapping
  }
  material: THREE.MeshStandardMaterial
  mesh: THREE.Mesh<
    THREE.BufferGeometry<THREE.NormalBufferAttributes>,
    THREE.Material | THREE.Material[],
    THREE.Object3DEventMap
  >

  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resources = this.experience.resources

    this.setTexture()
    this.setMaterial()
    this.setMesh()
  }

  setTexture() {
    this.texture = {
      bump: this.resources.items.floorTextureBump as THREE.Texture,
      diffuse: this.resources.items.floorTextureDiffuse as THREE.Texture,
      roughness: this.resources.items.floorTextureRoughness as THREE.Texture,
      intensity: 0.5,
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping
    }
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.texture.diffuse,
      bumpMap: this.texture.bump,
      roughnessMap: this.texture.roughness
    })
    this.texture.diffuse.wrapS = this.texture.wrapS
    this.texture.diffuse.wrapT = this.texture.wrapT
    this.texture.bump.wrapS = this.texture.wrapS
    this.texture.bump.wrapT = this.texture.wrapT
    this.texture.roughness.wrapS = this.texture.wrapS
    this.texture.roughness.wrapT = this.texture.wrapT
    this.texture.diffuse.repeat.set(10, 24)
    this.texture.bump.repeat.set(10, 24)
    this.texture.roughness.repeat.set(10, 24)
  }

  setMesh() {
    this.mesh = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), this.material)
    this.mesh.name = 'floor'
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
