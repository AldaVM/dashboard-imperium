export default async function fetchData(url, config) {
  try {
    const data = await fetch(url, config);
    return await data.json();
  } catch (error) {
    return error;
  }
}
