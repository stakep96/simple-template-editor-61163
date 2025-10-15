export const fontCombinations = [
  {
    id: 'inter',
    name: 'Inter',
    titleFont: 'Inter',
    textFont: '(Padrão)',
    titleFamily: 'Inter, sans-serif',
    textFamily: 'Inter, sans-serif',
  },
  {
    id: 'pacifico-inter',
    name: 'Pacifico + Inter',
    titleFont: 'Pacifico',
    textFont: 'Inter',
    titleFamily: 'Pacifico, cursive',
    textFamily: 'Inter, sans-serif',
  },
  {
    id: 'playfair-opensans',
    name: 'Playfair + Open Sans',
    titleFont: 'Playfair Display',
    textFont: 'Open Sans',
    titleFamily: 'Playfair Display, serif',
    textFamily: 'Open Sans, sans-serif',
  },
  {
    id: 'montserrat-roboto',
    name: 'Montserrat + Roboto',
    titleFont: 'Montserrat',
    textFont: 'Roboto',
    titleFamily: 'Montserrat, sans-serif',
    textFamily: 'Roboto, sans-serif',
  },
  {
    id: 'lora-lato',
    name: 'Lora + Lato',
    titleFont: 'Lora',
    textFont: 'Lato',
    titleFamily: 'Lora, serif',
    textFamily: 'Lato, sans-serif',
  },
];

export const getFontCombination = (id: string) => {
  return fontCombinations.find(combo => combo.id === id) || fontCombinations[0];
};
