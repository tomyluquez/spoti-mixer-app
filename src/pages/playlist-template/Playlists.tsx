import { useEffect, useState } from "react";
import { UserPlaylists } from "../../models/User/Playlists/userPlaylists.model";
import { getUserPlaylists } from "../../service/getUserPlaylists";
import TableGeneral from "../../components/tables/TableGeneral";
import { Table } from "../../models/interfaces/tableInterface";
import { createDataTablePlaylists } from "../../helpers/createDataTablePlaylists";
import Loader from "../../components/loader/loader";
import { useTranslation } from "react-i18next";
import { GetUserProfile } from "../../service/getUserProfile";
import { UserProfile } from "../../models/User/Profile/userProfile.model";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import { clearState } from "../../redux/slices/playlists.slice";
import ErrorComponent from "../../components/errors/Error";

const Playlists = () => {
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [playlists, setPlaylists] = useState<UserPlaylists | undefined>();
  const [dataTable, setDataTable] = useState<Table>({} as Table);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const selected = useSelector((state: RootState) => state.global.playlistsIds);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearState());
    async function fetchData() {
      try {
        const userProfile = await GetUserProfile(userId!);
        if (!userProfile) {
          setErrorMessage(t("Error.id"));
          return;
        }
        const playlists = await getUserPlaylists(userId!);
        setUserProfile(userProfile);
        if (playlists) {
          setPlaylists(playlists);
          setDataTable(createDataTablePlaylists(playlists, t));
        } else {
          setErrorMessage(t("Error.playlists"));
        }
      } catch (error) {
        setErrorMessage(t("Error.loading"));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId, t]);

  const continueToTracks = () => {
    if (!selected || selected.length < 2) {
      return;
    }

    localStorage.setItem("playlistsIDs", JSON.stringify(selected));
    dispatch(clearState());
    window.location.href = "/tracks";
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (errorMessage) {
    return <ErrorComponent message={errorMessage} href="/" />;
  }

  return (
    <section className="grid grid-cols-1 lg:px-[200px] px-4 gap-4 text-swhite">
      {userProfile && (
        <div className="flex flex-col items-center justify-center gap-4 text-swhite">
          <div className="flex justify-center items-center w-full gap-4">
            <img src={userProfile.img} alt="profile image" />
            <h2>
              {t("Playlists.hello")} {userProfile.userName}
            </h2>
          </div>
        </div>
      )}
      {playlists && playlists.items.length > 0 && (
        <>
          <div className="flex flex-col gap-2 w-[80%] md:w-[50%] m-auto">
            <Link to={"/"}>
              <button className="button-close w-full">
                {t("Playlist.button.back")}
              </button>
            </Link>

            <button
              onClick={continueToTracks}
              className={`w-full ${
                selected.length < 2 || !selected
                  ? "button-disabled"
                  : "button-primary"
              }`}
            >
              {t("Playlist.button.next")}
            </button>
          </div>
          <p className="text-center text-[14px] ">{t("Playlists.info")}</p>

          <div className="container-table">
            <div className="text-swhite flex w-full items-center justify-between mb-8 flex-wrap">
              <p className="text-sgray">
                {t("Playlists.quantity")} {playlists!.items.length}
              </p>
              <p className="text-sgray">
                {t("Playlists.quantity.selected")} {selected.length}
              </p>
            </div>
            <TableGeneral tableData={dataTable} />
          </div>
        </>
      )}
    </section>
  );
};

export default Playlists;
