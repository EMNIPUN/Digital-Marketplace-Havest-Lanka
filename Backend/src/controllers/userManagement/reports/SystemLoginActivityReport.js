import PDFDocument from 'pdfkit';
import ActivityScema from '../../../models/userManagement/ActivityScema.js';
import User from '../../../models/userManagement/User.js';

export const generateLoginReport = async (req, res) => {
    try {
        const activities = await ActivityScema.find({
            action: { $in: ['logged in', 'logged out'] }
        }).populate('user', 'name role');

        const fileName = 'login-activity-report.pdf';
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', 'application/pdf');

        const doc = new PDFDocument({ margin: 40, size: 'A4' });
        doc.pipe(res);

        // Title
        doc.fontSize(18).fillColor('#2c3e50').text('System Login Activity Report', {
            align: 'center',
        });
        doc.moveDown(1);

        // Table Setup
        const tableHeaders = ['User ID', 'User Name', 'Role', 'Action', 'Date', 'Time'];
        const tableStartY = doc.y + 10;
        const columnWidths = [85, 100, 85, 85, 85, 85];
        let y = tableStartY;

        // Header Row
        doc.rect(40, y, 520, 25).fill('#d0e8f2').stroke(); // Light blue header background
        doc.fillColor('#1a1a1a').fontSize(12).font('Helvetica-Bold');

        let x = 40;
        tableHeaders.forEach((header, i) => {
            doc.text(header, x + 5, y + 7, { width: columnWidths[i], align: 'left' });
            x += columnWidths[i];
        });

        y += 30;
        doc.font('Helvetica').fontSize(10);

        // Table Rows
        // Table Rows
        activities.forEach((activity, index) => {
            const user = activity.user;
            const userId = user._id.toString().slice(-12);
            const userUrl = `http://localhost:5173/profile/${user._id.toString()}`; // Replace with your actual user URL

            const row = [
                { text: userId, link: userUrl },  // Create a link for user ID
                user.name,
                user.role,
                activity.action,
                activity.date,
                activity.time
            ];

            // Background coloring
            const bgColor = index % 2 === 0 ? '#f4fbf9' : '#fdfdfd'; // Soft alternating rows
            doc.rect(40, y, 520, 25).fill(bgColor).fillOpacity(1);

            x = 40;
            row.forEach((cell, i) => {
                if (i === 0 && cell.link) {
                    // User ID with link
                    doc.fillColor('#1a1a1a').text(cell.text, x + 5, y + 7, {
                        width: columnWidths[i],
                        align: 'left'
                    });
                    doc.link(x + 5, y + 7, columnWidths[i], 15, cell.link);  // Add link to user ID
                } else if (i === 3) {
                    const actionColor = cell === 'logged in' ? '#2ecc71' : '#e74c3c'; // Green or red
                    doc.fillColor(actionColor).text(cell, x + 5, y + 7, {
                        width: columnWidths[i],
                        align: 'left'
                    });
                } else {
                    doc.fillColor('#333333').text(cell, x + 5, y + 7, {
                        width: columnWidths[i],
                        align: 'left'
                    });
                }
                x += columnWidths[i];
            });

            y += 30;

            if (y > 750) {
                doc.addPage();
                y = 40;
            }
        });


        // Footer
        doc.fillColor('#999').fontSize(9).text(`Generated on ${new Date().toLocaleString()}`, 40, 770, {
            align: 'right'
        });

        doc.end();

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error generating PDF report.' });
    }
};
