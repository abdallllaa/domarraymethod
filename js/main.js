const main = document.getElementById('main');
const addUserBtn  = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn  = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
let data = [];

// Fetch Randome user and add Money
async function getRandomUSer() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];
    const newUser = {
        name : `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() *1000000)
    };
    addData(newUser);
}

// Double everone money
function doublemoney() {
    data = data.map((user) =>{
        return {...user,money: user.money * 2 };
    });
    updateDOM();
}

// Sort Users By Riches 
function sortByRichest (){
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

//Filter only millionaires 
function showMillionaires(){
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

// Calculate The Total money wealth 
function calculateWealth(){
    const wealth = data.reduce((acc,user) => (acc +=user.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth : <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthEl);
}
// Add New Obj to Data Array
function addData(obj){
    data.push(obj);
    updateDOM();
}

// update DOM 
function updateDOM(provideDate = data){
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

  provideDate.forEach(item=> {
       const element = document.createElement('div');
       element.classList.add('person');
       element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
       main.appendChild(element);
  });
}

// format number as money 
function formatMoney(number) {
   return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}


// Event Listeners 
addUserBtn.addEventListener('click',getRandomUSer);

doubleBtn.addEventListener('click',doublemoney);


sortBtn.addEventListener('click',sortByRichest);

showMillionairesBtn.addEventListener('click',showMillionaires);


calculateWealthBtn.addEventListener('click',calculateWealth);
















