interface ChipInfoProps {
  icon?: string;
  text?: string | number;
  className?: string;
}
const ChipInfo = ({ icon, text, className }: ChipInfoProps) => {
  return (
    <div className={`h-12 flex items-center gap-2 ${className} `}>
      {icon && <img className="h-8 w-8"
       src={`/svg/${icon}.svg`} alt="" />}
      <span className="text-white capitalize">
        <b>{text}</b>
      </span>
    </div>
  );
};

export default ChipInfo;
