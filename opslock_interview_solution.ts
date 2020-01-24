interface IShift {
  start: string;
  end: string;
}

const usershifts = <IShift[]>[
  {
    start: "0600",
    end: "1000"
  },
  {
    start: "1600",
    end: "2000"
  }
];

function convertShiftTimeToNumber(shiftTime: string): number {
  return parseInt(shiftTime.substring(0, 2));
}

function selectedShift(startTime: string, endTime: string): string {
  let startIsValid: boolean = true;
  let endIsValid: boolean = true;

  usershifts.forEach((shift: { start: string; end: string }) => {
    if (startIsValid) {
      if (
        convertShiftTimeToNumber(startTime) >=
          convertShiftTimeToNumber(shift.start) &&
        convertShiftTimeToNumber(startTime) <
          convertShiftTimeToNumber(shift.end)
      ) {
        startIsValid = false;
      } else {
        startIsValid = true;
      }
    }

    if (startIsValid) {
      if (
        convertShiftTimeToNumber(shift.start) >=
          convertShiftTimeToNumber(startTime) &&
        convertShiftTimeToNumber(shift.start) !==
          convertShiftTimeToNumber(endTime) &&
        convertShiftTimeToNumber(shift.end) < convertShiftTimeToNumber(endTime)
      ) {
        startIsValid = false;
      } else {
        startIsValid = true;
      }
    }

    if (startIsValid && endIsValid) {
      if (
        (convertShiftTimeToNumber(endTime) >
          convertShiftTimeToNumber(startTime) &&
          convertShiftTimeToNumber(endTime) <=
            convertShiftTimeToNumber(shift.start)) ||
        convertShiftTimeToNumber(startTime) >=
          convertShiftTimeToNumber(shift.end)
      ) {
        endIsValid = true;
      } else {
        endIsValid = false;
      }
    }
  });

  if (!startIsValid) {
    return "Your shift start time interferes with one of your shifts";
  }

  if (!endIsValid) {
    return "Your shift end time interferes with one of your shifts";
  }

  return "Your shift starts at " + startTime + " and ends at " + endTime;
}

//Test Cases
// console.log(selectedShift("1100", "1200"))
// console.log(selectedShift("0600", "1000"))
// console.log(selectedShift("0100", "0800"))
// console.log(selectedShift("0100", "1000"))
// console.log(selectedShift("0100", "0600"))
// console.log(selectedShift("0200", "2400"))
