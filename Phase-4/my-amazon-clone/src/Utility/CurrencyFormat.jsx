import React from "react";
import numeral from "numeral";

// 🟢 export የሚለውን ቃል ከፊት ጨምርበት
export const CurrencyFormat = ({ amount }) => {
  const formattedAmount = numeral(amount).format("$0,0.00");
  return <span>{formattedAmount}</span>;
};
export default CurrencyFormat;