import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/Home";
import Cadastro from "./screens/Cadastro";
import GlobalStyle from "./GlobalStyle";
import { UsuarioProvider } from "./context/UsuarioContext";
import { TransacaoProvider } from "./context/TransacoesContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Cadastro />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStyle />
    <UsuarioProvider>
      <TransacaoProvider>
        <RouterProvider router={router} />
      </TransacaoProvider>
    </UsuarioProvider>
  </StrictMode>
);
