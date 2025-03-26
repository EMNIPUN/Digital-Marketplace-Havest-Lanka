import { html2pdf } from "html2pdf.js";
import React from "react";

function GenerateReport() {
   const reportGen = async () => {
      html2pdf();
   };

   return <div>GenerateReport</div>;
}

export default GenerateReport;
