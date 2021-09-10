import React from "react";
import Header from "./Header";
import Sidebar from "./SibebarMini";

interface Props {
    handleDrawerToggle : Function;
    handleNavHidden : Function;
    open : boolean;
    name : string;
    mini : boolean;
}

export default function Navigation({handleDrawerToggle, open, mini, handleNavHidden}:Props){
    return(
        <>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} mini={mini} handleNavHidden={handleNavHidden} />
            <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
        </>
    );
};