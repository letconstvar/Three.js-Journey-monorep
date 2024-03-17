import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 1, 100)
// const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 100)
scene.add(camera)
camera.position.z = 3

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const el = document.querySelector<HTMLCanvasElement>('#app')
const renderer = new THREE.WebGLRenderer({
  canvas: el,
  antialias: true
})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)

/**
 * controls
 */
const controls = new OrbitControls(camera, el)

/**
 * cursor
 */
el.addEventListener('mousemove', (event: MouseEvent) => {
  gsap.to(cube.position, {
    x: (event.clientX / size.width) * 2 - 1, // -1 ~ 1
    y: -((event.clientY / size.height) * 2 - 1) // -1 ~ 1
  })
})

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
