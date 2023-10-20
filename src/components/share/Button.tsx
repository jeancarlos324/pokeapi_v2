import { MotionStyle, motion } from "framer-motion";
interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled: boolean;
  icon?: string;
  style?: MotionStyle;
}

const Button = ({
  text,
  className,
  onClick,
  disabled,
  icon,
  style,
}: ButtonProps) => {
  return (
    <motion.button
      className={`${className} cursor-pointer`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {icon && <img src={`svg/${icon}.svg`} className="h-4/5 w-6 cursor-pointer" />}
      {text}
    </motion.button>
  );
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
