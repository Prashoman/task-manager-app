import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {

    userRole: string;
  
    // add other properties if needed
  
  }


export const TokenDecoder = (Token: string ) => {
    return jwtDecode<CustomJwtPayload>(Token);
}