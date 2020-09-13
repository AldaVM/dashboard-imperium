import { Typography } from "antd";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";
import CardUser from "../CardUser";
import moment from "moment";

const { Title } = Typography;

const objectoToArray = (obj) => {
  return Object.keys(obj).reduce((acu, currentKey) => {
    if (currentKey === "createdAt") {
      acu.push({
        title: currentKey,
        value: moment(obj[currentKey]).format("LLL"),
      });
    } else {
      acu.push({
        title: currentKey,
        value: obj[currentKey],
      });
    }

    return acu;
  }, []);
};

export default function WrapperUser() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Title>Datos de Usuario</Title>
      <CardUser user={objectoToArray(user)} />
    </>
  );
}
