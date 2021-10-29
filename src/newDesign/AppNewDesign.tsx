import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./screens/Layout";
import LanguageProvider from "components/LanguageProvider";
import Loading from "./components/Loading";
import EntryScreen from "./screens";

const AppNewDesign = () => {
  return (
    <LanguageProvider>
      <React.Suspense fallback={<Loading isLoading={false} />}>
        <EntryScreen />
      </React.Suspense>
    </LanguageProvider>
  );
};

export default AppNewDesign;
