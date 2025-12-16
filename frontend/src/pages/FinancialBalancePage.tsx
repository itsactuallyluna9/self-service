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
    payperiod: string;
    balance : number;
    fees : number;
    financeaid : number;
    payments : number;
    tuition : number;
    roomboard : number;
}

function FinancialBalance() {
    const UserID = localStorage.getItem('UserID')
    const [selection, setSelection] = useState("2024")
    const [financialData, setFinancialData] = useState<FinancialProps[]>([]);
    const [currentData, setCurrentData] = useState<FinancialProps>({
        payperiod: "2024",
        balance: 0,
        fees: 0,
        financeaid: 0,
        payments: 0,
        tuition: 0,
        roomboard: 0,
    });

    const handleChangePeriod = (newperiod: string) => {
	setSelection(newperiod); // Sets the period of data we are looking at

	const selected = financialData.find(item => item.payperiod === newperiod);
	if (selected) {
		setCurrentData(selected); // Sets the current data we can see
	}
    };


    useEffect(() => {
        async function loadFinancialInformation() {
        let fetchedData: FinancialProps[] = [];
        try {
        //  Fetch call to backend financial data API endpoint. CarterLampe 12/1/2025
        console.log("userid: ", UserID)
        const response = await fetch(`https://10.101.128.72:6001/api/finances/view/${UserID}`);

        // Mocked response for development purposes. CarterLampe 12/1/2025
        // const response = {
        //     ok: true,
        //     json: async () => ([
        //         {
        //         period: "2024/Fall",
        //         balance: 100,
        //         fees: 200,
        //         payments: 101,
        //         tuition: 2000000,
        //         room_and_board: 20,
        //         financial_aid: 10000,
                
        //         },
        //         {
        //         period: "2024/Spring",
        //         balance: 100,
        //         fees: 150,
        //         payments: 101,
        //         tuition: 2000000,
        //         room_and_board: 20,
        //         financial_aid: 10000,
        //         },
        //         {
        //         period: "2025/Fall",
        //         balance: 5000,
        //         fees: 150,
        //         payments: 101,
        //         tuition: 2000000,
        //         room_and_board: 20,
        //         financial_aid: 10000,
        //         }
        //     ])
        //     };
        
        if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`); 
        } 

        const data = await response.json();
        console.log(data)
        fetchedData = data;
        } 
        catch (e: any) {
        console.error("Error fetching courses:", e);
        
        
        return (
          <h1>An Error Occurred, Please Try Again Later</h1>
        )
        }
    setFinancialData(fetchedData); // Set total financial data when fetched
    console.log(financialData)
    setCurrentData(fetchedData.find(item => item.payperiod === selection) || fetchedData[0]); // set the current data to the default

    }
    loadFinancialInformation();
    }, []);

    return (

        <>
        
        <Navbar />
        <div className="financial-balance-wrapper">
            <div className="financial-information">\
                <div className="title-header">
                    <div className="title-header-left">
                        <h1>Financial Balance </h1>
                    </div>
                    <div className="title-header-right">
                        <p>Period: </p>
                        <select id="period-select" onChange={(e) => handleChangePeriod(e.target.value)}>
                            {financialData.map((item) => (
                                <option key={item.payperiod} value={item.payperiod}>
                                    {item.payperiod}
                                </option>
                            ))}
                        </select>

                    </div>
                        
                </div>    
                
                <div className="balance">
                    <p>${currentData.balance.toFixed(2)}</p>
                </div>
                <div className="financial-details">
                    <div className="details-header">
                        <p><strong>Type</strong></p> <strong><p>Amount</p></strong>
                    </div>
                    <div className="details-header">
                        <p>Fees:</p> <p>${currentData.fees.toFixed(2)}</p>
                    </div>
                    <div className="details-header">
                        <p>Financial Aid:</p> <p>${currentData.financeaid.toFixed(2)}</p>
                    </div>
                    <div className="details-header">
                        <p>Payments:</p> <p>${currentData.payments.toFixed(2)}</p>
                    </div>
                    <div className="details-header">
                        <p>Tuition:</p> <p>${currentData.tuition.toFixed(2)}</p>
                    </div>
                    <div className="details-header-bottom">
                        <p>Room and Board:</p> <p>${currentData.roomboard.toFixed(2)}</p>
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