import React, { useEffect, useState } from "react";
import { prepareExpenseBarCharData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);
  //   console.log(data);
  useEffect(() => {
    const result = prepareExpenseBarCharData(data);
    setChartData(result);
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last30DaysExpenses</h5>
      </div>
      <CustomBarChart data={chartData} xkey="category" />
    </div>
  );
};

export default Last30DaysExpenses;
