import React from "react";
import Head from "next/head";
import AdminContainer from "../../components/Admin/index.";
import { useAuth } from "../../hooks";

export default function LayoutAdmin({ children }) {

  const { isAuthenticated} = useAuth();
  //si no esta autenticado no retorna nada
  if(!isAuthenticated)return  null;
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/png" href="" />
        <meta name="author" content="Aldair Valencia <aldairvm95@gmail>" />
        <meta name="keywords" content="Dashboard Imperium Cross" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard</title>
      </Head>
      
     <AdminContainer>
         {children}
     </AdminContainer>
    </>
  );
}
