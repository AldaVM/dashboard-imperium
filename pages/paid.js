import React from "react";
import { LayoutAdmin } from "../src/layouts";
import { ClientProvider } from "../src/providers";
import { ProtectRoute } from "../src/hoc/privateRouter";
import PaidWrapper from "../src/components/Voucher/PaidWrapper";

function Paid() {
  const client = {
    names: "",
    surnames: "",
    dni: "",
    type_modality: "",
    turn: "",
  };

  return (
    <ClientProvider
      initialValues={{
        client: client,
      }}
    >
      <LayoutAdmin>
        <PaidWrapper />
      </LayoutAdmin>
    </ClientProvider>
  );
}

export default ProtectRoute(Paid);
