import React from "react";
import Expense from "./../../pages/Dashboard/Expense";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="card-btn">All Expense</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="tex-base" /> Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            onDelete={() => onDelete(expense._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
