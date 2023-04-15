import "./App.scss";
import React, { createContext, useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { HashRouter, Routes, Route } from "react-router-dom";
import English from "./lang/en.json";
import Spanish from "./lang/es.json";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import FooterBar from "./components/FooterBar/FooterBar";
import MovieDataPage from "./pages/MovieDataPage/MovieDataPage";
import TvShowDataPage from "./pages/TvShowDataPage/TvShowDataPage";
import QuizzPage from "./pages/QuizzPage/QuizzPage";

// Contexts
export const LanguageSelector = createContext();

function App() {
  // States
  const [locale, setLocale] = useState(navigator.language);
  const [messages, setMessages] = useState(English);

  useEffect(() => {
    switch (locale) {
      case "es-ES":
        setMessages(Spanish);
        break;
      default:
        setMessages(English);
    }
  });

  return (
    <div className="App">
      <LanguageSelector.Provider value={{ language: locale, setLanguage: setLocale }}>
        <IntlProvider messages={messages} locale={locale}>
          <HashRouter>
            <HeaderBar></HeaderBar>
            <Routes>
              <Route path="/" element={<MoviesPage></MoviesPage>}></Route>
              <Route path="/movie/:movieId" element={<MovieDataPage></MovieDataPage>}></Route>
              <Route path="/tvshow/:showId" element={<TvShowDataPage></TvShowDataPage>}></Route>
              <Route path="/quizz/" element={<QuizzPage></QuizzPage>}></Route>
            </Routes>
            <FooterBar></FooterBar>
          </HashRouter>
        </IntlProvider>
      </LanguageSelector.Provider>
    </div>
  );
}

export default App;
