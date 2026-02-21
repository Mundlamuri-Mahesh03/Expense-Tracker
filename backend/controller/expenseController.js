const Expense = require("../models/Expense");
const User = require("../models/User");
const xlsx = require("xlsx");

exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    const filePath = "Expense_Details.xlsx";
    xlsx.writeFile(wb, filePath);

    res.download(filePath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
