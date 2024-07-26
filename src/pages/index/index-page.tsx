import { useTranslation } from "react-i18next";
import SimpleCard from "../../components/cards/simpleCard";
import "./index-page.css";
import SimpleInput from "../../components/inputs/SimpleInput";
import { useState, FormEvent, useEffect } from "react";
import Modal from "../../components/modals/modal";
import Loader from "../../components/loader/loader";
import { userAuth } from "../../service/userAuyh";
import { clearStorage } from "../../helpers/clearStorage";

const IndexPage = () => {
  const { t } = useTranslation();
  const [submittedUsername, setSubmittedUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    clearStorage();
  }, []);

  const submitUsername = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmittedUsername(true);
    localStorage.setItem("userId", username);
    await userAuth();
  };

  const getInfo = () => {
    setOpenModalInfo(true);
  };

  return (
    <section className="container-index">
      <SimpleCard>
        <form
          className="container-titles"
          onSubmit={($event) => submitUsername($event)}
        >
          <h1 className="title text-3xl">{t("Index.title")}</h1>
          <span className="subtitle">
            {t("Index.subtitle")}
            <br /> {t("Index.enter")}
          </span>
          <div className="w-full">
            <SimpleInput
              htmlFor={t("Index.input.htmlFor")}
              placeholder={t("Index.input.placeholder")}
              label={""}
              onChange={(e) => setUsername(e)}
              isSubmitted={submittedUsername}
            />
            <p className="text-info cursor-pointer" onClick={() => getInfo()}>
              {t("Index.userID.info")}
            </p>
          </div>
          <button
            type="submit"
            disabled={!username}
            className={`!w-full ${
              username ? "button-primary" : "button-disabled"
            }`}
          >
            {isLoading ? <Loader /> : t("Index.button")}
          </button>
        </form>
      </SimpleCard>
      {!username && submittedUsername && (
        <p className="text-error">{t("Index.input.error")}</p>
      )}

      <Modal isOpen={openModalInfo} title={t("Index.userID.info")}>
        <div className="flex items-center justify-center flex-col gap-8 mt-8">
          <p className="text-swhite">{t("Index.userID.content")}</p>
          <button
            onClick={() => setOpenModalInfo(false)}
            className="button-close"
          >
            {t("Index.modal.button.cancel")}
          </button>
        </div>
      </Modal>
    </section>
  );
};

export default IndexPage;
