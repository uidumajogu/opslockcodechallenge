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

function getAllNumbersInRange(
  lowerLimit: number,
  upperLimit: number
): Array<number> {
  let numbersInRangeArray: Array<number> = [lowerLimit];
  for (let i = lowerLimit; i < upperLimit; i++) {
    numbersInRangeArray.push(i + 1);
  }
  return numbersInRangeArray;
}

function selectedShift(startTime: string, endTime: string): string {
  let startTimeToNumber = convertShiftTimeToNumber(startTime);
  let endTimeToNumber = convertShiftTimeToNumber(endTime);
  let startTimeIsValid: boolean = true;
  let endTimeIsValid: boolean = true;
  let timeRangeIsValid: boolean = true;

  if (startTime === endTime) {
    return "Your shift start time is same as your shift end time";
  }

  if (startTime > endTime) {
    return "Your shift start time is greater than your shift end time";
  }

  usershifts.forEach((shift: { start: string; end: string }) => {
    let shiftTimesRange: Array<number> = getAllNumbersInRange(
      convertShiftTimeToNumber(shift.start),
      convertShiftTimeToNumber(shift.end)
    );
    let selectedShiftTimesRange: Array<number> = getAllNumbersInRange(
      startTimeToNumber,
      endTimeToNumber
    );

    shiftTimesRange.forEach((shiftTime: number) => {
      selectedShiftTimesRange.forEach((selectedTime: number) => {
        if (shiftTime === selectedTime) {
          if (
            shiftTime === shiftTimesRange[0] &&
            selectedTime ===
              selectedShiftTimesRange[selectedShiftTimesRange.length - 1]
          ) {
            timeRangeIsValid = true;
          } else {
            if (
              shiftTime === shiftTimesRange[shiftTimesRange.length - 1] &&
              selectedTime === selectedShiftTimesRange[0]
            ) {
              timeRangeIsValid = true;
            } else {
              timeRangeIsValid = false;
            }
          }
        }

        if (startTimeToNumber === shiftTimesRange[shiftTimesRange.length - 1]) {
          startTimeIsValid = true;
        }

        if (endTimeToNumber === shiftTimesRange[0]) {
          endTimeIsValid = true;
        }
      });
    });
  });

  if (!startTimeIsValid) {
    return "Your shift start time is invalid";
  }

  if (!endTimeIsValid) {
    return "Your shift end time is invalid";
  }

  if (!timeRangeIsValid) {
    return "Your shift time range is invalid";
  }

  return "Your shift starts at " + startTime + " and ends at " + endTime;
}

//Test Cases
console.log(selectedShift("1100", "1000"));
console.log(selectedShift("1100", "1100"));
console.log(selectedShift("1100", "1200"));
console.log(selectedShift("0600", "1000"));
console.log(selectedShift("0100", "0800"));
console.log(selectedShift("0100", "1000"));
console.log(selectedShift("0100", "0600"));
console.log(selectedShift("2000", "2400"));
console.log(selectedShift("0100", "2400"));
