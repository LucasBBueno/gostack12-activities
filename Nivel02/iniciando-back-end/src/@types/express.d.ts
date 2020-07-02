declare namespace Express {
  export interface Request {
    // não substitui, e sim anexa
    user: {
      id: string;
    };
  }
}
