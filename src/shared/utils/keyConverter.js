import humps from 'humps'

const convertCallback = (key, convert) => {
    const lastSymbol = key.slice(-1);
    const newKey = convert(key);
    return lastSymbol === "-" ? `${newKey}-` : newKey;
};

export const camelize = (obj) => humps.camelizeKeys(obj, convertCallback);

export const decamelize = (object) => {
    if (object && !(object instanceof File)) {
        if (object instanceof Array) {
            return object.map((item) => decamelize(item))
        }
        if (typeof object === 'object') {
            return Object.keys(object).reduce(
                (acc, next) => ({
                    ...acc,
                    [humps.decamelize(next)]: decamelize(object[next]),
                }),
                {}
            )
        }
    }

    return object
}

export const decamelizeStr = (str) => {

    const separator = '_';

    return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}



