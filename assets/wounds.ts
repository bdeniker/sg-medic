import woundsJSON from './wounds.json'

export type Wound = {
    id: number
    isWhite: boolean
    name: string
    category: string // 'First Aid' | 'Surgical Procedure' | 'Psychology'
    symptoms: string
    untilTreated: string
    diagnosticTitle?: string
    diagnosis: string
    mechanics?: string
    cards: string[]
    failure: string
}

const wounds: Wound[] = []
woundsJSON.forEach(wound => {
    wounds[wound.id] = wound
})

export default wounds
