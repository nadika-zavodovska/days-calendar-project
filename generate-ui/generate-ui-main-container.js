import { changeMonth, setDate } from "../web.mjs"

export function generateUiMainContainer() {
    const headerContainer = document.createElement("header");
    headerContainer.id = "header-container";
    document.body.appendChild(headerContainer);

    const pageTitle = document.createElement("h1");
    pageTitle.id = "page-title";
    pageTitle.innerText = "Calendar with commemorative days";
    headerContainer.appendChild(pageTitle);
    
    const mainContainer = document.createElement("main");
    mainContainer.id = "main-container";
    document.body.appendChild(mainContainer);

    const footerContainer = document.createElement("footer");
    footerContainer.id = "footer-container";
    document.body.appendChild(footerContainer);  

    const selectDateSection = document.createElement("section");
    selectDateSection.id = "select-date-section";
    mainContainer.appendChild(selectDateSection);  

    const navSection = document.createElement("section");
    navSection.id = "nav-section";
    mainContainer.appendChild(navSection);

    const prevMonthBtn = document.createElement("button");
    prevMonthBtn.id = "prev-month";
    navSection.appendChild(prevMonthBtn);
    prevMonthBtn.innerText = "Previous month";
    prevMonthBtn.addEventListener("click", () => changeMonth(-1));

    const currentDate = document.createElement("div");
    currentDate.id = "current-date";
    navSection.appendChild(currentDate); 

    const nextMonthBtn = document.createElement("button");
    nextMonthBtn.id = "next-month";
    navSection.appendChild(nextMonthBtn);
    nextMonthBtn.innerText = "Next month";
    nextMonthBtn.addEventListener("click", () => changeMonth(1));           

    const monthLabel = document.createElement('label');
    monthLabel.innerText = 'Month:';
   
    const monthsCreateSelect = document.createElement("select");
    monthsCreateSelect.id = "months-select"; 
    selectDateSection.appendChild(monthLabel);
    selectDateSection.appendChild(monthsCreateSelect);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    months.forEach((month, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = month;
        monthsCreateSelect.appendChild(option);
    });

    const yearLabel = document.createElement("label");
    yearLabel.innerText = "Year:";
    const yearInput = document.createElement("input");
    yearInput.id = "year-input";
    yearInput.type = "number";
    yearInput.placeholder = "Enter a year";
    selectDateSection.appendChild(yearLabel);
    selectDateSection.appendChild(yearInput);

    const submitBtn = document.createElement('button');
    submitBtn.id = 'submit-btn';
    submitBtn.innerText = 'Submit';
    selectDateSection.appendChild(submitBtn);

    submitBtn.addEventListener("click", () => {
        const selectedMonth = parseInt(monthsCreateSelect.value);
        const selectedYear = parseInt(yearInput.value);

        if (!isNaN(selectedMonth) && !isNaN(selectedYear)) {
            setDate(selectedMonth, selectedYear);
        } else {
            alert("Please enter a valid month and year.");
        }
    });

    const calendarContainer = document.createElement("section");
    calendarContainer.id = "calendar-container";
    mainContainer.appendChild(calendarContainer);

    const commemDayDetailsSection = document.createElement("section");
    commemDayDetailsSection.id = "commem-day-details-section";    
    mainContainer.appendChild(commemDayDetailsSection);
    const commemDayDetailsContainer = document.getElementById("commem-day-details-section");

    const titleCommemDayDetailsSection = document.createElement("h2");
    titleCommemDayDetailsSection.id = "title-commem-day-details";
    titleCommemDayDetailsSection.innerText = "Ada Lovelace Day";
    commemDayDetailsSection.appendChild(titleCommemDayDetailsSection);

    const linkCommemDayDetails = document.createElement("a");
    linkCommemDayDetails.id = "link-commem-day-details";
    linkCommemDayDetails.href = "https://codeyourfuture.github.io/The-Piscine/days/vultures.txt";
    linkCommemDayDetails.target = "_blank";
    linkCommemDayDetails.innerText = "More details";
    commemDayDetailsSection.appendChild(linkCommemDayDetails);
}
