export const addElementKey = (values) => {
  if (values) {
    return values.reduce((acu, value) => {
      acu.push({ ...value, key: value._id });
      return acu;
    }, []);
  }

  return [];
};
