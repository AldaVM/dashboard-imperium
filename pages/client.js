import React from 'react';
import { LayoutAdmin } from '../src/Layouts';
import { ProtectRoute } from '../src/hoc/privateRouter';

function Client() {
    return (
        <>
        <LayoutAdmin>
            <p>Lista de clientes</p>
        </LayoutAdmin>
        </>
    )
}

export default ProtectRoute(Client);