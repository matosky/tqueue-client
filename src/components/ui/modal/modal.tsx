import React, { useState } from "react";
import "./modal.styles.css";

interface InstructionModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  const closeModalHandler = () => {
    setIsModalOpen(false);
    closeModal();
  };

  return (
    <div className="modal-content">
      <h2>Instructions</h2>
      <p>
        To schedule a delivery, simply drag and drop a customer from the
        Customer Table to the Delivery Table on the Queuing page.
      </p>
      <p>Follow these steps:</p>
      <ol>
        <li>Drag a customer from the Customer Table.</li>
        <li>Drop the customer onto the desired slot in the Delivery Table.</li>
      </ol>
      <button onClick={closeModalHandler}>Got It</button>
    </div>
  );
};

export default InstructionModal;
