import type { source } from './Resources'
import px from '@/assets/textures/Park3Med/px.jpg'
import nx from '@/assets/textures/Park3Med/nx.jpg'
import py from '@/assets/textures/Park3Med/py.jpg'
import ny from '@/assets/textures/Park3Med/ny.jpg'
import pz from '@/assets/textures/Park3Med/pz.jpg'
import nz from '@/assets/textures/Park3Med/nz.jpg'

const sources: source[] = [
  {
    name: 'environmentTexture',
    type: 'cubeTexture',
    path: [px, nx, py, ny, pz, nz]
  }
]

export default sources
