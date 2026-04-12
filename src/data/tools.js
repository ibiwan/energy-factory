export const TOOLS = {
  canister: {
    name: 'Uranium',
    type: 'canister',
    tier: 1,
    cost: 10,
    pulses: 1,
    power: 1,
    heat: 1,
    life: 15,
    description: 'Basic fuel canister. Generates power and heat until depleted.',
  },
  battery: {
    name: 'Battery',
    type: 'battery',
    tier: 1,
    cost: 25,
    powerCapacity: 50,
    heatCapacity: 10,
    description: 'Increases max power storage by 50. Absorbs heat from neighbors but explodes if overloaded.',
  },
}

// Sparse layout: [index, toolKey]
export const TOOL_LAYOUT = [
  [0, 'canister'],
  [35, 'battery'],
]
