import React, { useState } from 'react';

export default function PaymentDetails() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample transaction data - replace with actual data from your API
  const transactions = [
    {
      _id: "67d41fe08d2b7276954c024f",
      merchant_id: "1229798",
      order_id: "order45",
      payment_id: "320032470191",
      payhere_amount: "502.00",
      payhere_currency: "LKR",
      status_code: "2",
      md5sig: "FB1CE84FCF718A170B47F7FAB8ADA6F4",
      custom_1: "",
      custom_2: "",
      method: "VISA",
      status_message: "Successfully received the VISA payment",
      card_holder_name: "pamudu lelkada",
      card_no: "************1292",
      card_expiry: "12/28",
      createdAt: "1741955040327",
      updatedAt: "1741955040327"
    }
    // Add more transactions as needed
  ];

  const formatDate = (timestamp) => {
    return new Date(parseInt(timestamp)).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Transactions</h1>
        
        {/* Transactions Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#108A01]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.order_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.payhere_amount} {transaction.payhere_currency}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.method}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {transaction.status_message}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transaction.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleViewDetails(transaction)}
                      className="text-[#108A01] hover:text-[#4FAB4A] font-medium"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && selectedTransaction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Transaction Details</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order ID</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.order_id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment ID</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.payment_id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Amount</p>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedTransaction.payhere_amount} {selectedTransaction.payhere_currency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Method</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.method}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Card Holder</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.card_holder_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Card Number</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.card_no}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Card Expiry</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.card_expiry}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.status_message}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Created At</p>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedTransaction.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Updated At</p>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedTransaction.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}