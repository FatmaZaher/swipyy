import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import cookies from "js-cookie";
import classNames from "classnames";
const languages = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "ar",
    name: "العربية",
    dir: "rtl",
    country_code: "sa",
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
        <input
          id="toggle2"
          type="checkbox"
          checked={switchLang ? true : null}
          onChange={() => setSwitchLang(true)}
        />
        <label htmlFor="toggle2" className="animate">
          E
        </label>
        {switchLang ? (
          <ul className="animate">
            {languages.map(({ code, name, country_code }) => (
              <li key={country_code}>
                <a
                  href="#"
                  className={classNames("dropdown-item", {
                    disabled: currentLanguageCode === code,
                  })}
                  onClick={() => {
                    changeLanguage(code);
                  }}
                >
                  <span
                    className={`flag-icon flag-icon-${country_code} mx-2`}
                    style={{
                      opacity: currentLanguageCode === code ? 0.5 : 1,
                    }}
                  ></span>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        ) : null}
      </dropdown>
    </>
  );
};

export default LanguageSelector;
