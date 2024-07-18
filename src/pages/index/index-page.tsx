import { useTranslation } from "react-i18next";
import SimpleCard from "../../components/cards/simpleCard";
import "./index-page.css";
import SimpleInput from "../../components/inputs/SimpleInput";
import { useState } from "react";
import Modal from "../../components/modals/modal";

const IndexPage = () => {
  const { t } = useTranslation();
  const [submittedUsername, setSubmittedUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const submitUsername = () => {
    setSubmittedUsername(true);
    setIsOpen(true);
  };

  return (
    <section className="container-index">
      <SimpleCard>
        <div className="container-titles">
          <h1 className="title text-3xl">{t("index.title")}</h1>
          <span className="subtitle">
            {t("index.subtitle")}
            <br /> {t("index.enter")}:
          </span>
          <SimpleInput
            htmlFor={t("index.input.htmlFor")}
            placeholder={t("index.input.placeholder")}
            label={""}
            onChange={(e) => setUsername(e)}
          />
          <button
            disabled={!username}
            onClick={() => submitUsername()}
            className={`w-full ${
              username ? "button-primary" : "button-disabled"
            }`}
          >
            {t("index.button")}
          </button>
        </div>
      </SimpleCard>
      {!username && submittedUsername && (
        <p className="error-message">{t("index.input.error")}</p>
      )}

      <Modal isOpen={isOpen} title={t("index.modal.title")}>
        <div className="flex items-center justify-center flex-col gap-8 mt-8">
          {username}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
          >
            {t("index.modal.button")}
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default IndexPage;
