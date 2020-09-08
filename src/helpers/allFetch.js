const allFetch = async (values) => {
  try {
    return await Promise.all(values).then((response) => response);
  } catch (error) {
    return {
      status: 500,
      error,
    };
  }
};

export default allFetch;
