import React from "react";
import { LayoutAdmin } from "../src/layouts";
import { ProtectRoute } from "../src/hoc";

function Admin() {
  return (
    <>
      <LayoutAdmin>
        <h2>este es el panel principal</h2>
      </LayoutAdmin>
    </>
  );
}

export default ProtectRoute(Admin);
