import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const ExpenseTransactions = ({ transactions, onSeeMore }) => {
  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between">
          <h5 className="text-lg"> Expense</h5>
          <button className="card-btn" onClick={onSeeMore}>
            See All <LuArrowRight className="text-base" />
          </button>
        </div>
        <div className="mt-6">
          {Array.isArray(transactions) &&
            transactions
              ?.slice(0, 5)
              ?.map((item) => (
                <TransactionInfoCard
                  key={item._id}
                  title={item.category}
                  icon={item.icon}
                  date={moment(item.date).format("Do MMM YYYY")}
                  amount={item.amount}
                  type="expense"
                  hideDeleteBtn
                />
              ))}
          {/* } */}
        </div>
      </div>
    </>
  );
};

export default ExpenseTransactions;
