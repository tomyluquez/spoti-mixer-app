import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface Props {
  message: string;
  href: string;
}
const ErrorComponent = ({ message, href }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="w-[50%] m-auto h-screen flex flex-col items-center justify-center gap-4 text-swhite">
      <h2 className="text-swhite text-3xl">Ups!</h2>
      {message}
      <button onClick={() => navigate(href)} className="button-close !w-full">
        {t("Button.back")}
      </button>
    </div>
  );
};

export default ErrorComponent;
