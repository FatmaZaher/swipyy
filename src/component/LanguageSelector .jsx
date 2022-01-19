import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
const languages = [
  {
    code: "en",
    name: "English",
    country_code: "EN",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "AR",
  },
];
const LanguageSelector = () => {
  const [switchLang, setSwitchLang] = useState(false);
  const currentLanguageCode = cookies.get("i18next") || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);
  const { t } = useTranslation();
  const changeLanguage = (code) => {
    i18next.changeLanguage(code);
    setSwitchLang(false);
  };
  useEffect(() => {
    console.log("Setting page stuff");
    document.body.dir = currentLanguage.dir || "ltr";
    document.title = t("app_title");
  }, [currentLanguage, t]);
  return (
    <>
      <dropdown>
        {/* <input
          id="toggle2"
          type="checkbox"
          checked={switchLang ? true : null}
          onChange={() => setSwitchLang(true)}
        /> */}
        <label htmlFor="toggle2" className="animate">
          E
        </label>
        {languages.map(({ code, name, country_code }) => (
          <label
            key={country_code}
            className={classNames("animate", {
              "d-block": currentLanguageCode !== code,
            })}
            onClick={() => {
              changeLanguage(code);
            }}
          >
            {country_code}
          </label>
        ))}
      </dropdown>
    </>
  );
};

export default LanguageSelector;
