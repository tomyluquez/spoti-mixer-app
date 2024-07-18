export const checkValidateToken = (): boolean => {
  const storedData = localStorage.getItem("access_token_data");
  if (storedData) {
    const data = JSON.parse(storedData);
    const currentTime = Date.now();
    return currentTime > data.expirationTime;
  }
  return true; // Si no hay datos almacenados, el token está considerado como expirado
};
