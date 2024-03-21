import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'lil-gui'
import backedShadow from '@/assets/backedShadow.jpg'

const gui = new GUI()

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 1, 1000)
scene.add(camera)
camera.position.y = 30
camera.position.z = 100

const el = document.querySelector<HTMLCanvasElement>('#app')
const renderer = new THREE.WebGLRenderer({
  canvas: el,
  antialias: true
})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * plane
 */
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.5
})
const plane = new THREE.Mesh(new THREE.PlaneGeometry(100, 100), material)
plane.rotateX(-Math.PI / 2)
plane.receiveShadow = true
scene.add(plane)

/**
 * sphere
 */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(10, 64, 64),
  new THREE.MeshLambertMaterial({ color: 0xffffff })
)
sphere.position.y = 10
sphere.castShadow = true
scene.add(sphere)

/**
 * texture
 */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(backedShadow)

/**
 * Lights
 * MeshStandardMaterial 受环境光影响
 * MeshPhongMaterial 受环境光影响
 * MeshLambertMaterial 受环境光影响
 * MeshBasicMaterial 不受环境光影响
 */
const LightGui = gui.addFolder('Lights')

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
scene.add(ambientLight)
LightGui.add(ambientLight, 'intensity', 0, 1)

// 平行光
const directLight = new THREE.DirectionalLight(0xffffff, 0.5)
directLight.position.set(50, 50, -25)
directLight.castShadow = false // 关闭阴影，使用烘焙阴影
directLight.shadow.mapSize.width = 1024
directLight.shadow.mapSize.height = 1024
directLight.shadow.camera.scale.set(5, 5, 5) // 设置阴影相机的缩放
directLight.shadow.camera.near = 1
directLight.shadow.camera.far = 25
scene.add(directLight)
LightGui.add(directLight, 'intensity', 0, 1)
LightGui.add(directLight.position, 'x', -5, 5)
LightGui.add(directLight.position, 'y', -5, 5)
LightGui.add(directLight.position, 'z', -5, 5)

const directLightCameraHelper = new THREE.CameraHelper(directLight.shadow.camera)
scene.add(directLightCameraHelper)

// 聚光灯
const spotLight = new THREE.SpotLight(0xffffff, 1000, 1000, Math.PI / 6, 0.5)
spotLight.castShadow = false // 关闭阴影，使用烘焙阴影
spotLight.shadow.mapSize.width = size.width
spotLight.shadow.mapSize.height = size.height
spotLight.shadow.camera.near = 1
spotLight.shadow.camera.far = 1000
spotLight.target = sphere
spotLight.position.set(-50, 50, -25)
console.log(spotLight.castShadow)
scene.add(spotLight)

const lightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(lightHelper)

/**
 * controls
 */
const controls = new OrbitControls(camera, el)

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
