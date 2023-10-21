import Modal from "../pop-up/Modal";
import Button from "../share/Button";

interface CardViewTypes {
  isOpen?: boolean;
  onChangeStatus?: () => void;
}
const CardSurprice = ({ isOpen, onChangeStatus }: CardViewTypes) => {
  const handleClosing = () => {
    onChangeStatus?.();
  };
  return (
    <Modal
      widthModal="min-w-[85vw] lg:min-w-[30vw] max-w-[90vw] md:max-w-[40vw] h-[70vh] lg:h-[70vh]"
      isOpen={isOpen}
      onChangeStatus={handleClosing}
    >
      <div className="bg-[#323232] text-[#f2f2f2] w-full h-full overflow-y-auto rounded-md px-2 pb-2 relative">
        <div className="sticky top-0 w-full flex z-10 border-t-4 border-[#323232] ">
          <Button
            icon="close"
            className="ml-auto h-7 bg-[#f2f2f2]  rounded-full px-[2px] hover:rotate-90 duration-500 "
            onClick={handleClosing}
          />
        </div>
        <div className="flex flex-col gap-2 p-2">
          <h2 className="text-3xl text-center">
            Holaaaa, gracias por haber llegado hasta aqui!
          </h2>
          <p className="text-justify p-3">
            Te quiero agradecer por el apoyo, por darme ganas en los dias que
            ando de la verga, por preocuparte en mi salud
            <b>{" (que yo si lo descuido mucho xd) "}</b>y sobre todo por ser
            muy fuerte con todo, en fin gracias por todo <b>Leilin</b> :3
            <b>{" <3!"}</b>
          </p>
          <img src="https://i.gifer.com/JTHf.gif" className="h-[15rem] w-[20rem] mx-auto "/>
          <p className="text-center p-3">Atte: Tu humilde servidor</p>
          <p className="text-right p-3">
            Psdt: No te olvides de comer bien y abrigarte...
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default CardSurprice;
