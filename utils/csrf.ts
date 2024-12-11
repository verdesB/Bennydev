import { v4 as uuidv4 } from 'uuid';

export const generateCsrfToken = () => {
  return uuidv4();
};

export const validateCsrfToken = (token: string) => {
  return token === process.env.CSRF_TOKEN;
}; 