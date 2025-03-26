import PdfPrinter from 'pdfmake';
import fs from 'fs';
import path from 'path';
import User from '../../../models/userManagement/User.js';

const UserRegistrationReport = async (req, res) => {
    try {
        const users = await User.find();
        const totalUsers = users.length;
        const activeUsers = users.filter(user => user.status).length;
        const inactiveUsers = totalUsers - activeUsers;
        const roleDistribution = users.reduce((acc, user) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
        }, {});

        const fonts = {
            Roboto: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        };


        const printer = new PdfPrinter(fonts);

        const docDefinition = {
            content: [
                { text: 'User Registration Report', style: 'header' },
                { text: `Total Users: ${totalUsers}`, style: 'subheader' },
                { text: `Active Users: ${activeUsers}`, style: 'subheader' },
                { text: `Inactive Users: ${inactiveUsers}`, style: 'subheader' },
                { text: 'User Role Distribution:', style: 'subheader' },
                {
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            ['Role', 'Count'],
                            ...Object.entries(roleDistribution).map(([role, count]) => [role, count])
                        ]
                    },
                    layout: 'lightHorizontalLines'
                },
                { text: 'User Details:', style: 'subheader' },
                {
                    table: {
                        widths: ['10%', '30%', '30%', '30%'],
                        body: [
                            ['#', 'Name', 'Email', 'Role'],
                            ...users.map((user, index) => [index + 1, user.name, user.email, user.role])
                        ]
                    },
                    layout: 'lightHorizontalLines'
                }
            ],
            styles: {
                header: { fontSize: 18, bold: true, alignment: 'center', margin: [0, 0, 0, 10] },
                subheader: { fontSize: 14, bold: true, margin: [0, 5, 0, 5] }
            }
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const filePath = 'reports/user_registration_report.pdf';

        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.pipe(res);
        pdfDoc.end();

        res.setHeader('Content-Disposition', 'attachment; filename=user_registration_report.pdf');
        res.setHeader('Content-Type', 'application/pdf');
    } catch (error) {
        res.status(500).json({ message: 'Error generating report', error });
    }
};

export default UserRegistrationReport