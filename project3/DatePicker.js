"use strict";

function DatePicker(id, callback) {
  this.id = id;
  this.callback = callback;
}

DatePicker.prototype.render = function (selectedDate) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const tbl = document.createElement("table");
  tbl.style.width = "200px";
  tbl.style.border = "1px solid black";

  const headerRow = tbl.insertRow();
  const headerCell = headerRow.insertCell();
  headerCell.colSpan = "7";
  headerCell.style.textAlign = "center";

  const prevButton = document.createElement("button");
  prevButton.textContent = "<";
  prevButton.style.float = "left";
  prevButton.style.cursor = "pointer";
  prevButton.onclick = () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    this.render(selectedDate);
  };
  headerCell.appendChild(prevButton);

  headerCell.appendChild(
    document.createTextNode(
      " " +
        monthNames[selectedDate.getMonth()] +
        " " +
        selectedDate.getFullYear() +
        " "
    )
  );

  const nextButton = document.createElement("button");
  nextButton.textContent = ">";
  nextButton.style.float = "right";
  nextButton.style.cursor = "pointer";
  nextButton.onclick = () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    this.render(selectedDate);
  };
  headerCell.appendChild(nextButton);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weekRow = tbl.insertRow();
  for (let j = 0; j < 7; j++) {
    const td = weekRow.insertCell();
    td.appendChild(document.createTextNode(weekDays[j]));
    td.style.border = "1px solid black";
  }

  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const startingDay = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const newRow = tbl.insertRow();
    for (let j = 0; j < 7; j++) {
      const td = newRow.insertCell();
      if (i === 0 && j < startingDay) {
        continue;
      }
      if (date > daysInMonth) {
        continue;
      }
      td.appendChild(document.createTextNode(date));
      td.style.border = "1px solid black";

      const currentDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        date
      );
      if (currentDate.getMonth() === selectedDate.getMonth()) {
        td.style.cursor = "pointer";
        td.onclick = () => {
          this.callback(this.id, {
            month: currentDate.getMonth() + 1,
            day: currentDate.getDate(),
            year: currentDate.getFullYear(),
          });
        };
      }

      date++;
    }
  }

  const elem = document.getElementById(this.id);
  elem.innerHTML = "";
  elem.appendChild(tbl);
};

const datePickerCallback = (id, fixedDate) => {
  console.log(
    "DatePicker with id",
    id,
    "selected date:",
    fixedDate.month + "/" + fixedDate.day + "/" + fixedDate.year
  );
};

const myDatePicker = new DatePicker("datepicker", datePickerCallback);
myDatePicker.render(new Date());
