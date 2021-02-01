import { URL_API } from "../constants";
import Cookies from "js-cookie";

const serviceFetch = (url) => (service) => {
  const URL = `${url}/${service}`;

  return {
    get: async (
      config = {
        token: "anyToken",
      }
    ) => {
      try {
        const response = await fetch(URL, {
          method: "GET",
          mode: "cors",
          ...config,
        });
        return await response.json();
      } catch (error) {
        return {
          status: 500,
          error,
        };
      }
    },
    create: async (
      values,
      config = {
        token: "anyToken",
      }
    ) => {
      try {
        const response = await fetch(URL, {
          method: "POST",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          ...config,
        });
        return await response.json();
      } catch (error) {
        return {
          status: 500,
          error,
        };
      }
    },
    update: async (
      values,
      config = {
        token: "anyToken",
      }
    ) => {
      try {
        const response = await fetch(URL, {
          method: "PUT",
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          ...config,
        });
        return await response.json();
      } catch (error) {
        return {
          status: 500,
          error,
        };
      }
    },
    deleteData: async (
      config = {
        token: "anyToken",
      }
    ) => {
      try {
        const response = await fetch(URL, {
          method: "DELETE",
          mode: "cors",
          headers: {
            token: Cookies.get("token"),
            Authorization: Cookies.get("token"),
          },
        });
        return await response.json();
      } catch (error) {
        return {
          status: 500,
          error,
        };
      }
    },
  };
};

export default serviceFetch(URL_API);
