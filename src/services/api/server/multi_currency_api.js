import { AxiosMultiCurrency as API } from "Config";
import { getHeaderParams, setHeaderParams } from "services/auth";

export const multi_currency_sign_up = (data) => {
  return API.post("/donut/api/v1/sign-up", data);
};

export const multi_currency_sign_in = (data) => {
  return API.post("/donut/api/v1/sign-in", data);
};

export const multi_currency_sign_out = () => {
  const headers = getHeaderParams();
  return API.get("/donut/api/v1/sign-out", { headers });
};

export const multi_currency_renew_token = () => {
  const headers = getHeaderParams();
  return API.get("/donut/api/v1/login/token/renew", { headers });
};

export const multi_currency_set_token = ({ CLIENT_TOKEN, CLIENT_ID }) => {
  setHeaderParams({ CLIENT_TOKEN, CLIENT_ID });
};

export const VerifyEmail = (code) => {
  return API.get(`/donut/api/v1/user/email/confirm`, { params: { code } });
};

export const UpdateEmail = (email) => {
  const headers = getHeaderParams();
  return API.post(`/donut/api/v1/user/email/update`, { email }, { headers });
};

export const AddEmail = (email) => {
  const headers = getHeaderParams();
  return API.post(`/donut/api/v1/user/email/add`, { email }, { headers });
};

export const ResetPassword = (email) => {
  return API.post(`/donut/api/v1/user/password/reset/send`, { email });
};

export const ConfirmPassword = () => {
  return API.post(`/donut/api/v1/user/password/reset/confirm`);
};

export const SubmitPassword = () => {
  return API.post(`/donut/api/v1/user/password/reset/submit`);
};
