import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./App.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "./translations/ar.json";
import en from "./translations/en.json";

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });
const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);
ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <Provider store={store}>
      <App />
    </Provider>
  </Suspense>,

  document.getElementById("root")
);
