import React, { useEffect, useState } from "react";
import axios from "axios";
import Token from "@/components/userManagement/logins/Token";
import Navigation from "@/components/farmerManagement/Navigation/Navigation";
import FooterLandingPage from "@/components/other/FooterLandingPage";
import { 
  Search, 
  Download, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  DollarSign,
  Calendar,
  CreditCard,
  Phone,
  User,
  FileText,
  Building2,
  ArrowUpDown,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [totalAmount, setTotalAmount] = useState(0);

  const token = Token();
  const farmerId = token.userId;

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    const total = filteredPayments.reduce((sum, payment) => sum + Number(payment.amount), 0);
    setTotalAmount(total);
  }, [filteredPayments]);

  const fetchPayments = async () => {
    try {
      const res = await axios.get("http://localhost:8005/api/get-farmerpay");
      setPayments(res.data);
      const filtered = res.data.filter((payment) => payment.farmerId === farmerId);
      setFilteredPayments(filtered);
    } catch (err) {
      setError("Failed to fetch payments.");
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = payments.filter((payment) => 
      payment.farmerId === farmerId && 
      (payment.farmerName.toLowerCase().includes(value.toLowerCase()) ||
       payment.billNo.toLowerCase().includes(value.toLowerCase()) ||
       payment.bank.toLowerCase().includes(value.toLowerCase()))
    );
    setFilteredPayments(filtered);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sorted = [...filteredPayments].sort((a, b) => {
      if (key === 'date') {
        return direction === 'asc' 
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      }
      if (key === 'amount') {
        return direction === 'asc' 
          ? Number(a[key]) - Number(b[key])
          : Number(b[key]) - Number(a[key]);
      }
      return direction === 'asc'
        ? a[key].toString().localeCompare(b[key].toString())
        : b[key].toString().localeCompare(a[key].toString());
    });
    setFilteredPayments(sorted);
  };

  const downloadCSV = () => {
    const headers = ['Status', 'Bill No', 'Name', 'Amount', 'Date', 'Bank', 'Branch', 'Contact'];
    const csvData = filteredPayments.map(payment => [
      'Completed', // Since we don't have actual status, defaulting to Completed
      payment.billNo,
      payment.farmerName,
      payment.amount,
      new Date(payment.date).toLocaleDateString(),
      payment.bank,
      payment.branch,
      payment.contact
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `payment_history_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Failed':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Navigation/>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
                <p className="text-gray-600">Track your payment transactions</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <DollarSign className="h-6 w-6 text-green-600 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Total Payments</p>
                      <p className="text-xl font-semibold text-gray-800">LKR {totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={downloadCSV}
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, bill number, or bank..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Status
                        {sortConfig.key === 'status' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('billNo')}>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        Bill No
                        {sortConfig.key === 'billNo' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('farmerName')}>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Name
                        {sortConfig.key === 'farmerName' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('amount')}>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        Amount (LKR)
                        {sortConfig.key === 'amount' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('date')}>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Date
                        {sortConfig.key === 'date' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('bank')}>
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Bank
                        {sortConfig.key === 'bank' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('branch')}>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2" />
                        Branch
                        {sortConfig.key === 'branch' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('contact')}>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                        {sortConfig.key === 'contact' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPayments.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                        No payments found
                      </td>
                    </tr>
                  ) : (
                    filteredPayments.map((p, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor('Completed')}`}>
                            {getStatusIcon('Completed')}
                            <span className="ml-1">Completed</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.billNo}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.farmerName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">LKR {Number(p.amount).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(p.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.bank}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.branch}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{p.contact}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <FooterLandingPage/>
    </>
  );
}
