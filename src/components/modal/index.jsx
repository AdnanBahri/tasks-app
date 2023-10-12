import * as React from "react";
import { Modal, Portal } from "react-native-paper";

const DialogModal = ({ visible, hide, children }) => {
  const containerStyle = {
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hide}
        contentContainerStyle={containerStyle}
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </Modal>
    </Portal>
  );
};

export default DialogModal;
