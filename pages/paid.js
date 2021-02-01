import React from "react";
import { LayoutAdmin } from "../src/layouts";
import { ClientProvider, VoucherProvider } from "../src/providers";
import { ProtectRoute } from "../src/hoc/privateRouter";
import PaidWrapper from "../src/components/Voucher/PaidWrapper";

function Paid() {
  const client = {
    names: "",
    surnames: "",
    dni: "",
    type_modality: "",
    turn: "",
    status_paid: "",
    timetable: [],
  };

  return (
    <ClientProvider
      initialValues={{
        client: client,
      }}
    >
      <LayoutAdmin>
        <VoucherProvider
          initialValues={{
            voucher: {},
            vouchers: [],
          }}
        >
          <PaidWrapper />
        </VoucherProvider>
      </LayoutAdmin>
    </ClientProvider>
  );
}

export default ProtectRoute(Paid);
