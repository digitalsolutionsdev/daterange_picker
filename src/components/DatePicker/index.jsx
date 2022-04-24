import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import createMomentsSDK from "@livechat/moments-sdk";

const CalendarDatePickerCs = () => {
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // check window innerWidth
  useEffect(() => {
    function checkWidth() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [state]);

  // get and send dates
  const getDatePick = () => {
    createMomentsSDK({
      title: "My App",
      icon: "icon url",
      isFragile: true,
    }).then((momentsSDK) => {
      // console.log(momentsSDK)
      momentsSDK.sendMessage({ text: state });
      momentsSDK.close();
    });
  };
  return (
    <section>
      <div className="cs_container text_center">
        <h2 className="sec_heading">Date Range Picker.</h2>
        <hr />
        <div className="cs_date_picker_card">
          <DateRange
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={true}
            months={1}
            ranges={state}
            direction={screenSize > 768 ? "horizontal" : "vertical"}
            preventSnapRefocus={true}
            calendarFocus="backwards"
            minDate={addDays(new Date(), 3)}
            // maxDate={addDays(new Date(), 3)}
            rangeColors={["#335D65"]}
            color={"#335D65"}
            disabledDates={[
              addDays(new Date(), 7),
              new Date("april 29 2022"),
              addDays(new Date(), 14),
            ]}
          />
          <div className="cs_row justify_content_end">
            <button className="cs_btn_main" onClick={getDatePick}>
              Finish
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarDatePickerCs;
