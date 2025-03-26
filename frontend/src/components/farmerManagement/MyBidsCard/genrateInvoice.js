import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const generateInvoice = () => {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("Bid Invoice - Harvest Lanaka", 70, 20);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text("This document serves as the official bid invoice for the crops placed by the seller in the bidding platform.,", 20, 40);
    doc.text("It contains the details of the crops being offered the quantity, pricing, and total cost of the bid.", 20, 45);
  
    doc.setFont('helvetica', 'bold');
    doc.text("Seller: John Doe (Seller Company)", 20, 56);
    doc.text("Seller Address: 123 Market Street, Colombo, Sri Lanka", 20, 61); 

    doc.setFontSize
  
    autoTable(doc,{
      startY: 74,
      head: [['Field', 'Details']],
      body: [
        ['Crops Name', bid.cropsName],
        ['Quantity', `${bid.quantity} kg`],
        ['Price per kg', `Rs. ${bid.price}.00`],
      ],
    });
  
    doc.save(`Invoice_${bid._id}.pdf`);
  };
  
export default generateInvoice;