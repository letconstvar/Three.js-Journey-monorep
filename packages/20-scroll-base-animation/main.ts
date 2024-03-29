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

/**
 * scene
 */
const scene = new THREE.Scene()

/**
 * camera
 */
const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 100)
camera.position.z = 5
scene.add(camera)

/**
 * renderer
 */
const el = document.querySelector<HTMLCanvasElement>('#app')
const renderer = new THREE.WebGLRenderer({
  canvas: el,
  antialias: true,
  alpha: true
})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true

/**
 * controls
 */
// const controls = new OrbitControls(camera, el)
// controls.enableDamping = true

/**
 * Lights
 */
const directLight = new THREE.DirectionalLight(0xffffff, 1)
directLight.position.set(4, 4, 0)
const directLightHelper = new THREE.DirectionalLightHelper(directLight, 5)
scene.add(directLightHelper)
scene.add(directLight)

/**
 * Objects
 */
const material = new THREE.MeshStandardMaterial({
  color: 0xffeded
})

const objectsDistance = 20
const mesh = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material)
const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material)
const mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.3, 100, 16), material)
const sectionMeshes = [mesh, mesh2, mesh3]

mesh.position.y = -objectsDistance * 0
mesh2.position.y = -objectsDistance * 1
mesh3.position.y = -objectsDistance * 2

scene.add(...sectionMeshes)

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

/**
 * scroll y
 */
let scrollY = window.scrollY
window.addEventListener('scroll', () => {
  scrollY = window.scrollY
})

/**
 * cursor
 */
const cursor = {
  x: 0,
  y: 0
}
window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / size.width - 0.5  // -0.5 ~ 0.5
  cursor.y = event.clientY / size.height - 0.5 // -0.5 ~ 0.5
})

/**
 * mesh animation
 */
const clock = new THREE.Clock()
const meshAnimation = () => {
  const elapsedTime = clock.getElapsedTime()
  for (const mesh of sectionMeshes) {
    mesh.rotation.y = elapsedTime * 0.1
    mesh.rotation.x = elapsedTime * 0.12
  }
}

const tick = () => {
  camera.position.y = -(scrollY / size.height) * objectsDistance

  const parallaxX = cursor.x
  const parallaxY = cursor.y
  camera.position.x = -parallaxX
  camera.position.y += parallaxY

  meshAnimation()

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()
