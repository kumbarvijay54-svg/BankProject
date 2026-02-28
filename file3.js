let currentUser = null;

function saveUsers(users) {
    localStorage.setItem("bankUsers", JSON.stringify(users));
}

function getUsers() {
    return JSON.parse(localStorage.getItem("bankUsers")) || [];
}

function register() {
    let name = document.getElementById("regName").value.trim();
    let pass = document.getElementById("regPass").value.trim();

    if(name === "" || pass === "") {
        alert("Fill all fields");
        return;
    }

    let users = getUsers();

    if(users.find(u => u.name === name)) {
        alert("User already exists");
        return;
    }

    users.push({
        name: name,
        pass: pass,
        balance: 0,
        transactions: []
    });

    saveUsers(users);
    alert("Account Created Successfully");
    showLogin();
}

function login() {
    let name = document.getElementById("loginName").value.trim();
    let pass = document.getElementById("loginPass").value.trim();

    let users = getUsers();
    let user = users.find(u => u.name === name && u.pass === pass);

    if(!user) {
        alert("Invalid Credentials");
        return;
    }

    currentUser = user;
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    updateDashboard();
}

function updateDashboard() {
    document.getElementById("balance").innerText = currentUser.balance;
    let list = document.getElementById("transactions");
    list.innerHTML = "";

    currentUser.transactions.forEach(t => {
        list.innerHTML += `<div class="transaction">${t}</div>`;
    });
}

function deposit() {
    let amt = parseFloat(document.getElementById("amount").value);

    if(isNaN(amt) || amt <= 0) {
        alert("Enter valid amount");
        return;
    }

    currentUser.balance += amt;
    currentUser.transactions.push("Deposited ₹" + amt);

    updateUserData();
}

function withdraw() {
    let amt = parseFloat(document.getElementById("amount").value);

    if(isNaN(amt) || amt <= 0) {
        alert("Enter valid amount");
        return;
    }

    if(amt > currentUser.balance) {
        alert("Insufficient Balance");
        return;
    }

    currentUser.balance -= amt;
    currentUser.transactions.push("Withdrew ₹" + amt);

    updateUserData();
}

function updateUserData() {
    let users = getUsers();
    let index = users.findIndex(u => u.name === currentUser.name);
    users[index] = currentUser;
    saveUsers(users);
    updateDashboard();
    document.getElementById("amount").value = "";
}

function logout() {
    currentUser = null;
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerSection").classList.add("hidden");
    document.getElementById("loginSection").classList.remove("hidden");
}

function showRegister() {
    document.getElementById("loginSection").classList.add("hidden");
    document.getElementById("registerSection").classList.remove("hidden");
}
