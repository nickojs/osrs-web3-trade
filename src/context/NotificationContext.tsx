/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-use-before-define */
import React, { useContext, useState } from 'react';

export enum ToastType {
  ERROR = 'error',
  SUCCESS = 'success',
  WARNING = 'warning'
}

export type ToastMsg = {
  message: string;
  type: ToastType
  actions?: {
    accept: () => void;
    reject: () => void;
  }
}

export interface ToastProperties {
  toast: ToastMsg;
  show: boolean;
  dismiss: () => void;
  setToast: (data: ToastMsg) => void;
  displayOverride: (value: boolean) => void;
}

const ToastContext = React.createContext<ToastProperties>(
  {} as ToastProperties
);

export const ToastProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<ToastMsg>({} as ToastMsg);
  const [displayMessage, setDisplayMessage] = useState<boolean>(false);

  const displayOverrideHandler = (value: boolean) => setDisplayMessage(value);
  const dismissHandler = () => setDisplayMessage(false);
  const setToastHandler = (data: ToastMsg) => {
    setToast(data);
    setDisplayMessage(true);
  };

  return (
    <ToastContext.Provider
      value={{
        toast,
        show: displayMessage,
        dismiss: dismissHandler,
        setToast: setToastHandler,
        displayOverride: displayOverrideHandler

      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export default (): ToastProperties => {
  const context = useContext(ToastContext);
  return context;
};
