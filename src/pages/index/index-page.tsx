import { useTranslation } from "react-i18next";
import SimpleCard from "../../components/cards/simpleCard";
import "./index-page.css";
import SimpleInput from "../../components/inputs/SimpleInput";
import { useState } from "react";
import Modal from "../../components/modals/modal";
import { GetUserProfile } from "../../service/getUserProfile";
import { UserProfile } from "../../models/User/Profile/userProfile.model";
import Loader from "../../components/loader/loader";

const IndexPage = () => {
  const { t } = useTranslation();
  const [submittedUsername, setSubmittedUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [openModalUser, setOpenModalUser] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [profile, setProfile] = useState<UserProfile>();
  const [isLoading, setIsLoading] = useState(false);

  const submitUsername = async () => {
    setIsLoading(true);
    setSubmittedUsername(true);
    const profile: UserProfile = await GetUserProfile(username);
    setProfile(profile);
    setOpenModalUser(true);
    setIsLoading(false);
  };

  const getInfo = () => {
    setOpenModalInfo(true);
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
          <div>
            <SimpleInput
              htmlFor={t("index.input.htmlFor")}
              placeholder={t("index.input.placeholder")}
              label={""}
              onChange={(e) => setUsername(e)}
            />
            <p className="text-info" onClick={() => getInfo()}>
              {t("index.userID.info")}
            </p>
          </div>
          <button
            disabled={!username}
            onClick={() => submitUsername()}
            className={`w-full ${
              username ? "button-primary" : "button-disabled"
            }`}
          >
            {isLoading ? <Loader /> : t("index.button")}
          </button>
        </div>
      </SimpleCard>
      {!username && submittedUsername && (
        <p className="text-error">{t("index.input.error")}</p>
      )}

      <Modal isOpen={openModalUser} title={t("index.modal.title")}>
        <div className="flex items-center justify-center flex-col gap-8 mt-8">
          <div className="bg-slate-500 flex items-center justify-center gap-4 flex-col p-4 rounded-xl">
            <img src={profile?.img} alt="imagen de perfil de spotify" />
            <p className="text-white">{profile?.userName}</p>
          </div>
          <div className=" w-full flex items-center justify-center gap-2">
            <button
              onClick={() => setOpenModalUser(false)}
              className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:mt-0 sm:w-auto sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
            >
              {t("index.modal.button.cancel")}
            </button>
            <button className="w-full px-4 py-2 mt-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sgreen-light rounded-md sm:w-auto sm:mt-0 hover:bg-sgreen-strong focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              {t("index.modal.button.confirm")}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={openModalInfo} title={t("index.userID.info")}>
        <div className="flex items-center justify-center flex-col gap-8 mt-8">
          <p className="text-swhite">{t("index.userID.content")}</p>
          <button
            onClick={() => setOpenModalInfo(false)}
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
