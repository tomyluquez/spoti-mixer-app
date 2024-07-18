import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export interface RootState {
  language: string;
  // Agrega aquí otros estados si es necesario
}

const LangSelect: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("es");

  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <select
      value={language}
      onChange={onChangeLanguage}
      className="select-custom absolute top-4 right-8"
    >
      <option value="es">es</option>
      <option value="en">en</option>
    </select>
  );
};

export default LangSelect;
