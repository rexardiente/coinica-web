import React from "react";
import { FormattedMessage } from "react-intl";

const translate = (key: string, values?: any) => {
  return <FormattedMessage defaultMessage={`check translation id: ${key}`} id={key} values={values} />;
};

export { translate };
