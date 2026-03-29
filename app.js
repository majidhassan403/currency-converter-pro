const BASE_URL = "https://open.er-api.com/v6/latest";

const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const btn = document.getElementById("btn");
const msg = document.querySelector(".msg");
const amountInput = document.getElementById("amount");

// Fill Dropdowns
for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    
    if (currCode === "USD") {
        newOption.selected = "selected";
    } else if (currCode === "PKR") {
        let toOption = newOption.cloneNode(true);
        toOption.selected = "selected";
        toSelect.append(toOption);
    }

    fromSelect.append(newOption);
    if (currCode !== "PKR") {
        toSelect.append(newOption.cloneNode(true));
    }
}

// Update Flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Fetch Exchange Rate
const updateExchangeRate = async () => {
    let amtVal = amountInput.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amountInput.value = "1";
    }

    msg.innerText = "Fetching exchange rate...";
    const URL = `${BASE_URL}/${fromSelect.value}`;

    try {
        let response = await fetch(URL);
        let data = await response.json();
        let rate = data.rates[toSelect.value];
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromSelect.value} = ${finalAmount} ${toSelect.value}`;
    } catch (error) {
        msg.innerText = "Error fetching data!";
        console.log(error);
    }
};

// Event Listeners
fromSelect.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});

toSelect.addEventListener("change", (evt) => {
    updateFlag(evt.target);
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
