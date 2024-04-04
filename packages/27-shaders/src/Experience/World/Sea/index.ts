import * as THREE from 'three'
import Experience from '../../'
import { Debug } from '../../utils/Debug'
import fragmentShader from './fragmentShader.glsl?raw'
import vertexShader from './vertexShader.glsl?raw'
import GUI from 'lil-gui'

type uniformValue = {
  value: number
}

export default class TestMesh {
  experience: Experience
  debug: Debug
  scene: THREE.Scene
  geometry: THREE.PlaneGeometry
  material: THREE.ShaderMaterial
  mesh: THREE.Mesh<THREE.PlaneGeometry, any, THREE.Object3DEventMap>
  uniforms: {
    uTime: uniformValue
    uBigWavesElevation: uniformValue
    uBigWavesFrequency: { value: THREE.Vector2 }
    uBigWavesSpeed: uniformValue
    uDepthColor: { value: THREE.Color }
    uSurfaceColor: { value: THREE.Color }
    uColorOffset: uniformValue
    uColorMultiplier: uniformValue
  }

  constructor() {
    this.experience = new Experience()

    this.scene = this.experience.scene
    this.debug = this.experience.debug
    this.uniforms = {
      uTime: { value: 0.0 },
      uBigWavesElevation: { value: 0.2 }, // 浪高
      uBigWavesFrequency: { value: new THREE.Vector2(4, 4) }, // 浪频率
      uBigWavesSpeed: { value: 0.15 },
      uDepthColor: { value: new THREE.Color(0x186691) },  // 深色
      uSurfaceColor: { value: new THREE.Color(0x9bd8ff) }, // 浅色
      uColorOffset: { value: 0.52 },
      uColorMultiplier: { value: 2.0 }
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setDebug()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(5, 5, 1000, 1000)
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
    this.mesh.rotation.x = -Math.PI * 0.5
    this.scene.add(this.mesh)
  }

  setDebug() {
    if (this.debug.active) {
      this.debug.ui
        .add(this.uniforms.uBigWavesElevation, 'value', 0, 2)
        .name('uBigWavesElevation')
        .step(0.1)
        .onChange(() => {
          this.material.uniforms.uBigWavesElevation.value = this.uniforms.uBigWavesElevation.value
        })
      this.debug.ui
        .add(this.uniforms.uBigWavesFrequency.value, 'x', 0, 10)
        .name('uBigWavesFrequencyX')
        .step(0.1)
        .onChange(() => {
          this.material.uniforms.uBigWavesFrequency.value.x =
            this.uniforms.uBigWavesFrequency.value.x
        })
      this.debug.ui
        .add(this.uniforms.uBigWavesFrequency.value, 'y', 0, 10)
        .name('uBigWavesFrequencyY')
        .step(0.1)
        .onChange(() => {
          this.material.uniforms.uBigWavesFrequency.value.y =
            this.uniforms.uBigWavesFrequency.value.y
        })
      this.debug.ui
        .add(this.uniforms.uBigWavesSpeed, 'value', 0, 2)
        .name('uBigWavesSpeed')
        .step(0.1)
        .onChange(() => {
          this.material.uniforms.uBigWavesSpeed.value = this.uniforms.uBigWavesSpeed.value
        })
      this.debug.ui
        .addColor(this.uniforms.uDepthColor, 'value')
        .name('uDepthColor')
        .onChange(() => {
          this.material.uniforms.uDepthColor.value = this.uniforms.uDepthColor.value
        })
      this.debug.ui
        .addColor(this.uniforms.uSurfaceColor, 'value')
        .name('uSurfaceColor')
        .onChange(() => {
          this.material.uniforms.uSurfaceColor.value = this.uniforms.uSurfaceColor.value
        })
      this.debug.ui
        .add(this.uniforms.uColorOffset, 'value', 0, 1)
        .name('uColorOffset')
        .step(0.01)
        .onChange(() => {
          this.material.uniforms.uColorOffset.value = this.uniforms.uColorOffset.value
        })
      this.debug.ui
        .add(this.uniforms.uColorMultiplier, 'value', 0, 10)
        .name('uColorMultiplier')
        .step(0.01)
        .onChange(() => {
          this.material.uniforms.uColorMultiplier.value = this.uniforms.uColorMultiplier.value
        })
    }
  }

  update() {
    this.material.uniforms.uTime.value += 0.05
  }
}
