const ConvertButton = document.querySelector("#convert-button");
const selectFrom = document.querySelector("#currency-from");
const selectTo = document.querySelector("#currency-to");

const rates = {
  real: 1,
  dolar: 5.2,
  euro: 6.2,
  libras: 7.59,
  bitcoin: 604056.07
};

const images = {
  real: "./assets/brasil.png",
  dolar: "./assets/dolar.png",
  euro: "./assets/euro.png",
  libras: "./assets/libra.png",
  bitcoin: "./assets/bitcoin.png"
};

const names = {
  real: "Real",
  dolar: "Dólar americano",
  euro: "Euro",
  libras: "Libras esterlinas",
  bitcoin: "Bitcoin"
};

function animateValue(element) {
  element.classList.remove("value-animate");
  void element.offsetWidth;
  element.classList.add("value-animate");
}

function formatCurrency(value, currency) {
  if (currency === "real") {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  }
  if (currency === "dolar") {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  }
  if (currency === "euro") {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
  }
  if (currency === "libras") {
    return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
  }
  if (currency === "bitcoin") {
    return value.toFixed(6) + " BTC";
  }
  return value;
}

function updateCurrencyImagesAndNames() {
  const currencyImageFrom = document.querySelector(".currency-img-from");
  const currencyImageTo = document.querySelector(".currency-img-to");
  const currencyNameFrom = document.getElementById("currency-name-from");
  const currencyNameTo = document.getElementById("currency-name-to");

  currencyImageFrom.src = images[selectFrom.value];
  currencyImageTo.src = images[selectTo.value];
  currencyNameFrom.innerHTML = names[selectFrom.value];
  currencyNameTo.innerHTML = names[selectTo.value];


  currencyImageFrom.style.width = "48px";
  currencyImageFrom.style.height = "48px";
  currencyImageFrom.style.objectFit = "contain";
  currencyImageTo.style.width = "48px";
  currencyImageTo.style.height = "48px";
  currencyImageTo.style.objectFit = "contain";
}

function convertValues() {
  const inputCurrencyValue = parseFloat(
    document.querySelector(".input-currency").value
  );

  if (isNaN(inputCurrencyValue)) {
    alert("Por favor, insira um número válido.");
    return;
  }

  const from = selectFrom.value;
  const to = selectTo.value;

  const valueInReal = inputCurrencyValue * rates[from];
  let convertedValue = valueInReal / rates[to];

  const currencyValueToConvert = document.querySelector(".currency-value-to-convert");
  const currencyValueConvert = document.querySelector(".currency-value");

  currencyValueToConvert.innerHTML = formatCurrency(inputCurrencyValue, from);
  currencyValueConvert.innerHTML = formatCurrency(convertedValue, to);

  animateValue(currencyValueConvert);
  animateValue(currencyValueToConvert);
}

function handleChange() {
  updateCurrencyImagesAndNames();
  convertValues();
}

selectFrom.addEventListener("change", handleChange);
selectTo.addEventListener("change", handleChange);
ConvertButton.addEventListener("click", convertValues);

updateCurrencyImagesAndNames();
