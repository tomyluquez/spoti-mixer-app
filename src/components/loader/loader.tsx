import { useTranslation } from "react-i18next";
import "./loader.css";
const Loader = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center h-auto gap-2 text-swhite">
      <div className="loader"></div>
      <p>{t("Loader")}</p>
    </div>
  );
};

export default Loader;
