import Navbar from "../components/Navbar";
import { useState } from "react";
import "../cssFiles/FinancialStatementPage.css"


function FinancialStatement() {


    return (

        <>
        
        <Navbar />
        <div className="display">
        <h1 className="statement">Hello world</h1>
        </div>
        </>
    );
}

export default FinancialStatement