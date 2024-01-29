export default class User{
    constructor(lC, mC, storage, buttons){
        this._name = 'book';
        this.user = null;
        this.isUserExist = false;
        this.lC = lC;
        this.mC = mC;
        this.storage = storage.users;
        this.savingList = [];
        this.buttons = buttons;
        this.lastId = 5;
    }

    createNewLeftContent(){
        this.lC.innerHTML = '';
        this.storage.forEach ((el) => {
            this.lC.appendChild(this._createUserCart(el));
        })
    }

    createNewRightContent() {
        this.updateRightPanel();
    }

    _createUserCart(el) {
        const div = document.createElement("div");
        div.classList.add("bookCart");
        div.setAttribute("id", el.id);
        div.innerHTML = `
            <div class="userImg">
            <img src="${el.isBefore ? "./images/users/"+ el.search : el.search}" alt="">
            </div>
            <p class="userName">${el.name}</p>
            <p class="userPhone">+7${el.phone}</p>
            <div class="userValidity ${el.validity ? "" : "userInvalid"}" disabled>${el.validity ? 'Valid' : "Invalid"}</div>
        `

        div.addEventListener(('click'), (e) => {
            e.preventDefault();
            this.user = {...el};
            this.isUserExist = true;
            this.savingList = [];
            this.updateRightPanel();
            this._activateButtons();
        })
        return div;
    }

    updateRightPanel() {
        if (!this.user){
            this.createEmptyUser();
        }
        this._setRightInfoPanel();
    }

    updateButtons () {
        if (this.buttons.children.length !== 3) {
            this.buttons.innerHTML = `
            <button id="add" class="addB">
            <svg class="addB" width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17 15V18M17 21V18M17 18H14M17 18H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="addB">add</p>
        </button>
        <button id="save" class="saveB" disabled>
            <svg class="saveB" width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z" fill="#0F0F0F"/>
            </svg>
            <p class="saveB">save</p>
        </button>
        <button id="delete" class="deleteB" disabled>
            <svg class="deleteB" width="80%" height="80%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 11V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M4 7H20" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p class="deleteB">delete</p>
        </button>
            `;
        }
    }

    createEmptyUser () {
        this.savingList = [];
        this.isUserExist = false;
        this._disableButtons();
        this.user = {
            name : null,
            phone : null,
            validity: true,
            problems: [],
            totalLoans: 0, 
            inUse : 0,
            id : this.lastId,
            isBefore: false
        }
    }

    _setRightInfoPanel() {
        this.mC.innerHTML = '';
        this.mC.classList.remove('loansMain');
        const user = this.user;
        const createClosure = () => {
            const div = document.createElement("div");
            div.classList.add('closure');
            if (user.search) {
                const img = document.createElement('img');
                img.classList.add('search');
                img.setAttribute('id', 'search');
                img.classList.add('circle');
                img.src = user.isBefore ? `./images/users/${user.search}` : `${user.search}`;
                div.appendChild(img);
            } else {
                div.innerHTML = `
                                    <div class="search circle">
                                        <svg width="30%" height="30%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>`;
            }
            div.addEventListener("click", (e) => {
                e.preventDefault();
                user.isBefore = false;
                user.search = prompt("Enter new path");
                const children = e.currentTarget.children;
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
                    img.setAttribute('id', 'search');
                    img.src = `${user.search}`;
                    e.currentTarget.appendChild(img);
                } else {
                    children[0].src = `${user.search}`;
                }
            });
            this.savingList.push("search");
            return div
        }

        const createCaption1 = () => {
            const div = document.createElement("div");
            div.classList.add('caption1');
            div.classList.add('userCaption1');
            div.innerHTML = `<input type="text" class="miniLabel1" id="name" placeholder="Enter name" value = "${user.name ? user.name : ''}">
                            <label for="phone" class="labelFamily">phone:</label>
                            <input type="number" class="miniLabel1" id="phone" placeholder="Enter phone" value = "${user.phone ? user.phone : ''}">
                            <label for="email" class="labelFamily">email:</label>
                            <input type="text" class="miniLabel1" id="email" placeholder="Enter email" value = "${user.email ? user.email : ''}">`
            this.savingList.push("name");
            this.savingList.push("phone");
            this.savingList.push("email");
            return div;
        }

        const createCaption2 = () => {
            const div = document.createElement('div');
            div.classList.add("caption2");
            div.classList.add("userCaption1");
            div.innerHTML = `
                    <div class="userContent" id="">Total books reserved:<br><input type="number" readonly id="totalLoans" class="reserved" value="${user.totalLoans}"></div>
                    <div class="userContent" id="">Total books in use:<br><input type="number" readonly id="inUse" max = "6" class="inUse" value="${user.inUse}"></div>
                    <div class="miniText miniTextUser">
                        <p>Total reserved = in Use + reserved in Past</p><br>   
                        <p>More than 3 problems, raises concerns about user’s validity</p><br>
                    </div>  
                    `
            return div;
        }

        const createCaption3 = () => {
            const div = document.createElement('div');
            div.classList.add("caption3");
            const getProblems = () => {
                let str = '';
                for (let i = 0; i < user.problems.length; i++) {
                    str += user.problems[i];
                    str += i != user.problems.length - 1 ? ', ' : '';
                }
                return str;
            }
            div.innerHTML = `
                    <div class="validity ${user.validity ? "" : "userInvalidate"}">${user.validity ? 'Valid' : "Invalid"}</div>
                    <p>Problems:</p>
                    <textarea class = 'comments usered' id="problems">${getProblems()}</textarea>
            `
            this.savingList.push("problems");
            return div;
        }

        const div = document.createElement("div");
        div.classList.add("topCart");
        div.appendChild(createClosure());
        div.appendChild(createCaption1());
        const div2 = document.createElement("div");
        div2.classList.add("middleCart");
        const div3 = document.createElement("div");
        div3.classList.add("bottomCart");
        div3.appendChild(createCaption2());
        div3.appendChild(createCaption3());
        this.mC.appendChild(div);
        this.mC.appendChild(div2);
        this.mC.appendChild(div3);
    }

    _activateButtons() {
        if (this.buttons.children) {
            for (let i = 0; i < this.buttons.children.length; i++) {
                const child = this.buttons.children[i];
                if (child.classList.contains('saveB')){
                    child.removeAttribute('disabled');
                }else if (child.classList.contains('deleteB')){
                    child.removeAttribute('disabled');
                }
            }
        }
    }

    _disableButtons() {
        if (this.buttons.children) {
            for (let i = 0; i < this.buttons.children.length; i++) {
                const child = this.buttons.children[i];
                if (child.classList.contains('saveB')){
                    child.setAttribute('disabled', true);
                }else if (child.classList.contains('deleteB')){
                    child.setAttribute('disabled', true);
                }
            }
        }
    }

    getUser() {
        return this.user;
    }

    isExist() {
        return this.isUserExist;
    }

    collectUserInformation() {
        const createProblems = (str) => {
            return str ? str.split(', ') : [];
        }
        for (let i = 0; i < this.savingList.length; i++) {
            let el = document.getElementById(`${this.savingList[i]}`);
            const text = el.value ? el.value : el.src;
            if (this.savingList[i] !== 'problems' && !text) {
                alert(`${this.savingList[i]} field has no text`);
                return false;
            }
            
            this.user[this.savingList[i]] = (this.savingList[i] !== 'problems') ? text : createProblems(text);
        }
        return true;
    }

    updateUserInformation() {
        this.user.isBefore = false;
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].id === this.user.id) {
                this.storage[i] = {...this.user};
                break;
            }
        }
        this.createNewLeftContent();
    }

    createUser() {
        this.storage.push(this.user);
        this.isUserExist = true;
        this.lastId++;
        alert(`${this.user.name} created`);
        this.createNewLeftContent();
        this._activateButtons();
    }

    deleteUser() {
        for (let i = 0; i < this.storage.length; i++) {
            if (this.storage[i].id === this.user.id) {
                this.storage.splice(i, 1);
                break;
            }
        }
        this.createNewLeftContent();
        this.createEmptyUser();
        this.updateRightPanel();
    }
}