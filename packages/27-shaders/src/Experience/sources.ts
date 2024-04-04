import type { source } from './Resources'
// 环境贴图
import px from '@/assets/textures/Park3Med/px.jpg'
import nx from '@/assets/textures/Park3Med/nx.jpg'
import py from '@/assets/textures/Park3Med/py.jpg'
import ny from '@/assets/textures/Park3Med/ny.jpg'
import pz from '@/assets/textures/Park3Med/pz.jpg'
import nz from '@/assets/textures/Park3Med/nz.jpg'
// 地板图
import hardwood2_bump from '@/assets/textures/floor/hardwood2_bump.jpg'
import hardwood2_diffuse from '@/assets/textures/floor/hardwood2_diffuse.jpg'
import hardwood2_roughness from '@/assets/textures/floor/hardwood2_roughness.jpg'
// 国旗
import guoqi from '@/assets/textures/guoqi.jpg'

const sources: source[] = [
  // {
  //   name: 'environmentTexture',
  //   type: 'cubeTexture',
  //   path: [px, nx, py, ny, pz, nz]
  // },
  // {
  //   name: 'floorTextureBump',
  //   type: 'texture',
  //   path: hardwood2_bump
  // },
  // {
  //   name: 'floorTextureDiffuse',
  //   type: 'texture',
  //   path: hardwood2_diffuse
  // },
  // {
  //   name: 'floorTextureRoughness',
  //   type: 'texture',
  //   path: hardwood2_roughness
  // }
  {
    name: 'shaderTexture',
    type: 'texture',
    path: guoqi
  }
]

export default sources
