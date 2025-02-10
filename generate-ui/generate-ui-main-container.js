import { changeMonth } from "../web.mjs"

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

    const navSection = document.createElement("section");
    navSection.id = "nav-section";
    mainContainer.appendChild(navSection);

    const prevMonthBtn = document.createElement("button");
    prevMonthBtn.id = "prev-month";
    navSection.appendChild(prevMonthBtn);
    prevMonthBtn.innerText = "Back";
    prevMonthBtn.addEventListener("click", () => changeMonth(-1));

    const nextMonthBtn = document.createElement("button");
    nextMonthBtn.id = "next-month";
    navSection.appendChild(nextMonthBtn);
    nextMonthBtn.innerText = "Next";
    nextMonthBtn.addEventListener("click", () => changeMonth(1));

    const currentDate = document.createElement("div");
    currentDate.id = "current-date";
    navSection.appendChild(currentDate);
    // currentDate.innerText = "10 February 2025";  
    
    const selectDateSection = document.createElement("section");
    selectDateSection.id = "select-date-section";
    mainContainer.appendChild(selectDateSection);

    const monthLabel = document.createElement('label');
    monthLabel.innerText = 'Month:';
   
    const monthsCreateSelect = document.createElement("select");
    monthsCreateSelect.id = "months-select"; 
    selectDateSection.appendChild(monthLabel);
    selectDateSection.appendChild(monthsCreateSelect);

    const monthSelect = document.getElementById("months-select");
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    months.forEach((month, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = month;
        monthSelect.appendChild(option);
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

    const calendarContainer = document.createElement("section");
    calendarContainer.id = "calendar-container";
    mainContainer.appendChild(calendarContainer);
}
