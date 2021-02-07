import React from "react";
import { VoucherProvider, ClientProvider } from "../src/providers";
import { LayoutAdmin } from "../src/layouts";
import { ProtectRoute } from "../src/hoc/privateRouter";
import { addElementKey } from "../src/helpers/parseValues";
import { URL_API } from "../src/constants";
import VouchersWrapper from "../src/components/Voucher/Vouchers";

function Vouchers({ vouchers, countVouchers }) {
  return (
    <VoucherProvider
      initialValues={{
        vouchers,
        countVouchers,
      }}
    >
      <ClientProvider
        initialValues={{
          clients: [],
          countClients: 0,
        }}
      >
        <LayoutAdmin>
          <VouchersWrapper />
        </LayoutAdmin>
      </ClientProvider>
    </VoucherProvider>
  );
}

export async function getServerSideProps(context) {
  try {
    const res = await fetch(`${URL_API}/voucher?pageSize=10&pageNum=1`);
    const json = await res.json();

    return {
      props: {
        vouchers: addElementKey(json?.data.records),
        countVouchers: json?.data.count,
      },
    };
  } catch (error) {
    return {
      props: {
        vouchers: [],
        countVouchers: 0,
      },
    };
  }
}

export default ProtectRoute(Vouchers);
