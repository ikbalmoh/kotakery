import numeral from 'numeral';

numeral.register('locale', 'id', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'r',
    million: 'j',
    billion: 'm',
    trillion: 't',
  },
  ordinal: function () {
    return '.';
  },
  currency: {
    symbol: 'Rp',
  },
});

numeral.locale('id');

export const currency = (value: string | number) => {
  return numeral(value).format('0,0[.]00');
};
