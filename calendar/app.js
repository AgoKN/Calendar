function showCalendar() {
  // Get the selected date
  const day = document.getElementById("day").value;
  const monthName = document.getElementById("month").value;
  const year = document.getElementById("year").value;

  // Get the month index from the month name
  const monthIndex = new Date(Date.parse(monthName + " 1, 2000")).getMonth();

  function noRepeat() {
    document.body.style.backgroundRepeat = "no-repeat";
  }

  function cover() {
    document.body.style.backgroundSize = "cover";
  }

  if (monthIndex == 5 || monthIndex == 6 || monthIndex == 7) {
    document.body.style.backgroundImage = "url(pics/summer.jpeg)";
    noRepeat();
    cover();
  }
  if (monthIndex == 8 || monthIndex == 9 || monthIndex == 10) {
    document.body.style.backgroundImage = "url(pics/autumn.jpeg)";
    noRepeat();
    cover();
  }
  if (monthIndex == 11 || monthIndex == 0 || monthIndex == 1) {
    document.body.style.backgroundImage = "url(pics/winter.jpg)";
    noRepeat();
    cover();
  }
  if (monthIndex == 2 || monthIndex == 3 || monthIndex == 4) {
    document.body.style.backgroundImage = "url(pics/spring.jpeg)";
    noRepeat();
    cover();
  }

  // Check that the selected date is valid
  if (day < 1 || day > 31 || monthIndex < 0 || monthIndex > 11 || year < 0) {
    alert("Invalid date!");
    return;
  }

  // Calculate the date for the first day of the month
  const firstDayOfMonth = new Date(year, monthIndex, 1);

  // Calculate the day of the week for the first day of the month the condition is that the days to start at Monday
  const firstDayOfWeek = firstDayOfMonth.getDay() === 0 ? 6 : firstDayOfMonth.getDay() - 1;

  // Calculate the number of days in the month
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate();

  // Create the calendar table
  const tableBody = document.createElement("tbody");

  let row = document.createElement("tr");

  // Add blank cells for days before the first day of the month
  for (let i = 0; i < firstDayOfWeek; i++) {
    const cell = document.createElement("td");
    row.appendChild(cell);
  }

  // Add cells for each day of the month
  for (let i = 1; i <= lastDayOfMonth; i++) {
    const cell = document.createElement("td");
    cell.textContent = i;
    if (i === parseInt(day)) {
      cell.classList.add("selected");
    }
    if (i === new Date().getDate() && monthIndex === new Date().getMonth() && year === new Date().getFullYear()) {
      cell.classList.add("today");
    }
    row.appendChild(cell);
    if ((i + firstDayOfWeek) % 7 === 0 || i === lastDayOfMonth) {
      tableBody.appendChild(row);
      row = document.createElement("tr");
    }
  }

  // Create the calendar table header
  const tableHead = document.createElement("thead");
  row = document.createElement("tr");
  const dayOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  for (let i = 0; i < 7; i++) {
    const cell = document.createElement("th");
    cell.textContent = dayOfWeek[i];
    row.appendChild(cell);
  }
  tableHead.appendChild(row);

  // Create the calendar table caption
  const tableCaption = document.createElement("caption");
  tableCaption.textContent = monthName + " " + year;
  tableCaption.classList.add("tableCaption")

  // Create the calendar table
  const calendarTable = document.createElement("table");
  calendarTable.appendChild(tableCaption);
  calendarTable.appendChild(tableHead);
  calendarTable.appendChild(tableBody);

  // Remove any previously generated calendar
  const calendarContainer = document.getElementById("calendar-container");
  while (calendarContainer.firstChild) {
    calendarContainer.removeChild(calendarContainer.firstChild);
  }

  // Add the calendar to the page
  calendarContainer.appendChild(calendarTable);
}
