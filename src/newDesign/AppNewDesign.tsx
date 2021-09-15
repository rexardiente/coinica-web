import React from "react";
import Layout from "./screens/Layout";
import LanguageProvider from "components/LanguageProvider";
import Loading from "./screens/Loading";

const AppNewDesign = () => {
    return(
        <LanguageProvider>
            <React.Suspense fallback={<Loading />} >
            <Layout />  
            </React.Suspense>
        </LanguageProvider>
    );
};

export default AppNewDesign;
