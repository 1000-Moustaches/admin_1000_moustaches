declare global {
  namespace Express {
    export interface Request {
      authToken?: string;
      authEmail?: string;
      authUser?: any;
      authId?: string;
    }
  }
}

export {};