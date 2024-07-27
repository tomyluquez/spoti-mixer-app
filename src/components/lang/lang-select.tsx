import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import esFlag from "../../assets/spain-flag.svg";
import enFlag from "../../assets/uk-flag.svg";

export interface RootState {
  language: string;
  // Agrega aquí otros estados si es necesario
}

const LangSelect: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "es"
  );

  const onChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    i18n.changeLanguage(newLanguage);
  };

  return (
    <>
      <div
        className="fixed top-12 right-[-15px] md:hidden hover:right-0 duration-300 cursor-pointer"
        onClick={toggleLanguage}
      >
        <img
          src={language === "es" ? esFlag : enFlag}
          alt="Spanish Flag"
          className="w-[40px] h-[40px]"
        />
      </div>
      <select
        value={language}
        onChange={onChangeLanguage}
        className="select-custom absolute top-4 right-8 md:w-[70px] md:h-[50px] w-[70px] h-[30px] hidden md:flex"
      >
        <option value="es">es</option>
        <option value="en">en</option>
      </select>
    </>
  );
};

export default LangSelect;
