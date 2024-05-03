export default class Loan{
    constructor(lC, mC, storage, buttons){
        this._name = 'book';
        this.loan = null;
        this.isLoanExist = -1;
        this.lC = lC;
        this.mC = mC;
        this.storage = storage;
        this.savingList = [];
        this.buttons = buttons;
    }

    createNewLeftContent(){
        this.lC.innerHTML = '';
        this.storage.loans.forEach ((el) => {
            const loan = this.createLoansCart(el);
            if (loan) {
                this.lC.appendChild(loan);
            }
        })
    }

    createNewRightContent() {
        this.updateRightPanel();
    }

    _findBook = (id) => {
        const books = this.storage.books;
        for (let i = 0; i < books.length ; i++) {
            if (books[i].id === id) {
                return {...books[i]};
            }
        }
        return null;
    }

    _findUser = (id) => {
        const users = this.storage.users;
        for (let i = 0; i < users.length ; i++) {
            if (users[i].id === id) {
                return {...users[i]};
            }
        }
        return null;
    }

    _findInArchive = (bookId, arr) => {
        for (let i = 0; i < arr.length ; i++) {
            if (arr[i].bookId === bookId) {
                return true;
            }
        }
        return false;
    }

    _findLoans = (id) => {
        const loans = this.storage.loans;
        for (let i = 0; i < loans.length ; i++) {
            if (loans[i].userId === id) {
                
                return [{...loans[i]}, i];
            }
        }
        return [null, null];
    }

    createUserBookCart = (book, loan, userId, type) => {
        const div = document.createElement('div');
        div.classList.add('userBookCart');
        div.classList.add('userTrueBookCart');
        div.innerHTML = `
            <div class="userBookImg">
                <img src="${book.isBefore ? "./images/books/"+ book.search : book.search}" alt="">
            </div>
            <p class = 'bookCart-title'>${book.title}</p>
            <p class = 'bookCart-author'>By ${book.author} </p>
        `
        div.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.loan = {
                userId: userId,
                ...loan
            }
            this.isLoanExist = type === 'inUse' ? 0 : 1;
            this.updateRightPanel();
            this._disableButtons();
            this._activateButtons();
        })
        return div;
    }

    _getUserBookCarts (loan, type, index) {

        const createEmptyUserBookCart = () => {
            const div = document.createElement('div');
            div.classList.add('userBookCart');
            return div;
        }

        let carts = [];
        let added = 0;
        let i = 0;
        while (added != 5){
            if (i < loan[type].length) {
                const book = this._findBook(loan[type][i].bookId);
                if (book) {
                    added++;
                    carts.push(this.createUserBookCart(book, loan[type][i], loan.userId, type));
                }
            } else {
                added++;
                carts.push(createEmptyUserBookCart());
            }
            i++;
        }
        return carts;
    }

    _getUserHistoryPages (el) {
        const size = Math.ceil(el.history.length / 5);
        let str = ''
        for (let i = 1; i <= size; i++) {
            str += `<button class = 'history' data-id='${i}'>`;
            str += i;
            str += "</button>";
        }
        return str;
    }

    createLoansCart(el) {
        const div = document.createElement("div");
        div.classList.add("bookCartOuter");
        div.setAttribute("id", el.userId);

        const createBookCart = (user) => {
            const div = document.createElement('div');
            div.classList.add('bookCart');
            div.classList.add('loanCart');
            div.innerHTML = `
                            <div class="userImg">
                            <img src="${user.isBefore ? "./images/users/"+ user.search : user.search}" alt="">
                            </div>
                            <p class="userName">${user.name}</p>
                            <p class="userPhone">+7${user.phone}</p>
                            <div class="userValidity ${user.validity ? "" : "userInvalid"}" disabled>${user.validity ? 'Valid' : "Invalid"}</div>
            `
            return div;
        }

        const createBookCartLine = () => {
            const div = document.createElement("div");
            div.classList.add("bookCartLine");
            return div;
        }

        const removeActivePage = (el, paging) => {
            el.setAttribute('data-paging', paging);
            for (let i = 0; i < el.children.length; i++){
                el.children[i].classList.remove('activePage');
            }
        }

        const createBooksInLoan = () => {
            const div = document.createElement("div");
            div.classList.add("booksInLoan");
            const loans = document.createElement('div');
            loans.classList.add('loans');
            loans.innerHTML = '';
            const carts = this._getUserBookCarts(el, 'inUse', 0);
            carts.forEach(el =>  loans.appendChild(el));
            div.appendChild(loans);
            const paging = document.createElement("div");
            paging.classList.add('paging');
            paging.setAttribute('data-paging','inUse');
            paging.innerHTML = `
                <button class = 'activePage inUse'>inLoan</button>
                <p>History:</p>
                ${this._getUserHistoryPages(el)}
            `
            paging.addEventListener('click', (e) => {
                e.preventDefault();
                if (e.target.classList.contains('inUse') || e.target.classList.contains('history')) {
                    e.stopPropagation();
                    const message = e.target.classList.contains('history') ? 'history' : 'inUse';
                    const messageId = e.target.dataset.id;
                    const parrent = e.target.parentNode;
                    const currentPagging = parrent.dataset.paging;
                    if (currentPagging && (currentPagging !== message && currentPagging !== '' + messageId)) {
                        const newPaging = messageId ? ''+ messageId : 'inUse';
                        removeActivePage(e.target.parentNode, newPaging);
                        e.target.classList.add('activePage');
                        const index = messageId ? (+messageId - 1) * 5 : 0;
                        loans.innerHTML = '';
                        const carts = this._getUserBookCarts(el, message, index)
                        carts.forEach(el =>  loans.appendChild(el));
                    }
                }
            });
            div.appendChild(paging)
            return div
        }

        const user = this._findUser(el.userId);
        if (user) {
            div.appendChild(createBookCart(user))
            div.appendChild(createBookCartLine());
            div.appendChild(createBooksInLoan());
            div.addEventListener('click', (e) => {
                e.preventDefault();
                this.loan = {
                    userId: user.id,
                    bookId: null,
                    startDate: null,
                    endDate: null
                }
                this.isLoanExist = -1;
                this.updateRightPanel();
                this._disableButtons();
                this._activateButtons();
            });
            return div;
        }
    }

    updateRightPanel() {
        if (!this.loan){
            this.createEmptyUser();
        }
        this._setRightInfoPanel();
    }

    updateButtons () {
        if (this.buttons.children.length !== 2) {
            this.buttons.innerHTML = `
            <button class='createLoan'>
            <svg class='createLoan' width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <p class='createLoan'>createLoan</p>
        </button>
        <button  class='closeLoan'>
            <svg class='closeLoan' width="80%" height="80%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="none" stroke="#000000" stroke-width="2" d="M9,4 L4,9 L9,14 M18,19 L18,9 L5,9" transform="matrix(1 0 0 -1 0 23)"/>
            </svg>
            <p class='closeLoan'>closeLoan</p>
        </button>
            `;
        }
    }

    createEmptyUser () {
        this.savingList = [];
        this.isLoanExist = -1;
        this._disableButtons();
        this.loan = {
            userId: null,
            bookId: null,
            startDate: null, 
            endDate: null
        }
    }

    _setRightInfoPanel() {
        this.mC.innerHTML = '';
        this.mC.classList.add('loansMain');
        const loan = this.loan;
        const user = this._findUser(loan.userId);
        const book = this._findBook(loan.bookId);
        let todayDate = (loan.startDate) ? loan.startDate : new Date().toISOString().slice(0, 10);

        const createTopCart = () => {
            const div = document.createElement('div');
            div.classList.add('zeroTopCart');
            div.innerHTML = `
                    <div class="dates">
                        <label for="startDate">Start:</label>
                        <input type="date" disabled id="startDate" value=${todayDate} name="startDate">
                    </div>
                    <div class="lineH">
                        <i class="arrow rightA"></i>
                    </div>
                    <div class="dates">
                        <label for="endDate">End:</label>
                        <input type="date" disabled id="endDate" value=${loan.endDate} name="endDate">
                    </div>
                `
            this.savingList.push('startDate');
            this.savingList.push('endDate');
            return div;

        }

        const createClosure = (obj, name) => {
            const div = document.createElement('div');
            div.classList.add('closure');
            if (obj) {
                const img = document.createElement('img');
                img.classList.add('search');
                img.classList.add(`${name === 'user' ? 'circle' : false}`);
                img.setAttribute('id', 'search');
                img.src = obj.isBefore ? `./images/${name}s/${obj.search}` : `${obj.search}`;
                div.appendChild(img);
            } else {
                div.innerHTML = `
                    <div class="search ${name === 'user' ? 'circle' : ''}" id = 'search'>
                        <svg width="30%" height="30%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>`;
            }
            return div;
            
        }

        const selectOptions = (obj, isUser, user) => {
            let str = '';
            this.storage[obj].forEach(el => {
                str += `<option value="${el.id}{|}${el.isBefore}{|}${el.search}" ${user && user.id === el.id ? 'selected' : null}>${isUser ? el.name : el.title}</option>`
            });
            return str;
        }

        const changeImage = (closure, isBefore, search, msg) => {
            const children = closure.children;

            let i = 0;
            /*Remove elements which are not IMG*/
            while (children.length) {
                if (children[i].tagName !== "IMG") {
                    children[i].remove();
                    continue;
                }
                if (children[i].tagName === "IMG") {
                    break;
                }
                i++;
            }
            //Create new img or find old one;
            if (!children.length) {
                const img = document.createElement('img');
                img.classList.add('search');
                img.classList.add(`${msg === 'book' ? false : 'circle'}`);
                img.setAttribute('id', 'search');
                img.src = isBefore ? `./images/${msg}s/${search}` : `${search}`;
                closure.appendChild(img);
            } else {
                children[0].src = isBefore ? `./images/${msg}s/${search}` : `${search}`;
            }
        }

        const createCaption1 = (user, neighbour) => {
            const div = document.createElement('div');
            div.classList.add('caption1');
            div.classList.add('loanCaption1');
            const userSelection = document.createElement('div');
            userSelection.classList.add('userSelection');
            userSelection.innerHTML =  `<label for="userId">Choose a user:</label>`;
            const select = document.createElement('select');
            select.classList.add('loanLabel1');
            select.setAttribute('id', 'userId');
            select.innerHTML = `
                <option disabled value="-1{|}{|}" ${!user ? 'selected' : null} >select option</option>
                ${selectOptions('users', true, user)}
            `
            select.addEventListener('change', (e) => {
                e.preventDefault();
                const val = select.value.split('{|}');
                const isBefore = val[1] === 'true' ? true : false;
                const search = val[2];
                changeImage(neighbour, isBefore, search, 'user');
            })
            userSelection.appendChild(select);
            div.appendChild(userSelection);
            this.savingList.push('userId');
            return div;
        }

        const createCaption2 = (book, neighbour) => {
            const div = document.createElement('div');
            div.classList.add('caption2');
            div.classList.add('LoansCaption2');
            const titleSelection = document.createElement('div');
            titleSelection.classList.add('titleSelection');
            titleSelection.innerHTML =  `<label for="bookId">Choose a user:</label>`;
            const select2 = document.createElement('select');
            select2.classList.add('loanLabel1');
            select2.setAttribute('id', 'bookId');
            if (this.isLoanExist === -1) {
                select2.innerHTML = `
                <option disabled value="-1{|}{|}" selected >select option</option>
                ${selectOptions('books', false)}
            `
            } else {
                select2.innerHTML = `
                <option disabled value="${book.id}{|}${book.isBefore}{|}${book.search}" selected >${book.title}</option>`
            }   
            select2.addEventListener('change', (e) => {
                e.preventDefault();
                const val = select2.value.split('{|}');
                const isBefore = val[1] === 'true' ? true : false;
                const search = val[2];
                changeImage(neighbour, isBefore, search, 'book');
            })
            const miniText = document.createElement('dib');
            miniText.classList.add('miniText');
            miniText.classList.add('miniTextUser');
            miniText.innerHTML = `
                    <p>Max 5 books inUse</p><br>   
                    <p>Booking range 2 weeks</p><br>`
            titleSelection.appendChild(select2)
            div.appendChild(titleSelection)
            div.appendChild(miniText);
            this.savingList.push('bookId');
            return div;
        }
        const div2 = document.createElement('div');
        div2.classList.add('topCart');
        const closure = createClosure(user, 'user');
        div2.appendChild(closure);
        div2.appendChild(createCaption1(user, closure));
        const div3 = document.createElement('div');
        div3.classList.add('middleCart');
        const div4 = document.createElement('div');
        div4.classList.add('bottomCart');
        div4.classList.add('Loans');
        const closure2 = createClosure(book, 'book');
        div4.appendChild(createCaption2(book, closure2));
        div4.appendChild(closure2);
        this.mC.appendChild(createTopCart());
        this.mC.appendChild(div2);
        this.mC.appendChild(div3);
        this.mC.appendChild(div4);


        `
        <div class="zeroTopCart">
            <div class="dates">
                <label for="startDate">Start:</label>
                <input type="date" id="startDate" name="startDate">
            </div>
            <div class="lineH">
                <i class="arrow rightA"></i>
            </div>
            <div class="dates">
                <label for="startDate">End:</label>
                <input type="date" id="startDate" name="startDate">
            </div>
        </div>
    <div class="topCart">
        <div class="closure">
            <div class="search circle">
                <svg width="30%" height="30%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
        <div class="caption1 loanCaption1">

            <div class="userSelection">
                <label for="cars">Choose a user:</label>
                <select name="cars" class="loanLabel" id="cars" form="carform"></select>
            </div>
        </div>
    </div>
    <div class="middleCart"></div>
    <div class="bottomCart Loans">
        <div class="caption2 LoansCaption2">
            <div class="titleSelection">
                <label for="cars">Choose a user:</label>
                <select name="cars" class="loanLabel" id="cars" form="carform"></select>
            </div>

            <div class="miniText miniTextUser">

                <p>Max 5 books inUse</p><br>   
                <p>Booking range 2 weeks</p><br>
            </div>  
        </div>
        <div class="closure">
            <div class="search">
                <svg width="30%" height="30%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>
    </div>`
    }

    _activateButtons() {
        if (this.buttons.children) {
            for (let i = 0; i < this.buttons.children.length; i++) {
                const child = this.buttons.children[i];
                if (this.isLoanExist === 0 && child.classList.contains('closeLoan')){
                    child.removeAttribute('disabled');
                }
            }
        }
    }

    _disableButtons() {
        if (this.buttons.children) {
            for (let i = 0; i < this.buttons.children.length; i++) {
                const child = this.buttons.children[i];
                if (child.classList.contains('closeLoan')){
                    child.setAttribute('disabled', true);
                }
            }
        }
    }

    getUser() {
        return this.loan;
    }

    isExist() {
        return this.isLoanExist !== -1;
    }

    collectUserInformation() {
        const createProblems = (str) => {
            return str ? str.split(', ') : [];
        }

        const obtainText = (text) => {
            const str = text.split('{|}');
            return str.length > 1 ? +str[0] : str[0];
        }

        const isException = (text)=>{
            return text === 'problems' || text === 'endDate';
        }
        for (let i = 0; i < this.savingList.length; i++) {
            let el = document.getElementById(`${this.savingList[i]}`);
            const text = el.value ? el.value : el.src;
            if (!isException && !text) {
                alert(`${this.savingList[i]} field has no text`);
                return false;
            }
            
            this.loan[this.savingList[i]] = (this.savingList[i] !== 'problems') ? obtainText(text) : createProblems(text);
        }
        console.log(this.loan);
        return true;
    }

    updateUserInformation() {
        return ;
    }

    createUser() {
        let loan, index;
        [loan, index] = this._findLoans(this.loan.userId);
        const inUseObj = {bookId:this.loan.bookId, startDate: this.loan.startDate, endDate:this.loan.endDate };
        for (let i = 0; i < this.storage.users.length; i++) {
            if (this.storage.users[i].id === this.loan.userId) {
                if (this.storage.users[i].inUse === 6) {
                    alert('Too much books in use!!');
                    return;
                }
                this.storage.users[i].inUse++;
                this.storage.users[i].totalLoans++;
            }
        }

        for (let i = 0; i < this.storage.books.length; i++) {
            if (this.storage.books[i].id === this.loan.bookId) {
                if (this.storage.books[i].amount <= 0) {
                    alert ('This book is out of stock');
                    return;
                }
                this.storage.books[i].inUse++;
                this.storage.books[i].amount--;
                this.storage.books[i].totalLoans++;
            }
        }
        if (loan) {
            const history = this._findInArchive(this.loan.bookId, loan.history);
            const inUse = this._findInArchive(this.loan.bookId, loan.inUse);
            if (history) {
                alert("This user already read this book!!!");
                return;
            } else if (inUse) {
                alert("Sneaky, but this user already reading this book");
                return;
            }
            this.storage.loans[index].inUse.push(inUseObj);
        } 
        if (!loan) {
            this.storage.loans.push({
                userId: this.loan.userId,
                inUse: [inUseObj],
                history: []
            })
        }
        alert('book added!!');
        this.isLoanExist = 0;
        this.createNewLeftContent();
        this._disableButtons();
        this._activateButtons();
    }

    deleteUser() {
        let loan,index;
        [loan, index] = this._findLoans(this.loan.userId);
        if (loan) {
            let historyObj = null;
            for (let i = 0; i < loan.inUse.length; i++) {
                if (+this.loan.bookId === loan.inUse[i].bookId) {
                    historyObj = {...loan.inUse[i]};
                    this.storage.loans[index].inUse.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < this.storage.books.length; i++) {
                if (this.storage.books[i].id === this.loan.bookId) {
                    this.storage.books[i].inUse--;
                }
            }
            if (historyObj) {
                for (let i = 0; i < this.storage.users.length; i++) {
                    if (this.storage.users[i].id === this.loan.userId) {
                        this.storage.users[i].inUse--;
                        this.storage.books[i].amount++;
                    }
                }
                this.loan.endDate = new Date().toISOString().slice(0, 10);
                historyObj.endDate = this.loan.endDate;
                this.storage.loans[index].history.push(historyObj);
                alert('book removed to histories');
                this.createNewLeftContent();
                this.isLoanExist = 1;
                this._disableButtons();
                this.updateRightPanel();
            }
        }

        // this.createNewLeftContent();
        // this.createEmptyUser();
        // this.updateRightPanel();
    }
}