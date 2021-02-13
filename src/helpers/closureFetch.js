import { URL_API } from "../constants";
import Cookies from "js-cookie";
import download from "downloadjs";

const serviceFetch = (url) => (service) => {
  const URL = `${url}/${service}`;

  return {
    get: async (config) => {
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
    downloadFile: async (config, filename, typeFile) => {
      try {
        fetch(URL, {
          method: "GET",
          ...config,
        })
          .then((res) => res.blob())
          .then((blob) => {
            download(blob, filename, typeFile);
          });

        return {
          status: 200,
        };
      } catch (error) {
        return {
          status: 500,
          error,
        };
      }
    },
    create: async (values, config) => {
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
    update: async (values, config) => {
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
    deleteData: async (config) => {
      try {
        const response = await fetch(URL, {
          method: "DELETE",
          mode: "cors",
          headers: {
            token: Cookies.get("token"),
            Authorization: Cookies.get("token"),
          },
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
  };
};

export default serviceFetch(URL_API);
