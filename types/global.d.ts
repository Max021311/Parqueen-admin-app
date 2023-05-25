interface ParkingPlace {
  id: number
  slug: string
  type: 'normal'|'big'|'worker'|"special"
  position: {
    type: 'Point'
    coordinates: [number, number]
  }
  isActive: boolean
  tickets: undefined | TicketData[]
}

interface TicketData {
  /** @description ISO date */
  id: number
  entry_date: string
  parking_place_id: number
  departure_date: string | null
  parking_place: ParkingPlace
}
