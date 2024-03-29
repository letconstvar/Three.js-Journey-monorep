import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'lil-gui'
import circlePng from '@/assets/particles/circle_01.png'

const gui = new GUI()

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 1, 1000)
scene.add(camera)
camera.position.y = 0
camera.position.z = 5

const el = document.querySelector<HTMLCanvasElement>('#app')
const renderer = new THREE.WebGLRenderer({
  canvas: el,
  antialias: true
})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true

/**
 * controls
 */
const controls = new OrbitControls(camera, el)

/**
 * texture loader
 */
const loader = new THREE.TextureLoader()
const particlTuexture = loader.load(circlePng)

/**
 * calaxy
 */
const parameters = {
  count: 5000, // 粒子数量
  size: 0.01, // 粒子尺寸
  radius: 5, // 银河半径
  branches: 3, // 银河分支
  spin: 1, // 银河旋转速度
  randomness: 0.2, // 银河粒子随机性 
  randomnessPower: 3, // 银河粒子随机性指数
  insideColor: '#ff6030', // 银河内部颜色
  outsideColor: '#1b3984' // 银河外部颜色
}

let geometry: THREE.BufferGeometry
let points: any
let material: THREE.PointsMaterial
const generatorCalaxy = () => {
  // remove old points
  if (points) {
    geometry.dispose() // 释放缓存
    material.dispose() // 释放缓存
    scene.remove(points) // 移除
  }

  geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(parameters.count * 3)

  const colors = new Float32Array(parameters.count * 3)
  const colorInside = new THREE.Color(parameters.insideColor)
  const colorOutside = new THREE.Color(parameters.outsideColor)
  // colorInside.lerp(colorOutside, 0.5)
  // colorOutside.lerp(colorInside, 0.5)

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3

    const radius = Math.random() * parameters.radius // 随机半径 0 - 5

    const spinAngle = parameters.spin * radius

    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

    // 随机分支角度 0 - 360
    const branchAngle =
      ((i % parameters.branches) /** res: 0,1,2,0,1,2... */ /
        parameters.branches) /** res: 0, 0.33, 0.66, 0, 0.33, 0.66... */ *
      (Math.PI * 2) /* res: 0(360), 2.0734511513692637(120), 4.1469023027385274(240), 0(360)... */

    positions[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
    positions[i3 + 1] = 0 + randomY
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    const colorMixed = colorInside.clone()
    colorMixed.lerp(colorOutside, radius / parameters.radius) 

    colors[i3 + 0] = colorMixed.r
    colors[i3 + 1] = colorMixed.g
    colors[i3 + 2] = colorMixed.b
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })

  points = new THREE.Points(geometry, material)
  scene.add(points)
}
generatorCalaxy()

/**
 * calaxy gui
 */
gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generatorCalaxy)
gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generatorCalaxy)
gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generatorCalaxy)
gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generatorCalaxy)
gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generatorCalaxy)
gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generatorCalaxy)
gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generatorCalaxy)
gui.addColor(parameters, 'insideColor').onFinishChange(generatorCalaxy)
gui.addColor(parameters, 'outsideColor').onFinishChange(generatorCalaxy)

/**
 * 全屏
 */
el.addEventListener('dblclick', () => {
  // @ts-ignore
  const fullscreenElement = document.fullscreenElement || document?.webkitFullscreenElement
  if (!fullscreenElement) {
    el.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

/**
 * resize
 */
window.addEventListener('resize', () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()

  renderer.setSize(size.width, size.height)
})

const tick = () => {
  // cube.rotation.y += 0.01

  renderer.render(scene, camera)

  controls.update()

  window.requestAnimationFrame(tick)
}
tick()
