import * as THREE from 'three'
import gsap from 'gsap'

const size = {
  width: 800,
  height: 600
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, size.width / size.height)
scene.add(camera)
camera.position.z = 3

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

gsap.to(cube.position, { x: 2, duration: 2 })
gsap.to(cube.position, { x: 0, duration: 2, delay: 2 })

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#app'),
  antialias: true
})
renderer.setSize(size.width, size.height)


const tick = () => {
  // cube.rotation.y += 0.01

  renderer.render(scene, camera)

  window.requestAnimationFrame(tick)
}
tick()