import React, { useState, useEffect } from "react";
import {
   Chart as ChartJS,
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";

import html2pdf from "html2pdf.js";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

// Register ChartJS components
ChartJS.register(
   ArcElement,
   Tooltip,
   Legend,
   CategoryScale,
   LinearScale,
   BarElement
);

export default function BudgetPlanner() {
   const [originalTransactions, setOriginalTransactions] = useState([]);

   const [transactions, setTransactions] = useState([]);
   const [fil, setFil] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [updateForm, setUpdateForm] = useState(false);

   const [newTransaction, setNewTransaction] = useState({
      userid: "user123",
      type: "expense",
      category: "",
      amount: "",
      date: "",
      description: "",
   });

   const [errors, setErrors] = useState({});

   const generatePDF = () => {
      const doc = new jsPDF();

      // Title for Income Transactions
      doc.setFontSize(18);
      doc.text("Income Transactions", 14, 15);

      // Table Data for Income
      const incomeData = fil
         .filter((transaction) => transaction.type === "income")
         .map((transaction) => [
            new Date(transaction.date).toLocaleDateString(),
            transaction.category,
            `Rs.${transaction.amount}`,
            transaction.description,
         ]);

      // Generate Income Table
      autoTable(doc, {
         head: [["Date", "Category", "Amount", "Description"]],
         body: incomeData,
         startY: 25, // Position below the title
         theme: "striped", // Optional theme
      });

      // Get the Y position after the first table
      const incomeTableEndY = doc.lastAutoTable.finalY;

      // Title for Expense Transactions
      doc.setFontSize(18);
      doc.text("Expense Transactions", 14, incomeTableEndY + 10); // Add some space after the first table

      // Table Data for Expenses
      const expenseData = fil
         .filter((transaction) => transaction.type === "expense")
         .map((transaction) => [
            new Date(transaction.date).toLocaleDateString(),
            transaction.category,
            `Rs.${transaction.amount}`,
            transaction.description,
         ]);

      // Generate Expense Table
      autoTable(doc, {
         head: [["Date", "Category", "Amount", "Description"]],
         body: expenseData,
         startY: incomeTableEndY + 20, // Position below the income table
         theme: "striped", // Optional theme
      });

      // Save the PDF
      doc.save("transactions.pdf");
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewTransaction((prev) => ({ ...prev, [name]: value }));
      validateField(name, value); // Validate in real time
   };

   const validateField = (name, value) => {
      let errorMsg = "";

      if (name === "description") {
         const wordCount = value.trim().split(/\s+/).length;
         if (wordCount < 5) errorMsg = "Description must be at least 5 words.";
      }

      setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
   };

   const [updateTransaction, setUpdateTransaction] = useState({
      type: "expense",
      category: "",
      amount: "",
      date: "",
      description: "",
      id: "",
   });

   // Categories for income and expenses
   const categories = {
      income: ["Crop Sales", "Export Sales", "Wholesale Supply", "Other"],
      expense: ["Seeds", "Fertilizers", "Transportation", "Rent", "Other"],
   };

   const fetchTransactions = async () => {
      try {
         const response = await axios.get(
            "http://localhost:8005/api/transactions"
         );

         const userId = "user123"; // Set the user ID you want to filter by

         // Filter transactions based on user ID
         const filteredTransactions = response.data.filter(
            (txn) => txn.userid === userId
         );

         setOriginalTransactions(filteredTransactions);
         setTransactions(filteredTransactions);
         setFil(filteredTransactions);
         // Store original data
      } catch (error) {
         console.error("Error fetching transactions:", error);
      }
   };

   // Fetch transactions from the backend
   useEffect(() => {
      fetchTransactions();
   }, []);

   // Handle search functionality
   const handleSearch = (e) => {
      const value = e.target.value.toLowerCase();
      setSearchTerm(value);

      if (value === "") {
         setFil(originalTransactions);
      } else {
         const filtered = originalTransactions.filter(
            (tr) =>
               tr.description.toLowerCase().includes(value) ||
               tr.category.toLowerCase().includes(value)
         );
         setFil(filtered);
      }
   };

   // Handle filtering by type
   const handleFilter = (e) => {
      const selectedType = e.target.value;
      if (selectedType === "all") {
         setFil(originalTransactions);
      } else {
         const filtered = originalTransactions.filter(
            (tr) => tr.type === selectedType
         );
         setFil(filtered);
      }
   };

   // Reset filters and search
   const handleReset = () => {
      setFil(originalTransactions);
      setSearchTerm("");
   };

   // Calculate totals
   const totals = transactions.reduce(
      (acc, transaction) => {
         if (transaction.type === "income") {
            acc.income += parseFloat(transaction.amount);
         } else {
            acc.expenses += parseFloat(transaction.amount);
         }
         return acc;
      },
      { income: 0, expenses: 0 }
   );

   // Chart data
   const pieChartData = {
      labels: ["Income", "Expenses"],
      datasets: [
         {
            data: [totals.income, totals.expenses],
            backgroundColor: ["#4FAB4A", "#8CCC8C"],
            borderColor: ["#108A01", "#4FAB4A"],
            borderWidth: 1,
         },
      ],
   };

   // Bar chart data for category breakdown
   const categoryData = {
      labels: [...new Set(transactions.map((t) => t.category))],
      datasets: [
         {
            label: "Amount",
            data: [...new Set(transactions.map((t) => t.category))].map(
               (category) =>
                  transactions
                     .filter((t) => t.category === category)
                     .reduce((sum, t) => sum + parseFloat(t.amount), 0)
            ),
            backgroundColor: "#4FAB4A",
            borderColor: "#108A01",
            borderWidth: 1,
         },
      ],
   };

   const incomeTransactions = transactions.filter((t) => t.type === "income");
   const expenseTransactions = transactions.filter((t) => t.type === "expense");

   const incomeCategoryData = {
      labels: [...new Set(incomeTransactions.map((t) => t.category))],
      datasets: [
         {
            label: "Income Amount",
            data: [...new Set(incomeTransactions.map((t) => t.category))].map(
               (category) =>
                  incomeTransactions
                     .filter((t) => t.category === category)
                     .reduce((sum, t) => sum + parseFloat(t.amount), 0)
            ),
            backgroundColor: "#4FAB4A",
            borderColor: "#108A01",
            borderWidth: 1,
         },
      ],
   };

   const expenseCategoryData = {
      labels: [...new Set(expenseTransactions.map((t) => t.category))],
      datasets: [
         {
            label: "Expense Amount",
            data: [...new Set(expenseTransactions.map((t) => t.category))].map(
               (category) =>
                  expenseTransactions
                     .filter((t) => t.category === category)
                     .reduce((sum, t) => sum + parseFloat(t.amount), 0)
            ),
            backgroundColor: "#FF4B4B",
            borderColor: "#D00000",
            borderWidth: 1,
         },
      ],
   };

   const handleAddTransaction = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(
            "http://localhost:8005/api/transactions",
            newTransaction
         );
         setTransactions([...transactions, response.data]);
         setNewTransaction({
            userid: "user123",
            type: "expense",
            category: "",
            amount: "",
            date: "",
            description: "",
         });

         fetchTransactions();
      } catch (error) {
         console.error("Error adding transaction:", error);
      }
   };

   // Handle updating an existing transaction
   const handleUpdateTransaction = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.put(
            `http://localhost:8005/api/transactions/${updateTransaction._id}`,
            updateTransaction
         );
         setTransactions((prevTransactions) =>
            prevTransactions.map((t) =>
               t._id === updateTransaction._id ? response.data : t
            )
         );
         setUpdateTransaction({
            type: "expense",
            category: "",
            amount: "",
            date: "",
            description: "",
            id: null,
         });
         setUpdateForm(false); // Close the modal after successful update
      } catch (error) {
         console.error("Error updating transaction:", error);
      }
   };

   // Handle modal visibility
   const handleUpdate = (id) => {
      const transaction = transactions.find((t) => t._id === id);
      setUpdateTransaction(transaction);
      setUpdateForm(true); // Show modal
   };

   // Close modal
   const closeModal = () => {
      setUpdateForm(false);
   };

   // Delete transaction
   const handleDelete = async (id) => {
      try {
         await axios.delete(`http://localhost:8005/api/transactions/${id}`);
         // Update the state by filtering out the deleted transaction
         setTransactions(transactions.filter((t) => t._id !== id));
         fetchTransactions();
      } catch (error) {
         console.error("Error deleting transaction:", error);
      }
   };

   return (
      <div className="min-h-screen p-6 bg-white text-black">
         {/* Header */}
         <div className="flex justify-between items-center mb-8 test123">
            <h1 className="text-3xl font-bold text-[#108A01]">
               Budget Planner
            </h1>
         </div>

         {/* Summary Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg bg-[#8CCC8C]/10">
               <h2 className="text-xl font-semibold mb-2">Total Income</h2>
               <p className="text-2xl font-bold text-[#108A01]">
                  ${totals.income.toFixed(2)}
               </p>
            </div>
            <div className="p-6 rounded-lg bg-[#8CCC8C]/10">
               <h2 className="text-xl font-semibold mb-2">Total Expenses</h2>
               <p className="text-2xl font-bold text-[#4FAB4A]">
                  ${totals.expenses.toFixed(2)}
               </p>
            </div>
            <div className="p-6 rounded-lg bg-[#8CCC8C]/10">
               <h2 className="text-xl font-semibold mb-2">Balance</h2>
               <p className="text-2xl font-bold text-[#8CCC8C]">
                  ${(totals.income - totals.expenses).toFixed(2)}
               </p>
            </div>
         </div>

         {/* Charts */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 chartsss">
            <div className="p-6 rounded-lg bg-white shadow-lg">
               <h2 className="text-xl font-semibold mb-4">
                  Income vs Expenses
               </h2>
               <div className="h-64">
                  <Pie
                     data={pieChartData}
                     options={{ maintainAspectRatio: false }}
                  />
               </div>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg">
               <h2 className="text-xl font-semibold mb-4">Incomes</h2>
               <div className="h-64">
                  <Bar
                     data={incomeCategoryData}
                     options={{ maintainAspectRatio: false }}
                  />
               </div>
            </div>
            <div className="p-6 rounded-lg bg-white shadow-lg">
               <h2 className="text-xl font-semibold mb-4">Expenses</h2>
               <div className="h-64">
                  <Bar
                     data={expenseCategoryData}
                     options={{ maintainAspectRatio: false }}
                  />
               </div>
            </div>
         </div>

         {/* Add Transaction Form */}
         <form
            onSubmit={handleAddTransaction}
            className="mb-8 p-6 rounded-lg bg-white shadow-lg"
         >
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
               <select
                  value={newTransaction.type}
                  onChange={(e) =>
                     setNewTransaction({
                        ...newTransaction,
                        type: e.target.value,
                     })
                  }
                  className="p-2 rounded border border-[#8CCC8C] focus:outline-none focus:ring-2 focus:ring-[#108A01]"
               >
                  <option value="income" required>
                     Income
                  </option>
                  <option value="expense" required>
                     Expense
                  </option>
               </select>

               <select
                  value={newTransaction.category}
                  onChange={(e) =>
                     setNewTransaction({
                        ...newTransaction,
                        category: e.target.value,
                     })
                  }
                  className="p-2 rounded border border-[#8CCC8C] focus:outline-none focus:ring-2 focus:ring-[#108A01]"
               >
                  <option value="" required>
                     Select Category
                  </option>
                  {categories[newTransaction.type].map((category) => (
                     <option key={category} value={category}>
                        {category}
                     </option>
                  ))}
               </select>

               <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                     setNewTransaction({
                        ...newTransaction,
                        amount: e.target.value,
                     })
                  }
                  placeholder="Amount"
                  className="p-2 rounded border border-[#8CCC8C] focus:outline-none focus:ring-2 focus:ring-[#108A01]"
                  required
               />

               <input
                  type="date"
                  required
                  value={newTransaction.date}
                  onChange={(e) =>
                     setNewTransaction({
                        ...newTransaction,
                        date: e.target.value,
                     })
                  }
                  className="p-2 rounded border border-[#8CCC8C] focus:outline-none focus:ring-2 focus:ring-[#108A01]"
               />

               <div className="relative group">
                  <input
                     type="text"
                     name="description"
                     required
                     value={newTransaction.description}
                     onChange={handleInputChange}
                     placeholder="Description (min 5 words)"
                     className={`p-2 rounded border ${
                        errors.description
                           ? "border-red-500"
                           : "border-[#8CCC8C]"
                     } focus:outline-none focus:ring-2 focus:ring-[#108A01]`}
                  />

                  {/* Tooltip for validation error */}
                  {errors.description && (
                     <span className="absolute left-0 top-full mt-1 w-max bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {errors.description}
                     </span>
                  )}
               </div>

               <button
                  type="submit"
                  className="p-2 bg-[#108A01] text-white rounded hover:bg-[#4FAB4A] transition-colors"
               >
                  Add Transaction
               </button>
            </div>
         </form>

         {/* Search and Filter Section */}
         <div className="mb-6 flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
               <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-2 rounded border border-[#8CCC8C] focus:outline-none focus:ring-2 focus:ring-[#108A01]"
               />
            </div>
            <select
               onChange={handleFilter}
               className="p-2 rounded border border-[#8CCC8C] focus:outline-none focus:ring-2 focus:ring-[#108A01]"
            >
               <option value="all">All Transactions</option>
               <option value="income">Income</option>
               <option value="expense">Expense</option>
            </select>
            <button
               onClick={handleReset}
               className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
               Reset Filters
            </button>
            <button
               className="p-2 bg-[#108A01] text-white rounded hover:bg-[#4FAB4A] transition-colors"
               onClick={generatePDF}
            >
               Generate Report
            </button>
         </div>

         <div className="rounded-lg overflow-hidden bg-white shadow-lg ">
            <table className="w-full">
               <thead className="bg-[#108A01] text-white">
                  <tr>
                     <th className="p-4 text-left">Date</th>
                     <th className="p-4 text-left">Type</th>
                     <th className="p-4 text-left">Category</th>
                     <th className="p-4 text-left">Amount</th>
                     <th className="p-4 text-left">Description</th>
                     <th className="p-4 text-left">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {fil.map((transaction) => (
                     <tr key={transaction._id} className="border-b">
                        <td className="p-4">
                           {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                           {transaction.type.charAt(0).toUpperCase() +
                              transaction.type.slice(1)}
                        </td>
                        <td className="p-4">{transaction.category}</td>
                        <td className="p-4">${transaction.amount}</td>
                        <td className="p-4">{transaction.description}</td>
                        <td className="p-4">
                           <button
                              onClick={() => handleDelete(transaction._id)}
                              className="p-2 bg-red-500 text-white rounded hover:bg-red-700"
                           >
                              Delete
                           </button>
                           <button
                              onClick={() => handleUpdate(transaction._id)}
                              className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
                           >
                              Update
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>

            {/* Transactions Table */}
            <div className="rounded-lg overflow-hidden bg-white shadow-lg">
               {/* Modal for updating transaction */}
               {updateForm && (
                  <div className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex justify-center items-center z-50">
                     <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">
                           Update Transaction
                        </h2>
                        <form onSubmit={handleUpdateTransaction}>
                           <div className="mb-4">
                              <label
                                 htmlFor="type"
                                 className="block text-sm font-medium text-gray-700"
                              >
                                 Type
                              </label>
                              <select
                                 id="type"
                                 value={updateTransaction.type}
                                 onChange={(e) =>
                                    setUpdateTransaction({
                                       ...updateTransaction,
                                       type: e.target.value,
                                    })
                                 }
                                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
                              >
                                 <option value="income">Income</option>
                                 <option value="expense">Expense</option>
                              </select>
                           </div>
                           <div className="mb-4">
                              <label
                                 htmlFor="category"
                                 className="block text-sm font-medium text-gray-700"
                              >
                                 Category
                              </label>
                              <select
                                 id="category"
                                 value={updateTransaction.category}
                                 onChange={(e) =>
                                    setUpdateTransaction({
                                       ...updateTransaction,
                                       category: e.target.value,
                                    })
                                 }
                                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
                              >
                                 {categories[updateTransaction.type].map(
                                    (category, index) => (
                                       <option key={index} value={category}>
                                          {category}
                                       </option>
                                    )
                                 )}
                              </select>
                           </div>
                           <div className="mb-4">
                              <label
                                 htmlFor="amount"
                                 className="block text-sm font-medium text-gray-700"
                              >
                                 Amount
                              </label>
                              <input
                                 id="amount"
                                 type="number"
                                 value={updateTransaction.amount}
                                 onChange={(e) =>
                                    setUpdateTransaction({
                                       ...updateTransaction,
                                       amount: e.target.value,
                                    })
                                 }
                                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
                              />
                           </div>
                           <div className="mb-4">
                              <label
                                 htmlFor="description"
                                 className="block text-sm font-medium text-gray-700"
                              >
                                 Description
                              </label>
                              <input
                                 id="description"
                                 type="text"
                                 value={updateTransaction.description}
                                 onChange={(e) =>
                                    setUpdateTransaction({
                                       ...updateTransaction,
                                       description: e.target.value,
                                    })
                                 }
                                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
                              />
                           </div>
                           <div className="mb-4">
                              <input
                                 id="description"
                                 type="text"
                                 value={updateTransaction._id}
                                 onChange={(e) =>
                                    setUpdateTransaction({
                                       ...updateTransaction,
                                       id: e.target.value,
                                    })
                                 }
                                 className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                 hidden
                              />
                           </div>
                           <div className="flex justify-end space-x-4">
                              <button
                                 type="button"
                                 onClick={closeModal}
                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                              >
                                 Close
                              </button>
                              <button
                                 type="submit"
                                 onClick={handleUpdateTransaction(
                                    updateTransaction._id
                                 )}
                                 className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                              >
                                 Update
                              </button>
                           </div>
                        </form>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
