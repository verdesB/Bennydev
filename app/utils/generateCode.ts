/**
 * Génère un code projet unique au format PRJ-YYYYMM-XXXX
 * où XXXX est une combinaison aléatoire de lettres et chiffres
 */
export const generateProjectCode = (): string => {
  // Obtenir la date actuelle
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  
  // Générer la partie aléatoire
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomPart = '';
  
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    randomPart += chars[randomIndex];
  }
  
  // Assembler le code final
  return `PRJ-${year}${month}-${randomPart}`;
};

/**
 * Vérifie si un code projet est valide
 */
export const isValidProjectCode = (code: string): boolean => {
  const pattern = /^PRJ-\d{6}-[A-Z0-9]{4}$/;
  return pattern.test(code);
};

/**
 * Extrait la date d'un code projet
 */
export const getProjectDateFromCode = (code: string): Date | null => {
  if (!isValidProjectCode(code)) return null;
  
  const datePart = code.split('-')[1];
  const year = parseInt(datePart.substring(0, 4));
  const month = parseInt(datePart.substring(4, 6)) - 1;
  
  return new Date(year, month);
}; 