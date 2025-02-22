import jwt from 'jsonwebtoken';


let JWT_SECRET : string = process.env.JWT_SECRET || '';
// setTimeout(() => {
//     JWT_SECRET = process.env.JWT_SECRET || '';4
// }, 0);
export const verifyToken = (token: string) => {
  try {
    console.log(JWT_SECRET, token);
    
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
};