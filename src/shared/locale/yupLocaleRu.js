/* eslint-disable no-template-curly-in-string */
export const mixed = {
  default: "${path} не действителен",
  required: "${path} не может быть пустым",
  oneOf:
    "${path} должно соответствовать одному из следующих значений: ${values}",
  notOneOf:
    "${path} не должно соответствовать ни одному из следующих значений: ${values}",
};

export const string = {
  length: "${path} должно быть равно ${length}.",
  min: "${path} должны быть не менее ${min} символов длиной.",
  max: "${path} не должны быть длиннее ${max} символов.",
  matches: '${path} должен выглядеть вот так: "${regex}"',
  email: "${path} должен содержать корректный адрес электронной почты",
  url: "${path} должен быть корректный URL-адрес",
  trim: "${path} не должно содержать пробелов в начале или в конце",
  lowercase: "${path} может содержать только строчные буквы",
  uppercase: "${path} может содержать только заглавные буквы",
};

export const number = {
  min: "${path} должно быть больше или равняться ${min}.",
  max: "${path} должно быть меньше или равняться ${max}.",
  lessThan: "${path} должен быть меньше ${less}",
  moreThan: "${path} должно быть больше, чем ${more}",
  length: '${path} количество символов должно равняться "${regex}"',
  notEqual: '${path} не должен совпадать с "${notEqual}"',
  positive: "${path} должно быть положительное число",
  negative: "${path} должно быть отрицательное число",
  integer: "${path} должно быть целое число",
};

export const date = {
  min: "${path} должен быть позже ${min}",
  max: "${path} должен быть раньше ${max}",
};

export const boolean = {};

export const object = {
  noUnknown:
    '${path}-В поле не должны использоваться аттрибуты, которые не определены в "Object shape"',
};

export const array = {
  min: "${path}-поле должно быть не менее ${min} записей",
  max: "${path}-поле может иметь максимум ${max} записей.",
};

export default {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
};
