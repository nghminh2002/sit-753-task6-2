export const formatIndex = (
  index: number | null | undefined,
  questionIndex: number | string | null | undefined
) => {
  if (questionIndex) {
    if (typeof questionIndex === 'number' && questionIndex < 10) {
      return `0${questionIndex}`;
    } else {
      if (typeof questionIndex === 'string' && questionIndex.includes('-')) {
        return '';
      }
      return `${questionIndex}`;
    }
  }
  if (index) {
    if (index < 9) {
      return `0${index + 1}`;
    } else {
      return `${index}`;
    }
  }
  return '01';
};

export const splitText = (text: string, separator?: string) => {
  return text.split(separator ? separator : ',').map((a) => a.trim());
};

export const ceilToDecimal = (number: number, decimalPlaces: number) => {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(number * multiplier) / multiplier;
};
