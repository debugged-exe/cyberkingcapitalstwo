import React from 'react';
import SeniorPayment from "../../Components/SeniorPayment/SeniorPayment";
import SeniorViewTeam from "../../Components/SeniorViewTeam/SeniorViewTeam";
import SearchByDropdown from "../../Components/SearchByDropdown/SearchByDropdown";

const SeniorPanel = () => {
    return (
        <div>
            <SeniorPayment/>
            <SeniorViewTeam/>
            <SearchByDropdown />
        </div>
    );
}

export default SeniorPanel;

