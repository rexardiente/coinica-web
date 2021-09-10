import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
    handleDrawerToggle : Function;
    handleNavMini : Function;
    open : boolean;
    mini : boolean;
    name : string;
}

export default function NavigationHidden({handleDrawerToggle, open, mini, handleNavMini}:Props){
    return(
        <>
            <Header open={open} handleDrawerToggle={handleDrawerToggle} mini={mini} handleNavMini={handleNavMini} />
            <Sidebar open={open} handleDrawerToggle={handleDrawerToggle} />
        </>
    );
};