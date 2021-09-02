import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IntlProvider } from "react-intl";

import English from "../../translation/en.json";

type Props = {
  children: React.ReactNode;
};

type ReduxState = {
  platform: any
}

const LanguageProvider = ({ children }: Props) => {
  const [messages, setMessages] = useState(English);
  const { language } = useSelector((state: ReduxState) => state.platform);

  const loadTranslation = async (lang: string) => {
    const data = await import(`../../translation/${lang}.json`);
    return data;
  };

  const setTranslation = async () => {
    const data = await loadTranslation(language);
    setMessages(data)
  }

  useEffect(() => {
    if (language) {
      setTranslation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <IntlProvider locale={language} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export default LanguageProvider;
