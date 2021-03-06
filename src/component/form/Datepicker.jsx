import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Datepicker = () => {
  const [startDate, setStartDate] = useState(null);
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      disabledKeyboardNavigation
      placeholderText="mm/yy"
      className="form-input datepicker"
    />
  );
};
export default Datepicker;
