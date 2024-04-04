import * as THREE from 'three'
import Experience from '../../'
import { Debug } from '../../utils/Debug'
import fragmentShader from './fragmentShader.glsl?raw'
import vertexShader from './vertexShader.glsl?raw'
import GUI from 'lil-gui'

export default class TestMesh {
  experience: Experience
  debug: Debug
  scene: THREE.Scene
  geometry: THREE.PlaneGeometry
  material: THREE.ShaderMaterial
  mesh: THREE.Mesh<THREE.PlaneGeometry, any, THREE.Object3DEventMap>
  uniforms: {
    uTime: { value: number }
    uAmplitude: { value: number } // 上下振幅
    uFrequency: { value: number } // 频率
    uSpeed: { value: number }
    color: { value: THREE.Vector3 }
    uTexture: { value: THREE.Texture }
  }

  constructor() {
    this.experience = new Experience()

    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.uniforms = {
      uTime: { value: 0.0 },
      uAmplitude: { value: 0.2 }, // 上下振幅
      uFrequency: { value: 3.0 }, // 频率
      uSpeed: { value: 2.0 },
      color: { value: new THREE.Vector3(0.2, 0.6, 1.0) },
      uTexture: { value: this.experience.resources.items.shaderTexture as THREE.Texture }
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setDebug()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1.2, 1, 1000, 1000)
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: this.uniforms,
      side: THREE.DoubleSide
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)
  }

  setDebug() {
    if (this.debug.active) {
      const shaderTestFolder = this.debug.ui.addFolder('shaderTestFolder')
      shaderTestFolder
        .add(this.uniforms.uAmplitude, 'value', 0, 1)
        .step(0.001)
        .onChange(() => {
          this.material.uniforms.uAmplitude.value = this.uniforms.uAmplitude.value
        })
      shaderTestFolder
        .add(this.uniforms.uFrequency, 'value', 0, 10)
        .step(0.1)
        .onChange(() => {
          this.material.uniforms.uFrequency.value = this.uniforms.uFrequency.value
        })
      shaderTestFolder
        .add(this.uniforms.uSpeed, 'value', 0, 10)
        .step(0.1)
        .onChange(() => {
          this.material.uniforms.uSpeed.value = this.uniforms.uSpeed.value
        })
    }
  }

  update() {
    this.material.uniforms.uTime.value += 0.01
  }
}
