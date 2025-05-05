import React, { useState }  from "react"



export default function(){
    const [formData, setFormData] = useState({
        paymentId: '',
        billNo: '',
        farmerName: '',
        address: '',
        contact: '',
        bank: '',
        branch: '',
        amount: '',
        date: '',
        remarks: '',
      });
    
      const handleChange = (e) => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: e.target.value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Payment Data:', formData);
        // TODO: Submit to backend or API
      };
    
      return (
        <div className="bg-gray-100 h-[94vh]">
              <div className="bg-white p-5 w-[800px] h-[580px] mx-auto rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Submit Farmer Payment</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input type="text" name="paymentId" placeholder="Payment ID" className="p-2 border rounded" onChange={handleChange} required />
              <input type="text" name="billNo" placeholder="Bill No" className="p-2 border rounded" onChange={handleChange} required />
              <input type="text" name="farmerName" placeholder="Farmer Name" className="p-2 border rounded" onChange={handleChange} required />
              <input type="text" name="address" placeholder="Address" className="p-2 border rounded" onChange={handleChange} />
              <input type="tel" name="contact" placeholder="Contact Number" className="p-2 border rounded" onChange={handleChange} required />
              <input type="text" name="bank" placeholder="Bank Name" className="p-2 border rounded" onChange={handleChange} />
              <input type="text" name="branch" placeholder="Branch Name" className="p-2 border rounded" onChange={handleChange} />
              <input type="number" step="0.01" name="amount" placeholder="Amount (LKR)" className="p-2 border rounded" onChange={handleChange} required />
              <input type="date" name="date" className="p-2 border rounded" onChange={handleChange} required />
            </div>
            <textarea name="remarks" placeholder="Additional Remarks" className="w-full p-2 border rounded" rows="3" onChange={handleChange}></textarea>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-semibold rounded"
              style={{ backgroundColor: '#22C55E' }}
            >
              Submit Payment
            </button>
          </form>
        </div>
        </div>
      
      );
}