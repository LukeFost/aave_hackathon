import React, { useEffect, useState, useCallback } from "react";
import { config } from "../wagmi";
import { writeContract, readContract } from "@wagmi/core";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { erc20ABI } from "../abis/erc20ABI";
import { creditManager } from "@/abis/creditManager";
import { poolAave } from "@/abis/poolAave";
import { contractDebtToken } from "@/abis/contractDebtToken";

interface Loan {
  loanID: number;
  borrower: string;
  amountWanted: number;
  amountToBePayed: number;
  promisedPayDate: number;
  timeCreated: number;
  taken: boolean;
}

const maxVal = 9999999999999999999999999000000000000000000n;

const Dashboard: React.FC = () => {
  const account = useAccount();
  const [collatAmount, setCollatAmount] = useState(null);

  const [borrowAmount, setBorrowAmount] = useState(null);
  const [paybackAmount, setPaybackAmount] = useState(null);
  const [datePay, setDatePay] = useState(null);

  const [loanId, setLoanId] = useState(null);

  const [withdrawAmount, setWithdrawAmount] = useState(null);

  const [creditAmount, setCreditAmount] = useState(null);

  const [allLoans, setAllLoans] = useState<Loan[]>([]);
  const [currentId, setCurrentId] = useState<number>(0);
  const [maxId, setMaxId] = useState<number | null>(null);

  const [isPagelenders, setIsPageLenders] = useState(false);

  // Call useReadContract at the top level
  const { data: lenderIDData } = useReadContract({
    abi: creditManager,
    address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
    functionName: "lenderID",
  });

  // Fetch the maximum lenderID once
  useEffect(() => {
    const fetchMaxId = async () => {
      const result = await readContract(config, {
        abi: creditManager,
        address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
        functionName: "lenderID",
      });
      setMaxId(Number(result));
    };

    fetchMaxId();
  }, []);

  // Function to fetch loan information
  const fetchLoanInfo = useCallback(
    async (id: number) => {
      const loanInfo = await readContract(config, {
        abi: creditManager,
        address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
        functionName: "idToOffer",
        args: [BigInt(id)],
      });
      return loanInfo;
    },
    [currentId]
  );

  // Effect to iteratively fetch loans
  useEffect(() => {
    if (currentId + 1 <= maxId) {
      fetchLoanInfo(currentId).then((loanInfo) => {
        if (loanInfo) {
          setAllLoans((prevLoans) => [...prevLoans, loanInfo]);
        }
        setCurrentId(currentId + 1);
      });
    }
  }, [currentId, maxId, fetchLoanInfo]);

  // Amount they want to borrow
  // Amount they will pay back
  // Estimated Date of payment
  const approveDaiFromUser = async () => {
    try {
      const result = await writeContract(config, {
        abi: erc20ABI,
        address: "0xff34b3d4aee8ddcd6f9afffb6fe49bd371b8a357",
        functionName: "approve",
        args: ["0xd47264b894F0c04edd4D475f2a4B35F6F838d11C", maxVal],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const depositUserCollateral = async () => {
    try {
      const result = await writeContract(config, {
        abi: creditManager,
        address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
        functionName: "depositCollateral",
        args: ["0xff34b3d4aee8ddcd6f9afffb6fe49bd371b8a357", collatAmount],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const createLoanOffer = async () => {
    try {
      console.log(borrowAmount, paybackAmount, datePay);
      const result = await writeContract(config, {
        abi: creditManager,
        address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
        functionName: "createLoanOffer",
        args: [borrowAmount, paybackAmount, datePay],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const approveCredit = async () => {
    try {
      const result = await writeContract(config, {
        abi: contractDebtToken,
        address: "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844",
        functionName: "approveDelegation",
        args: ["0xd47264b894F0c04edd4D475f2a4B35F6F838d11C", creditAmount],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const acceptLoanOffer = async () => {
    try {
      const result = await writeContract(config, {
        abi: creditManager,
        address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
        functionName: "acceptLoan",
        args: [loanId],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const borrowFromLoan = async () => {
    try {
      const result = await writeContract(config, {
        abi: creditManager,
        address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
        functionName: "borrowFromLoan",
        args: [loanId],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const payOffLoan = async () => {
    try {
      const result = await writeContract(config, {
        abi: creditManager,
        address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
        functionName: "payOffLoan",
        args: [loanId],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const withdraw = async () => {
    try {
      const result = await writeContract(config, {
        abi: poolAave,
        address: "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951",
        functionName: "withdraw",
        args: [
          "0xff34b3d4aee8ddcd6f9afffb6fe49bd371b8a357",
          withdrawAmount,
          account.address,
        ],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const approveGHOFromUser = async () => {
    try {
      const result = await writeContract(config, {
        abi: erc20ABI,
        address: "0xc4bF5CbDaBE595361438F8c6a187bDc330539c60",
        functionName: "approve",
        args: ["0xd47264b894F0c04edd4D475f2a4B35F6F838d11C", maxVal],
      });
      console.log("Transaction hash:", result);
    } catch (error) {
      console.error("Error in writeContract:", error);
    }
  };

  const {
    data: creditScore,
    isError,
    isLoading,
  } = useReadContract({
    abi: creditManager,
    address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
    functionName: "getCreditScore",
    args: [account.address],
  });

  const { data: borrowInfo } = useReadContract({
    abi: creditManager,
    address: "0xd47264b894F0c04edd4D475f2a4B35F6F838d11C",
    functionName: "addyToBorrower",
    args: [account.address],
  });

  const handlePageToggle = () => {
    setIsPageLenders(!isPagelenders);
  };

  return (
    <div className="p-10">
      <button className="btn btn-primary" onClick={handlePageToggle}>
        {isPagelenders ? "Lenders" : "Borrowers"}
      </button>

      {isLoading ? (
        <p>Loading Credit Score...</p>
      ) : isError ? (
        <p>Error fetching Credit Score.</p>
      ) : (
        <h3>Credit Score: {creditScore?.toString()}</h3>
      )}

      {isLoading ? (
        <p>Loading Total Debt...</p>
      ) : isError ? (
        <p>Error fetching Total Debt.</p>
      ) : (
        <h3>Total Debt: {borrowInfo[0]?.toString()}</h3>
      )}

      {isLoading ? (
        <p>Loading Total Amount Paid...</p>
      ) : isError ? (
        <p>Error fetching Total Amount Paid.</p>
      ) : (
        <h3>Total Amount Paid: {borrowInfo[1]?.toString()}</h3>
      )}

      {isLoading ? (
        <p>Loading Number of Loans...</p>
      ) : isError ? (
        <p>Error fetching Number of Loans.</p>
      ) : (
        <h3>Number of Loans: {borrowInfo[2]?.toString()}</h3>
      )}
      {!isPagelenders && (
        <div className="p-10">
          <br />
          <button className="btn" onClick={approveDaiFromUser}>
            approve Dai
          </button>
          <br />{" "}
          <button className="btn" onClick={depositUserCollateral}>
            deposit Collat
          </button>
          <input
            type="text"
            placeholder="0"
            onChange={(e) => setCollatAmount(BigInt(e.target.value))}
          ></input>
          {/* NEW AREA */}
          <hr />
          <button className="btn" onClick={approveCredit}>
            Approve Credit Amount
          </button>
          <br />
          <label htmlFor="creditAmount">Credit Amount</label>
          <input
            aria-label="Credit Amount"
            name="creditAmount"
            type="text"
            placeholder="0"
            onChange={(e) => setCreditAmount(BigInt(e.target.value))}
          ></input>
          <br />
          {/* NEW AREA */}
          <hr />
          <button className="btn" onClick={acceptLoanOffer}>
            Accept Loan Offer
          </button>
          <br />
          <label htmlFor="loanID">Loan ID</label>
          <input
            aria-label="Loan ID"
            name="loanID"
            type="text"
            placeholder="0"
            onChange={(e) => setLoanId(BigInt(e.target.value))}
          ></input>
          <br />
        </div>
      )}

      {isPagelenders && (
        <div className="p-10">
          <ul>
            <li>
              <button className="btn" onClick={createLoanOffer}>
                Create Loan Offer
              </button>
            </li>
            <li>
              {/* NEW AREA */}
              <label htmlFor="amount">Desired Amount</label>
              <input
                aria-label="Desired Amount"
                name="amount"
                type="text"
                placeholder="0"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setBorrowAmount(BigInt(e.target.value))}
              ></input>
            </li>
            <li>
              {/* NEW AREA */}
              <label htmlFor="payback">Payback Amount</label>
              <input
                aria-label="Payback Amount"
                name="payback"
                type="text"
                placeholder="0"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPaybackAmount(BigInt(e.target.value))}
              ></input>
            </li>
            <li>
              {/* NEW AREA */}
              <label htmlFor="complete">Date of Completion</label>
              <input
                aria-label="Date of Completion"
                name="complete"
                type="date"
                placeholder="Date"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const unixTimestamp = Math.floor(
                    selectedDate.getTime() / 1000
                  );
                  console.log(unixTimestamp); // Logs the Unix timestamp
                  setDatePay(unixTimestamp); // Update state with Unix timestamp
                }}
              />
            </li>
            <li>
              {/* NEW AREA */}
              <button className="btn" onClick={approveGHOFromUser}>
                Approve GHO
              </button>
            </li>
            <li>
              {/* NEW AREA */}
              <hr />
              <button className="btn" onClick={borrowFromLoan}>
                Borrow From Loan
              </button>
              <br />
              <label htmlFor="loanID1">Loan ID</label>
              <input
                aria-label="Loan ID"
                name="loanID1"
                type="text"
                placeholder="0"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLoanId(BigInt(e.target.value))}
              ></input>
            </li>
            <li>
              {/* NEW AREA */}
              <hr />
              <button className="btn" onClick={withdraw}>
                Withdraw
              </button>
              <br />
              <label htmlFor="withdrawAmt">Withdraw Amount</label>
              <input
                aria-label="Withdraw Amount"
                name="withdrawAmt"
                type="text"
                placeholder="0"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setWithdrawAmount(BigInt(e.target.value))}
              ></input>
              <br />
            </li>
            <li>
              <button className="btn" onClick={payOffLoan}>
                Pay Off Loan
              </button>
              <br />
              <label htmlFor="loanID2">Loan ID</label>
              <input
                aria-label="Loan ID"
                name="loanID2"
                type="text"
                placeholder="0"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLoanId(BigInt(e.target.value))}
              ></input>
              <br />
            </li>
          </ul>
        </div>
      )}

      <div>
        <h1>Loan Details</h1>
        <table>
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Borrower</th>
              <th>Amount Wanted</th>
              <th>Amount to be Payed</th>
              <th>Promised Pay Date</th>
              <th>Time Created</th>
              <th>Taken</th>
            </tr>
          </thead>
          <tbody>
            {allLoans.map((loan, index) => (
              <tr key={index}>
                <td>{Number(loan[0])}</td>
                <td>{loan[1]}</td>
                <td>{Number(loan[2])}</td>
                <td>{Number(loan[3])}</td>
                <td>{new Date(Number(loan[4]) * 1000).toLocaleDateString()}</td>
                <td>{new Date(Number(loan[5]) * 1000).toLocaleDateString()}</td>
                <td>{loan[6] ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
