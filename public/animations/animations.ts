export const showAnimation = {
  initial: {
    color: "#1B2F3A",
    backgroundColor: "#ffffff00",
    fill: "#ffffff",
    borderRadius: 5,
  },
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    opacity: 1,
    width: "auto",
    transition: {
      duration: 0.3,
    },
  },
};
export const buttonAnimation = {
  initial: {
    borderRadius: "15px",
    borderColor: "#000000",
    backgroundColor: "#00A7E1",
    //backgroundColor: "#000000",
    fill: "#ffffff",
    color: "#ffffff",
  },
  focus: {
    fill: "#00A7E1",
  },
  hover: {
    scale: 1.1,
    backgroundColor: "#ffffff",
    color: "#00A7E1",
    borderRadius: "15px",
    fill: "#00A7E1",
    transition: {
      duration: 0.3,
    },
  },
};
export const navActive = {
  color: "#00A7E1",
  fill: "#00A7E1",
  backgroundColor: "#ffffff",
  padding: "1.8px",
  opacity: "90%",
  borderRadius: "15px",
};
export const navInactive = {
  fill: "#ffffff",
  color: "#ffffff",
  textDecoration: "none",
};

export const servActive = {
  color: "#00A7E1",
  fill: "#00A7E1",
  // backgroundColor: "#ffffff",
  padding: "1.8px",
  opacity: "90%",
  borderRadius: "15px",
};
export const servInactive = {
  fill: "#4B555B",
  color: "#4B555B",
  textDecoration: "none",
};

export const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

export const container = {
  hidden: {
    opacity: 0,
    transition: {
      delay: 0.5,
      duration: 0.3,
    },
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerDirection: -1,
    },
  },
};

export const chipPriceAniation = {
  initial: {
    color: "#1B2F3A",
    backgroundColor: "#ffffff00",
    fill: "#ffffff",
    borderRadius: 5,
  },
  hover: {
    color: "#9381E5",
    opacity: 1,
    backgroundColor: "#CBC6E4",
    fill: "#9381E5",
    borderRadius: 10,
  },
};
//className="flex  text-white gap-3 p-2"

export const imageAnimate = {
  offscreen: { y: -40, x: 0, opacity: 0 },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.5, duration: 1.2 },
  },
};