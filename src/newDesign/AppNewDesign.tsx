import React from "react";
import Layout from "./screens/Layout";
import LanguageProvider from "components/LanguageProvider";
import Loading from "./components/Loading";

const AppNewDesign = () => {
    return(
        <LanguageProvider>
            <React.Suspense fallback={<Loading isLoading={false} />} >
            <Layout />  
            </React.Suspense>
        </LanguageProvider>
    );
};

export default AppNewDesign;
