import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LangSelect from "./components/lang/lang-select";
import IndexPage from "./pages/index/index-page";
import { lazy, Suspense } from "react";
import CallbackPage from "./pages/index/Callback-page";

const LazyLoadedComponent = lazy(
  () => import("./pages/playlist-template/Playlists")
);
const LazyTracksComponent = lazy(
  () => import("./pages/tracks-template/Tracks")
);

function App() {
  return (
    <BrowserRouter>
      <LangSelect />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route
          path="userPlaylists"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyLoadedComponent />
            </Suspense>
          }
        />
        <Route
          path="tracks"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyTracksComponent />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
