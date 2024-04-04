import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export type source = {
  name: string
  type: 'gltfModel' | 'texture' | 'cubeTexture'
  path: string[] | string
}

type loaders = {
  gltfLoader: GLTFLoader
  textureLoader: THREE.TextureLoader
  cubeTextureLoader: THREE.CubeTextureLoader
}

type file = THREE.CubeTexture | THREE.Texture | GLTF

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
      cubeTextureLoader: new THREE.CubeTextureLoader()
    }
  }

  startLoading() {
    if (this.loaded === this.toLoad) {
      console.log('all loaded')
      this.dispatchEvent(new Event('ready'))
      return
    }

    for (const source of this.sources) {
      if (source.type === 'gltfModel') {
        this.loaders.gltfLoader.load(
          source.path as string,
          (file) => {
            // console.log('source.path', file)
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
      console.log('all loaded')
      this.dispatchEvent(new Event('ready'))
    }
  }
}
