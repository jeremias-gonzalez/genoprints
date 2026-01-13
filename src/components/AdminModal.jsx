import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";

export const AdminModal = ({ isOpen, onClose, title, children, actionLabel, onAction, color = "primary", size = "md" }) => {
  return (
    <Modal 
      backdrop="blur" 
      isOpen={isOpen} 
      onClose={onClose}
      size={size}
      classNames={{
        backdrop: "bg-slate-900/50 backdrop-blur-md",
        base: "border-[#292f46] bg-white rounded-[2rem]",
        header: "border-b-[1px] border-slate-100 font-bold text-xl",
        footer: "border-t-[1px] border-slate-100",
        closeButton: "hover:bg-slate-100 active:bg-slate-200",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody className="py-6">
              {children}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose} className="font-bold">
                Cancelar
              </Button>
              <Button color={color} onPress={onAction} className="font-bold shadow-lg">
                {actionLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};