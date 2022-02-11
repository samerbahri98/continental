import React, { PropsWithChildren } from "react";
import { ContainersProvider } from "./ContainersContexts";
import { UserProvider } from "./UserContexts";

export default function ContextProvider(props: PropsWithChildren<{}>) {
  return (
    <UserProvider>
      <ContainersProvider>{props.children}</ContainersProvider>
    </UserProvider>
  );
}
