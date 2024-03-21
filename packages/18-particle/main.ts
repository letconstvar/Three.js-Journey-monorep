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
 * particles
 */
// const geometry = new THREE.SphereGeometry(1, 32, 32)
const geometry = new THREE.BufferGeometry()
const count = 500

const positions = new Float32Array(count * 3)
const colors = new Float32Array(count * 3)

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10 // -5 ~ 5
  colors[i] = Math.random()
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

const material = new THREE.PointsMaterial({
  size: 0.2,
  sizeAttenuation: true, // 点的大小是否因相机深度而衰减
  // color: new THREE.Color('#E1AFD1'),
  // 以下设置不渲染黑色部分
  alphaMap: particlTuexture,
  // alphaTest: 0.001,
  depthWrite: false,
  transparent: true,
  blending: THREE.AdditiveBlending, // 粒子相交颜色叠加
  vertexColors: true // 使用顶点颜色, geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
})

const points = new THREE.Points(geometry, material)
scene.add(points)

/**
 * cube
 */
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000
})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

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
