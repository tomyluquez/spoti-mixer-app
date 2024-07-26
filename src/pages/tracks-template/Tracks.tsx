import { useEffect, useState } from "react";
import TableGeneral from "../../components/tables/TableGeneral";
import { Table } from "../../models/interfaces/tableInterface";
import Loader from "../../components/loader/loader";
import { useTranslation } from "react-i18next";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { getTracks } from "../../service/getTracks";
import { TracksList } from "../../models/User/Tracks/tracks.model";
import { createDataTableTracks } from "../../helpers/createDataTableTracks";
import { CreatePlaylist } from "../../service/createPlaylists";
import { AddItemToPlaylist } from "../../service/addItemToPlaylists";
import SimpleInput from "../../components/inputs/SimpleInput";
import Modal from "../../components/modals/modal";
import { Link } from "react-router-dom";
import ErrorComponent from "../../components/errors/Error";

const Tracks = () => {
  const playlistsIds = JSON.parse(localStorage.getItem("playlistsIDs")!);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [dataTable, setDataTable] = useState<Table>({} as Table);
  const [tracks, setTracks] = useState<TracksList | undefined>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [playlistName, setPlaylistName] = useState<string>("");
  const [hrefPlaylist, setHrefPlaylist] = useState<string>("");
  const { t } = useTranslation();
  const selected = useSelector((state: RootState) => state.global.tracksIds);
  const userID = localStorage.getItem("userId")!;

  useEffect(() => {
    async function fetchData() {
      try {
        const tracks: TracksList | undefined = await getTracks(playlistsIds!);
        if (tracks) {
          setDataTable(createDataTableTracks(tracks, t));
          setTracks(tracks);
        } else {
          setErrorMessage(t("Error.tracks"));
        }
      } catch (error) {
        setErrorMessage(t("Error.loading"));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const createPlaylist = async () => {
    setCreateLoading(true);
    try {
      const { id, href } = await CreatePlaylist(userID, playlistName);
      await AddItemToPlaylist(id, selected);
      setHrefPlaylist(href);
    } catch (error) {
      setErrorMessage(t("Error.playlist.create"));
    } finally {
      setCreateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loader />
      </div>
    );
  }

  if (errorMessage) {
    return <ErrorComponent message={errorMessage} href="/userPlaylists" />;
  }

  return (
    <>
      <section className="grid grid-cols-1 lg:px-[200px] px-4 gap-4 text-swhite">
        {tracks && tracks.items && (
          <>
            <div className="flex flex-col gap-2 w-[80%] md:w-[50%] m-auto">
              <SimpleInput
                htmlFor="new"
                label="Nombre de la playlist"
                placeholder={t("Tracks.input.placeholder")}
                onChange={(e) => setPlaylistName(e)}
              />
              <button
                className={`w-full ${
                  selected.length === 0 || !selected || !playlistName
                    ? "button-disabled"
                    : "button-primary"
                }`}
                onClick={createPlaylist}
              >
                {createLoading ? <Loader /> : "Mix"}
              </button>
            </div>

            <p className="text-center text-[14px] ">{t("Tracks.info")}</p>

            <div className="container-table">
              <div className="text-swhite flex w-full items-center justify-between mb-8 flex-wrap">
                <p className="text-sgray md:text-[14px] text-[10px]">
                  {t("Tracks.quantity")} {tracks!.totalTracks}
                </p>
                <p className="text-sgray md:text-[14px] text-[10px]">
                  {t("Tracks.quantity.selected")} {selected.length}
                </p>
              </div>
              <TableGeneral tableData={dataTable} />
            </div>
          </>
        )}
      </section>

      <Modal isOpen={!!hrefPlaylist} title={t("Tracks.modal.title")}>
        <div className="flex items-center justify-center flex-col gap-8 mt-8">
          <p className="text-swhite">
            {playlistName} {t("Tracks.modal.content")}
          </p>
          <Link to="/userPlaylists">
            <button className="button-close">
              {t("Tracks.modal.button.back")}
            </button>
          </Link>
          <button className="button-primary">
            <a href={hrefPlaylist} target="_blank">
              {t("Tracks.modal.button.next")}
            </a>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Tracks;
