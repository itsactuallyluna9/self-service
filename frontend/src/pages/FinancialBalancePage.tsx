import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import "../cssFiles/FinancialBalancePage.css"


/*
Balance
-Fees
-Financial Aid
-Payments
-Tuition
-Room and Board
 */

interface FinancialProps {
    balance : number;
    fees : number;
    financial_aid : number;
    payments : number;
    tuition : number;
    room_and_board : number;
}

function FinancialBalance() {
    const UserID = localStorage.getItem('UserID')
    const [financialData, setFinancialData] = useState<FinancialProps>({
    balance: 0,
    fees: 0,
    financial_aid: 0,
    payments: 0,
    tuition: 0,
    room_and_board: 0,
    });
    useEffect(() => {
        async function loadFinancialInformation() {
        let fetchedData: FinancialProps = {
            balance : 100,
            fees : 150,
            financial_aid : 10000,
            payments : 101,
            tuition : 2000000,
            room_and_board : 20};
        try {
        //  Fetch call to backend financial data API endpoint. CarterLampe 12/1/2025
        // const response = await fetch("TODO: API Endpoint for financial data");
        const response = {
                ok: true,
                json: async () => ({
                    balance : 100,
                    fees : 150,
                    financial_aid : 10000,
                    payments : 101,
                    tuition : 2000000,
                    room_and_board : 20
                })
    };
        
        if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`); 
        } 

        const data = await response.json();
        fetchedData = data;
        } 
        catch (e: any) {
        console.error("Error fetching courses:", e);
        
        
        return (
          <h1>An Error Occurred, Please Try Again Later</h1>
        )
        }
    setFinancialData(fetchedData);
    }
    loadFinancialInformation();
    }, []);

    return (

        <>
        
        <Navbar />
        <div className="financial-balance-wrapper">
            <div className="financial-information">\
                <div className="title-header">
                    <h1>Financial Balance {"(2025/fall)"}</h1>
                        <button className="down-arrow"></button>
                        
                </div>    
                
                <div className="balance">
                    <p>${financialData.balance.toFixed(2)}</p>
                </div>
                <div className="financial-details">
                    <div className="details-header">
                        <p><strong>Type</strong></p> <strong><p>Amount</p></strong>
                    </div>
                    <div className="details-header">
                        <p>Fees:</p> <p>${financialData.fees.toFixed(2)}</p>
                    </div>
                    <div className="details-header">
                        <p>Financial Aid:</p> <p>${financialData.financial_aid.toFixed(2)}</p>
                    </div>
                    <div className="details-header">
                        <p>Payments:</p> <p>${financialData.payments.toFixed(2)}</p>
                    </div>
                    <div className="details-header">
                        <p>Tuition:</p> <p>${financialData.tuition.toFixed(2)}</p>
                    </div>
                    <div className="details-header-bottom">
                        <p>Room and Board:</p> <p>${financialData.room_and_board.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="semester-selection">
            
            </div>
        </div>
        </>
    );
}

export default FinancialBalance