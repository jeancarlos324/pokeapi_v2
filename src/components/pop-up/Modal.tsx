import { dropIn } from "../../../public/animations/animations";
import Portal from "./Portal";
import { motion } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  isOpen?: boolean;
  widthModal?: string;
  onChangeStatus?: () => void;
}
const Modal = ({
  children,
  isOpen,
  widthModal,
  onChangeStatus,
}: ModalProps) => {
  // const navigate = useNavigate();
  if (!isOpen) return null;
  return (
    <Portal wrapperId="modal">
      <motion.div
        onClick={onChangeStatus}
        role="dialog"
        className="fixed flex top-0 left-0 h-screen w-screen  overflow-y-hidden items-center justify-center bg-[#00000062] z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={`${widthModal} items-center rounded-input`}
          onClick={(e) => e.stopPropagation()}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
        </motion.div>
      </motion.div>
    </Portal>
  );
};

export default Modal;
