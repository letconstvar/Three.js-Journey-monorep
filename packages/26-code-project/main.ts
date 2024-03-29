import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'lil-gui'
import Experience from '@/Experience'

const el = document.querySelector<HTMLElement>('#app')
const experience = new Experience(el)
console.log(experience)