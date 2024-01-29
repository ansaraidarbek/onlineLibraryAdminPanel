const leftContent = document.querySelector(".left-content");
const mainCart = document.querySelector(".mainCart");
const cartSettings = document.querySelector(".cartSettings");
const buttons = document.querySelector('.pages');
let currentButton = 0;
import Page from "./pages.js";
import getStorage from "./storage.js";
let state = "book"
const storage = getStorage();
const states = new Page();

cartSettings.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('saveB')){
        states.refreshUserInformation(true);
    }else if (e.target.classList.contains('addB') || e.target.classList.contains('createLoan')){
        if (states.isExist()) {
            states.setEmptyUser();
            states.updateRightPanel();
            return;
        }
        states.refreshUserInformation(false);
    }else if (e.target.classList.contains('deleteB') || e.target.classList.contains('closeLoan')){
        states.deleteUser();
    }
})


const activateState = () => {
    const obtainedState = states.storage(state);
    states.currentState = new obtainedState(leftContent, mainCart, storage, cartSettings);
    if (states.currentState) {
        states.createNewLeftContent();
        states.updateButtons();
        states.createNewRightContent();
    }
}

buttons.addEventListener('click', (e) => {
    e.preventDefault();
    const toogleButton = (num) => {
        buttons.children[currentButton].classList.remove('active');
        currentButton = num;
        buttons.children[currentButton].classList.add('active');
    }
    if (e.target.classList.contains('bookPage')){
        if (currentButton != 0) {
            toogleButton(0);
            state = 'book';
            activateState();
        }
    }else if (e.target.classList.contains('userPage')){
        if (currentButton != 1) {
            toogleButton(1);
            state = 'user';
            activateState();
        }
    }else if (e.target.classList.contains('loansPage')){
        if (currentButton != 2) {
            toogleButton(2);
            state = 'loan';
            activateState();
        }
    }
})

activateState();