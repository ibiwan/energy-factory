import { CANISTERS } from './canisters'
import { REFLECTORS } from './reflectors'
import { CAPACITORS } from './capacitors'
import { HEAT_VENTS } from './heatVents'
import { HEAT_EXCHANGERS } from './heatExchangers'
import { HEAT_INLETS } from './heatInlets'
import { HEAT_OUTLETS } from './heatOutlets'

export const TOOLS = {
  ...CANISTERS,
  ...REFLECTORS,
  ...CAPACITORS,
  ...HEAT_VENTS,
  ...HEAT_EXCHANGERS,
  ...HEAT_INLETS,
  ...HEAT_OUTLETS,
}

// Sparse layout: [index, toolKey]
export const TOOL_LAYOUT = [
  [0, 'canister'],
  [35, 'capacitor'],
]
