import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

/**
 * texture
 */
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () => {
  console.log('onStart')
}
loadingManager.onProgress = () => {
  console.log('onProgress')
}
loadingManager.onLoad = () => {
  console.log('onLoad')
}
loadingManager.onError = () => {
  console.log('onError')
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 1, 1000)
scene.add(camera)
camera.position.z = 500

const el = document.querySelector<HTMLCanvasElement>('#app')
const renderer = new THREE.WebGLRenderer({
  canvas: el,
  antialias: true
})
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)

const fontLoader = new FontLoader(loadingManager)
fontLoader.load('./src/assets/fonts/helvetiker_regular.typeface.json', (font) => {
  const geometry = new TextGeometry('Hello Three.js', {
    font: font,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelSegments: 5
  })
  // 字体居中(注意是几何体的中心)
  // geometry.computeBoundingBox()
  // geometry.translate(
  //   -geometry.boundingBox!.max.x / 2,
  //   -geometry.boundingBox!.max.y / 2,
  //   -geometry.boundingBox!.max.z / 2
  // )

  // 字体居中
  geometry.center()

  const material = new THREE.MeshBasicMaterial({
    wireframe: true,
    color: 0xff0000
  })
  const textMesh = new THREE.Mesh(geometry, material)
  scene.add(textMesh)
})

/**
 * controls
 */
const controls = new OrbitControls(camera, el)

/**
 * cursor
 */
// el.addEventListener('mousemove', (event: MouseEvent) => {
// gsap.to(cube.position, {
//   x: (event.clientX / size.width) * 2 - 1, // -1 ~ 1
//   y: -((event.clientY / size.height) * 2 - 1) // -1 ~ 1
// })
// })

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
