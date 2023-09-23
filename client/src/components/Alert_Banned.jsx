import { Alert } from "antd";
import React from "react";

export default function Alert_Banned({ setAlertBan }) {
  const onClose = (e) => {
    setAlertBan(false);
  };
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 flex items-center justify-center">
        <Alert
          message="The account is locked"
          description="Your account has been blocked due to our book violations, please contact the manager to learn more"
          type="error"
          closable
          onClose={onClose}
        />
      </div>
    </>
  );
}
