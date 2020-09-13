import React from "react";
import { LayoutAdmin } from "../src/layouts";
import { ProtectRoute } from "../src/hoc";
import WrapperUser from "../src/components/User/WrapperUser";

function Admin() {
  return (
    <>
      <LayoutAdmin>
        <WrapperUser />
      </LayoutAdmin>
    </>
  );
}

export default ProtectRoute(Admin);
