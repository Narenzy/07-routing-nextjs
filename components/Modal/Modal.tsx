import css from "./Modal.module.css";
import type { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface ModalProp {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProp) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={css.modal}>{children}</div>
    </div>,
    document.body,
  );
}
