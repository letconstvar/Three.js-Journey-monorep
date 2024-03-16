import * as THREE from 'three'

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
// console.log(cube.position.length()) // 物体中心到原点的距离
// console.log(cube.position.distanceTo(new THREE.Vector3(0, 1, 0))) // 物体中心到指定点的距离
// cube.rotation.reorder('YXZ') // 重排旋转顺序

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#app')
})
renderer.setSize(size.width, size.height)
renderer.render(scene, camera)
