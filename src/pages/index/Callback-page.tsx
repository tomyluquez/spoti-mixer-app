import { useEffect } from "react";
import { getToken } from "../../service/getToken";
import Loader from "../../components/loader/loader";

const CallbackPage = () => {
  useEffect(() => {
    const fetchData = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (code) {
        localStorage.setItem("code", code);
        await getToken();
        window.location.href = "/userPlaylists";
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Loader />
    </div>
  );
};

export default CallbackPage;
