export function generateUiMainContainer() {
    const headerContainer = document.createElement('header');
    headerContainer.id = "header-container";
    document.body.appendChild(headerContainer);

    const mainContainer = document.createElement("main");
    mainContainer.id = "main-container";
    document.body.appendChild(mainContainer);

    const footerContainer = document.createElement("footer");
    footerContainer.id = "footer-container";
    document.body.appendChild(footerContainer);    

    const backNextBtnSection = document.createElement("section");
    backNextBtnSection.id = "back-next-btn-section";
    mainContainer.appendChild(backNextBtnSection);

    const prevMonthBtn = document.createElement("button");
    prevMonthBtn.id = "prev-month";
    backNextBtnSection.appendChild(prevMonthBtn);
    prevMonthBtn.innerText = "Back";

    const nextMonthBtn = document.createElement("button");
    nextMonthBtn.id = "next-month";
    backNextBtnSection.appendChild(nextMonthBtn);
    nextMonthBtn.innerText = "Next";

    const currentDate = document.createElement("section");
    currentDate.id = "current-date";
    mainContainer.appendChild(currentDate);
    currentDate.innerText = "10 February 2025"; 
}