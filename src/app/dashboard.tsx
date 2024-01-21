import React, { useEffect } from "react";
import { useReadContract, useWriteContract } from "wagmi";

interface Loan {
  loanId: string;
  loanDebt: number;
  monthlyInterest: number;
}

const Dashboard: React.FC = () => {
  // Calling the contract to get user debt
  // const {
  //   data: userDebt,
  //   isError,
  //   isLoading,
  // } = useReadContract({
  //   abi: testAbi,
  //   address: "0xE56F3EA01cBC08c6241567b8551cde386Bf6A2d8",
  //   functionName: "getUserDebt",
  // });

  const {} = useWriteContract;

  //

  // Example loans data
  const loans: Loan[] = [
    { loanId: "123", loanDebt: 1000, monthlyInterest: 50 },
    { loanId: "456", loanDebt: 2000, monthlyInterest: 100 },
  ];

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching data from contract.</div>;
  // }

  return (
    <div>
      <h2>Credit Score: 750</h2>
      {/* <h3>Outstanding Debt: ${userDebt?.toString()}</h3> */}
      <h3>Monthly Interest: $200</h3>

      <table>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Loan Debt</th>
            <th>Monthly Interest</th>
            <th>More Info</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan) => (
            <tr key={loan.loanId}>
              <td>{loan.loanId}</td>
              <td>${loan.loanDebt}</td>
              <td>${loan.monthlyInterest}</td>
              <td>
                <button>More Info</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
