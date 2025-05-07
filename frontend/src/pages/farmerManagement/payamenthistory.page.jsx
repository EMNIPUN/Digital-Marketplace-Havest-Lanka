import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:8005/api/get-farmerpay");
      setPayments(res.data);

      
      const filtered = res.data.filter((payment) => payment.farmerId === "123");
      setFilteredPayments(filtered);
    } catch (err) {
      setError("Failed to fetch payments.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-5 w-[1100px] mx-auto rounded-xl shadow-md mt-10">
      <h2 className="text-xl font-semibold mb-4">Payments for Farmer ID: 123</h2>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Farmer ID</th>
              <th className="border px-3 py-2">Bill No</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Amount (LKR)</th>
              <th className="border px-3 py-2">Date</th>
              <th className="border px-3 py-2">Bank</th>
              <th className="border px-3 py-2">Branch</th>
              <th className="border px-3 py-2">Contact</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No payments found
                </td>
              </tr>
            ) : (
              filteredPayments.map((p, index) => (
                <tr key={index} className="text-sm">
                  <td className="border px-3 py-2">{p.farmerId}</td>
                  <td className="border px-3 py-2">{p.billNo}</td>
                  <td className="border px-3 py-2">{p.farmerName}</td>
                  <td className="border px-3 py-2">{p.amount}</td>
                  <td className="border px-3 py-2">{new Date(p.date).toLocaleDateString()}</td>
                  <td className="border px-3 py-2">{p.bank}</td>
                  <td className="border px-3 py-2">{p.branch}</td>
                  <td className="border px-3 py-2">{p.contact}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
