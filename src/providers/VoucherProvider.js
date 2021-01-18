import { VoucherContext } from "../context";
import { useState } from "react";
import serviceFetch from "../helpers/closureFetch";
import validateResponse from "../helpers/validationsReponse";

export default function VoucherProvider({ children, initialValues }) {
  const [voucher, setVoucher] = useState(initialValues.voucher);

  async function createVoucher(customer, body_voucher) {
    try {
      const { create } = serviceFetch("voucher");
      const response = await create({
        customer,
        ...body_voucher,
      });

      validateResponse(response.status, "Listando turnos");
      setVoucher(response?.data?.records);
      setVoucher(response?.data?.count);
    } catch (error) {
      validateResponse(error.status, "Error to request");
      setVoucher([]);
      setVoucher(0);
    }
  }

  return (
    <VoucherContext.Provider
      value={{
        voucher,
        createVoucher,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
}
