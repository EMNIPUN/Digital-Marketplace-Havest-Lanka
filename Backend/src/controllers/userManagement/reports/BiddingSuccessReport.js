import PDFDocument from 'pdfkit';
import bid from '../../../models/shopOwnerManagement/bid.js';
import User from '../../../models/userManagement/User.js';

export const generateBidReport = async (req, res) => {
    try {
        const bids = await bid.find();

        const totalBids = bids.length;
        const acceptedBids = bids.filter(bid => bid.status === 'Payment Approved').length;
        const successRate = totalBids > 0 ? ((acceptedBids / totalBids) * 100).toFixed(2) : 0;

        const doc = new PDFDocument({ margin: 50 });

        // Pipe PDF to a buffer or stream to send it directly
        let chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => {
            const result = Buffer.concat(chunks);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="bidding_report.pdf"');
            res.send(result);
        });

        // Title
        doc
            .fontSize(20)
            .fillColor('#2c3e50')
            .text('Bidding Success Report', { align: 'center' })
            .moveDown();

        // Summary Section
        doc
            .fontSize(12)
            .fillColor('#000')
            .text(`Total Bids: ${totalBids}`)
            .text(`Successful (Accepted) Bids: ${acceptedBids}`)
            .text(`Success Rate: ${successRate}%`)
            .moveDown();

        // Horizontal line
        doc
            .moveTo(50, doc.y)
            .lineTo(550, doc.y)
            .stroke()
            .moveDown();

        // Table Header
        const tableTop = doc.y;
        doc
            .fontSize(12)
            .font('Helvetica-Bold')
            .text('Farmer', 50, tableTop)
            .text('Product', 150, tableTop)
            .text('Qty', 250, tableTop)
            .text('Price', 300, tableTop)
            .text('Status', 380, tableTop);

        // Table Rows
        let y = tableTop + 20;
        doc.font('Helvetica');
        bids.forEach(b => {
            doc
                .fontSize(10)
                .text(b.farmer, 50, y)
                .text(b.product, 150, y)
                .text(b.quantity.toString(), 250, y)
                .text(b.price.toString(), 300, y)
                .text(b.status, 380, y);
            y += 20;

            // Check if we are near the bottom of the page
            if (y > 750) {
                doc.addPage();
                y = 50;
            }
        });

        doc.end();

    } catch (error) {
        console.error('Error generating bid report:', error);
        res.status(500).json({ message: 'Failed to generate report.' });
    }
};
