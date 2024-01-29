import Book from "./book.js";
import User from "./user.js";
import Loan from "./loans.js";

export default class Page{
    constructor(){
        this._strategy = null;
        this._name = null;
    }

    set currentState(state){
        this._strategy = state;
        this._name = state._name;
    }

    createNewLeftContent(){
        this._strategy.createNewLeftContent();
    }

    createNewRightContent() {
        this._strategy.createNewRightContent();
    }

    updateButtons() {
        this._strategy.updateButtons();
    }

    storage(stateName) {
        const storage = {
            'book' : Book,
            'user' : User,
            'loan' : Loan
        }
        return storage[stateName] ? storage[stateName] : null;
    }

    getUser() {
        return this._strategy.getId();
    }

    setEmptyUser() {
        this._strategy.createEmptyUser();
    }

    updateRightPanel() {
        this._strategy.updateRightPanel();
    }

    isExist() {
        return this._strategy.isExist();
    }

    refreshUserInformation(isSave) {
        const collected = this._strategy.collectUserInformation();
        if (collected) {
            if (isSave) {
                this._strategy.updateUserInformation();
            } else {
                this._strategy.createUser();
            }
        }
    }

    createUser() {
        this._strategy.createUser();
    }

    deleteUser() {
        this._strategy.deleteUser();
    }

    createLoan() {
        this._strategy.deleteUser();
    }

    closeLoan() {
        this._strategy.deleteUser();
    }

    get currentState(){
        return this._name;
    }
    
}