import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'

export type source = {
  name: string
  type: 'gltfModel' | 'texture' | 'cubeTexture' | 'hdrModel'
  path: string[] | string
}

type loaders = {
  gltfLoader: GLTFLoader
  textureLoader: THREE.TextureLoader
  cubeTextureLoader: THREE.CubeTextureLoader
  RGBELoader: RGBELoader
}

type file = THREE.CubeTexture | THREE.Texture | GLTF | RGBELoader

export default class Resources extends EventTarget {
  sources: source[]
  toLoad: number
  loaded: number
  loaders: loaders
  items: Record<string, file>

  constructor(sources: source[]) {
    super()

    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
      RGBELoader: new RGBELoader()
    }
  }

  startLoading() {
    console.log('start loading')
    if (this.loaded === this.toLoad) {
      setTimeout(() => {
        this.dispatchEvent(new Event('ready'))
      })
    }

    for (const source of this.sources) {
      if (source.type === 'hdrModel') {
        this.loaders.RGBELoader.load(
          source.path as string,
          (file) => {
            this.sourceLoaded(source, file)
          },
          () => {},
          (err) => {
            console.error(err)
          }
        )
      }
    }

    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(
          source.path as string,
          (file) => {
            this.sourceLoaded(source, file)
          },
          () => {},
          (err) => {
            console.error(err)
          }
        )
      }

      if (source.type === 'texture') {
        this.loaders.textureLoader.load(
          source.path as string,
          (file) => {
            this.sourceLoaded(source, file)
          },
          () => {},
          (err) => {
            console.error(err)
          }
        )
      }

      if (source.type === 'cubeTexture') {
        console.log(source.path)
        this.loaders.cubeTextureLoader.load(
          source.path as string[],
          (file) => {
            this.sourceLoaded(source, file)
          },
          () => {},
          (err) => {
            console.error(err)
          }
        )
      }
    }
  }

  sourceLoaded(source: source, file: file) {
    this.items[source.name] = file
    this.loaded++

    if (this.loaded === this.toLoad) {
      this.dispatchEvent(new Event('ready'))
    }
  }
}
