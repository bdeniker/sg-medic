import type { Wound } from '@/assets/wounds'
import wounds from '@/assets/wounds'

export default function getWound(id: number): Wound | null {
    if (id === undefined || isNaN(id) || wounds[id] === undefined) {
        console.error(`Invalid wound id: ${id}`)
        return null
    }
    console.log(`Get wound #${id}`)
    return wounds[id]
}
