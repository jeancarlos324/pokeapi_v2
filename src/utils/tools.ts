export const toCapitalizeCase = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const addToCero = (value?: number, quantity: number = 4) => {
  return value?.toString().padStart(quantity, "0");
};
