import ShiftCard from "../ShiftCard";
import { Typography } from "antd";
import { useContext, useState } from "react";
import serviceFetch from "../../../helpers/closureFetch";
import allFetch from "../../../helpers/allFetch";
import validateResponse from "../../../helpers/validationsReponse";
import { ShiftContext } from "../../../context";
import Modal from "antd/lib/modal/Modal";
import FormUpdateCustomer from "../../Form/FormUpdateCustomer";
import { GridCustomer } from "./Styled";

const { Title } = Typography;

export default function ShiftWrapper() {
  const { shift, updateShift } = useContext(ShiftContext);
  const [isVisible, setIsVisible] = useState(false);
  const [customer, setCustomer] = useState({});
  const { customers, _id } = shift;

  function editClient(idClient) {
    showModal();
    const [client] = customers.filter((customer) => customer._id === idClient);
    setCustomer(client);
  }

  function showModal() {
    setIsVisible(!isVisible);
  }

  function handleCancel() {
    setIsVisible(false);
  }

  function handleOk() {
    setIsVisible(false);
  }

  const update = () => {
    updateShift(_id);
  };

  async function removeClientOfShift(id) {
    try {
      const { create } = serviceFetch(`timetable/delete_customer/${_id}`);
      const deleteOfShift = create({
        customer: id,
      });

      const { update } = serviceFetch(`customer/delete_timetable/${id}`);
      const updateCustomer = update();

      const [responseShift] = await allFetch([deleteOfShift, updateCustomer]);
      validateResponse(responseShift.status, "Client deleted of the Shift");
      updateShift(_id);
    } catch (error) {
      validateResponse(error.status, "Client deleted of the Shift");
    }
  }

  return (
    <div>
      <Title>Detalle de Turno</Title>
      <Modal
        title="Editar Cliente"
        visible={isVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <FormUpdateCustomer initialValues={customer} updatedValues={update} />
      </Modal>
      {customers.length > 0 ? (
        <GridCustomer>
          {customers.map((customer) => (
            <ShiftCard
              key={customer._id}
              {...customer}
              onDeleteClient={removeClientOfShift}
              editClient={editClient}
            />
          ))}
        </GridCustomer>
      ) : (
        <span>Este turno aún no cuenta con clientes</span>
      )}
    </div>
  );
}
