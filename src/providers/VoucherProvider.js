import { VoucherContext } from "../context";
import { useState } from "react";
import serviceFetch from "../helpers/closureFetch";
import validateResponse from "../helpers/validationsReponse";

export default function VoucherProvider({ children, initialValues }) {
  const [voucher, setVoucher] = useState(initialValues.voucher);
  const [vouchers, setVouchers] = useState(initialValues.vouchers);
  const [countVouchers, setCountVouchers] = useState(
    initialValues.countVouchers
  );

  async function getVouchers(pageNum) {
    try {
      const { get } = serviceFetch(`voucher?pageSize=10&pageNum=${pageNum}`);
      const response = await get();

      validateResponse(response.status, "Listando Vouchers");
      setVouchers(response?.data?.records);
      setCountVouchers(response?.data?.count);
    } catch (error) {
      validateResponse(error.status, "Error to request");
      setVouchers([]);
      setCountVouchers(0);
    }
  }

  async function createVoucher(customer, body_voucher) {
    try {
      const { create } = serviceFetch("voucher");
      const response = await create({
        customer,
        ...body_voucher,
      });

      validateResponse(response.status, "Nuevo voucher registrado");
    } catch (error) {
      validateResponse(error.status, "Error to request");
    }
  }

  async function updateVoucher(idVoucher, bodyVocher) {
    try {
      const { update } = serviceFetch(`voucher/${idVoucher}`);
      const response = await update({
        ...bodyVocher,
      });
      validateResponse(response.status, "Se actualizo el comprobante");
    } catch (error) {
      validateResponse(error.status, "Error to request");
    }
  }

  async function deleteVoucher(idVoucher) {
    try {
      const { deleteData } = serviceFetch(`voucher/${idVoucher}`);
      const response = await deleteData();
      validateResponse(response.status, "Se elimino el comprobante");
    } catch (error) {
      validateResponse(error.status, "Error to request");
    }
  }

  return (
    <VoucherContext.Provider
      value={{
        voucher,
        vouchers,
        countVouchers,
        getVouchers,
        createVoucher,
        updateVoucher,
        deleteVoucher,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
}
