import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      setChartData([]);
      return;
    }
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <>
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="">
            <h5 className="text-lg">Income OVerview</h5>
            <p className="text-xs text-gray-400 mt-0.5">
              Track your earnings over time and analyze your income with
              expense.
            </p>
          </div>
          <button className="add-btn" onClick={onAddIncome}>
            <LuPlus className="text-lg" />
            Add Income
          </button>
        </div>
        <div className="mt-10">
          <CustomBarChart data={chartData} xKey="amount" />
        </div>
      </div>
    </>
  );
};

export default IncomeOverview;
