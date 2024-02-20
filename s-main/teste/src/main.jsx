import * as React from "react";
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./index.css";
import App from "./App";
import CadastroVendas from "./pages/cadastro/CadastroVendas.jsx";
import CadastroClientes from "./pages/cadastro/CadastroClientes.jsx";
import ListagemClientes from "./pages/listagem/ListagemClientes.jsx";
import ListagemVendas from "./pages/listagem/ListagemVendas.jsx";
import Login from "./pages/login/Login.jsx";
import Home from './pages/home/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "app",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "cadastro",
        children: [
          {
            path: "clientes",
            element: <CadastroClientes />,
          },
          {
            path: "vendas",
            element: <CadastroVendas />            
          },
          {
            path: "vendas/:id",
            element: <CadastroVendas />
          }
        ],
      },
      {
        path: "listagem",
        children: [
          {
            path: "clientes",
            element: <ListagemClientes />,
          },
          {
            path: "vendas",
            element: <ListagemVendas />,
          },
        ],
      },
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>

      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);