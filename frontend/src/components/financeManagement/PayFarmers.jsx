import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SubmitPaymentForm() {
  const [formData, setFormData] = useState({
    farmerId: "",
    billNo: "",
    farmerName: "",
    address: "",
    contact: "",
    bank: "",
    branch: "",
    amount: "",
    date: "",
    remarks: "",
  });

  const [payments, setPayments] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:8005/api/get-farmerpay");
      setPayments(res.data);
    } catch (err) {
      console.error("Failed to fetch payments:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    for (let key in formData) {
      if (key !== "address" && key !== "bank" && key !== "branch" && key !== "remarks") {
        if (!formData[key]) return `Field "${key}" is required.`;
      }
    }
    if (formData.amount < 0) return "Amount cannot be negative.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axios.post("http://localhost:8005/api/pay-farmer", formData);
      setSuccess("Payment submitted successfully!");
      setFormData({
        farmerId: "",
        billNo: "",
        farmerName: "",
        address: "",
        contact: "",
        bank: "",
        branch: "",
        amount: "",
        date: "",
        remarks: "",
      });
      fetchPayments();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit payment.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="bg-white p-5 w-[800px] mx-auto rounded-xl shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4">Submit Farmer Payment</h2>

        {error && <div className="text-red-600 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="farmerId" placeholder="Farmer Id" className="p-2 border rounded" onChange={handleChange} value={formData.farmerId} required />
            <input type="text" name="billNo" placeholder="Bill No" className="p-2 border rounded" onChange={handleChange} value={formData.billNo} required />
            <input type="text" name="farmerName" placeholder="Farmer Name" className="p-2 border rounded" onChange={handleChange} value={formData.farmerName} required />
            <input type="text" name="address" placeholder="Address" className="p-2 border rounded" onChange={handleChange} value={formData.address} />
            <input type="tel" name="contact" placeholder="Contact Number" className="p-2 border rounded" onChange={handleChange} value={formData.contact} required />
            <input type="text" name="bank" placeholder="Bank Name" className="p-2 border rounded" onChange={handleChange} value={formData.bank} />
            <input type="text" name="branch" placeholder="Branch Name" className="p-2 border rounded" onChange={handleChange} value={formData.branch} />
            <input type="number" step="0.01" name="amount" placeholder="Amount (LKR)" className="p-2 border rounded" onChange={handleChange} value={formData.amount} required />
            <input type="date" name="date" className="p-2 border rounded" onChange={handleChange} value={formData.date} required />
          </div>
          <textarea name="remarks" placeholder="Additional Remarks" className="w-full p-2 border rounded" rows="3" onChange={handleChange} value={formData.remarks}></textarea>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white font-semibold rounded"
            style={{ backgroundColor: "#22C55E" }}
          >
            Submit Payment
          </button>
        </form>
      </div>

      {/* Payment Table */}
      <div className="bg-white p-5 w-[1100px] mx-auto rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Payments</h2>
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
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">No payments found</td>
                </tr>
              ) : (
                payments.map((p, idx) => (
                  <tr key={idx} className="text-sm">
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
    </div>
  );
}
