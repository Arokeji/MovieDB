// https://testing-library.com/docs/example-react-intl/
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { MemoryRouter } from "react-router-dom";
import { LanguageSelector } from "../App";

// eslint-disable-next-line no-undef
const setLocale = jest.fn();

function customTestingRender(ui, { locale = "es", ...renderOptions } = {}) {
  function Wrapper({ children }) {
    return (
      <LanguageSelector.Provider value={{ language: locale, setLanguage: setLocale }}>
        <MemoryRouter>
          <IntlProvider locale={locale}>{children}</IntlProvider>
        </MemoryRouter>
      </LanguageSelector.Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// override render method
export { customTestingRender };
