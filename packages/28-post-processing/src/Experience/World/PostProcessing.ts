import * as THREE from 'three'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import Experience from '..'
import { Debug } from '../utils/Debug'

export default class PostProcessing {
  experience: Experience
  debug: Debug
  effectComposer: EffectComposer
  debugParams: {
    glitchPass: boolean
    dotScreenPass: boolean
    shaderPass: boolean
    gammaCorrectionPass: boolean
    unrealBloomPass: boolean
    customPass: boolean
  }

  constructor() {
    this.experience = new Experience()
    this.effectComposer = this.experience.renderer.effectComposer!
    this.debug = this.experience.debug

    this.debugParams = {
      dotScreenPass: false,
      glitchPass: false,
      shaderPass: false,
      gammaCorrectionPass: false,
      unrealBloomPass: false,
      customPass: true
    }

    this.setRenderPass()
    this.setDotScreenPass()
    this.setGlitchPass()
    this.setRGBShiftPass()
    this.setCammaCorrectionPass()
    this.setUnrealBloomPass()
    this.setCustomPass()
  }

  setRenderPass() {
    const renderPass = new RenderPass(this.experience.scene, this.experience.camera.instance)
    renderPass.enabled = true
    this.effectComposer.addPass(renderPass)
  }

  // 黑背效果
  setDotScreenPass() {
    const dotScreenPass = new DotScreenPass()
    dotScreenPass.enabled = this.debugParams.dotScreenPass
    this.effectComposer.addPass(dotScreenPass)

    this.debug.active &&
      this.debug.ui.add(this.debugParams, 'dotScreenPass').onChange(() => {
        dotScreenPass.enabled = this.debugParams.dotScreenPass
      })
  }

  // 闪烁效果
  setGlitchPass() {
    const glitchPass = new GlitchPass()
    // glitchPass.goWild = true // 一直闪烁
    glitchPass.enabled = this.debugParams.glitchPass
    this.effectComposer.addPass(glitchPass)

    this.debug.active &&
      this.debug.ui.add(this.debugParams, 'glitchPass').onChange(() => {
        glitchPass.enabled = this.debugParams.glitchPass
      })
  }

  // 暗色效果, 类似抖音图标边缘色
  setRGBShiftPass() {
    const rgbShiftPass = new ShaderPass(RGBShiftShader)
    rgbShiftPass.enabled = this.debugParams.shaderPass
    this.effectComposer.addPass(rgbShiftPass)

    this.debug.active &&
      this.debug.ui.add(this.debugParams, 'shaderPass').onChange(() => {
        rgbShiftPass.enabled = this.debugParams.shaderPass
      })
  }

  // 类似 render 中的 outputEncoding = sRGB
  setCammaCorrectionPass() {
    const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader)
    gammaCorrectionPass.enabled = this.debugParams.gammaCorrectionPass
    this.effectComposer.addPass(gammaCorrectionPass)

    this.debug.active &&
      this.debug.ui.add(this.debugParams, 'gammaCorrectionPass').onChange(() => {
        gammaCorrectionPass.enabled = this.debugParams.gammaCorrectionPass
      })
  }

  // 辉光
  setUnrealBloomPass() {
    const unrealBloomPass = new UnrealBloomPass(
      new THREE.Vector2(this.experience.sizes.width, this.experience.sizes.height),
      1.5,
      0.4,
      0.85
    )
    unrealBloomPass.enabled = this.debugParams.unrealBloomPass
    this.effectComposer.addPass(unrealBloomPass)

    this.debug.active &&
      this.debug.ui.add(this.debugParams, 'unrealBloomPass').onChange(() => {
        unrealBloomPass.enabled = this.debugParams.unrealBloomPass
      })
  }

  // 自定义效果
  setCustomPass() {
    const customShader = {
      uniforms: {
        tDiffuse: { value: null },
        time: { value: 0 }
      },
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform float time;
        uniform sampler2D tDiffuse;
        varying vec2 vUv;
        
        void main() {
          vec4 texelColor = texture2D(tDiffuse, vUv);
          texelColor.r += 0.1;
          gl_FragColor = texelColor;
        }
      `
    }
    const customPass = new ShaderPass(customShader)
    customPass.enabled = this.debugParams.customPass
    this.effectComposer.addPass(customPass)

    this.debug.active &&
      this.debug.ui.add(this.debugParams, 'customPass').onChange(() => {
        customPass.enabled = this.debugParams.customPass
      })
  }
}
