import numeral from 'numeral';

export const currency = (value: string | number) => {
  return numeral(value).format('0.0,0');
};
