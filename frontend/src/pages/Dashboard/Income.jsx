import React, { useEffect, useState, useRef } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import IncomeOverview from "../../components/Income/IncomeOverview";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import { toast } from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [incomeData, setIncomeData] = useState([]);
  const hasFetched = useRef(false);

  // Get All Income Details
  const fetchIncomeDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`,
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (err) {
      console.log("Something went wrong. Please try again.", err);
    } finally {
      setLoading(false);
    }
  };

  // Add Income

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //
    if (!source.trim()) {
      toast.error("Source is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number grater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income Added Successfully");
      fetchIncomeDetails();
    } catch (err) {
      console.log(
        "Error adding income:",
        err.response?.data?.message || err.message,
      );
    }
  };
  // Delete Income

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));

      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income details deleted successfully");
      fetchIncomeDetails();
    } catch (err) {
      console.error(
        "Error deleting income:",
        err.response?.data?.message || err.message,
      );
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // Handle download income

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" },
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading expense details:", err);
      toast.error("Failed to download expense details. Please try again!");
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    fetchIncomeDetails();
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>

        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
