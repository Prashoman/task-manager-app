export interface TFacility {
    _id?: string
    name: string
    description: string
    pricePerHour: number | string
    image: string
    count?: string
    location: string
    isDeleted?: boolean
    createdAt?: string
    updatedAt?: string
    __v?: number
  }