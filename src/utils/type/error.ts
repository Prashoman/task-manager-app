export interface TError {
    data: Data
  }

export interface Data {
    success: boolean
    message: string
    errorSources: ErrorSource[]
    err: Err
    stack: string
  }
  
  export interface ErrorSource {
    path: string
    message: string
  }
  
  export interface Err {
    statusCode: number
  }