import { TFacility } from "./Facility"
import { TUser } from "./user.type"

export interface TBooking {
    _id: string
    date: string
    startTime: string
    endTime: string
    user: TUser
    facility: TFacility
    payableAmount: number
    isBooked: string
    createdAt: string
    updatedAt: string
    status?: boolean
    __v: number
  }
  
  
 
  
  