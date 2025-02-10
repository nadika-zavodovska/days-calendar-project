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
}