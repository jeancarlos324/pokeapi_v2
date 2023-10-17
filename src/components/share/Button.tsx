import { MotionStyle, motion } from "framer-motion";
interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled: boolean;
  style?: MotionStyle;
}

const Button = ({ text, className, onClick, disabled, style }: ButtonProps) => {
  return (
    <motion.button
      className={`${className}`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      disabled={disabled}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={style}
    >
      {text}
    </motion.button>
  );
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
