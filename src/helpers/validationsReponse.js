import { notification } from "antd";

const validateResponse = (status, message) => {
  switch (status) {
    case 200:
      notification.success({
        message: `${message}`,
        placement: "topRight",
        style: { width: 300 },
      });
      break;
    case 201:
      notification.success({
        message: `Create ${message}`,
        placement: "topRight",
        style: { width: 300 },
      });
      break;
    case 404:
      notification.warning({
        message: `No found ${message}`,
        placement: "topRight",
        style: { width: 300 },
      });
      break;
    case 500:
      notification.error({
        message: `${message}`,
        placement: "topRight",
        style: { width: 300 },
      });
      break;
    default:
      notification.error({
        message: `Algo anda mal!`,
        placement: "topRight",
        style: { width: 300 },
      });
      break;
  }
};

export default validateResponse;
