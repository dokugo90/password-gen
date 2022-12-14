const submit = document.querySelector("#generate")
const password = document.querySelector("#password")
const strength = document.querySelector(".strength")
const setSymbol = document.querySelector("#symbol")
const setNumbers = document.querySelector("#numbers")
const labelOne = document.querySelector("label[for='symbol']")
const labelTwo = document.querySelector("label[for='numbers']")
const rangeVal = document.querySelector(".rangeVal")
const slider = document.querySelector(".lengthSet")
let body = document.body;

const randomNum = [
    {
        symbol: ["@", "$", "!", "#", "%", "_", "-", ".", "*", '~', "/", ";", ":"],
        word: ["Peanut", "radian", "goldfield", "hidrosis", "decongested", "underglazes","strobile","corseted", "daredevil", "walkyries", "waggishness","abridged", "basketball","basketballs","basketful","basketfuls","basketlike","basketries","basketry","baskets","basketsful","basketwork","basketworks","basking","basks","basmati","basmatis","basophil","basophile", "classiest","classifiable","classification","classifications","classificatory","classified","classifier","classifiers","classifies","classify","classifying","classily","classiness", "pushy", "brawls", "obtusely", "mummied", "ambitions", "pippins", "mystagogs"],
        digits: [4895,8639,1987,9056,322,2371,7867,3890,2501,308,3633,8748,5849,6321,9589,4399,3442,791,4863,1806,277,9059,9744,282,8679,2106,5400,4295,2193,8809, 6033,5577,6515,6757,8579,2785,1301,6347,5689,3494, 7462,897,4255,9635,2023,9681,644,3450,2897,9242, 2129,3657,3142,4422,8658,968,3506,5303,8985,4869, 9321, 5455, 0102, 4321, 1010, 1111, 1010, 9214, 3952, 6868, 993, 1929, 3934, 9591, 4312, 0912, 8432, 1039, 9999, 1230, 8492, 1212, 8302, 8520, 9090, 8312, 8392, 6574, 9853, 0852, 8543, 8439, 7532, 0022, 1199, 8833, 0011, 0431, 0521, 3322, 2322, 9111, 0120, 2141, 5115, 3410, 5944, 0601, 5195, 0632, 3232, 5995, 9595],
    }
]

let passDigit = '';
let passWord = '';
let passSymbol = '';
let newPass = '';

/*function pass(e) {
    let randObj = randomNum[Math.floor(Math.random() * randomNum.length)]
   let randDig = randObj.digits;
   let randWord = randObj.word;
   let randSymbol = randObj.symbol;
   let randOfDig = randDig[Math.floor(Math.random() * randDig.length)]
   let randOfWord = randWord[Math.floor(Math.random() * randWord.length)]
   let randOfSymbol = randSymbol[Math.floor(Math.random() * randSymbol.length)]
   passDigit = randOfDig;
   passWord = randOfWord;
   passSymbol = randOfSymbol;
   if (setSymbol.checked == true && setNumbers.checked == true) {
    password.value = passWord + passSymbol + passDigit;
   } else if (setSymbol.checked == false) {
    password.value = passWord + '' + passDigit;
   } else if (setNumbers.checked == false) {
    password.value = passWord + passSymbol;
   } if (setNumbers.checked == false && setSymbol.checked == false) {
    password.value = passWord;
   }
   newPass = password.value;
   
   strengthBar()
}*/

function wordLen() {
    rangeVal.textContent = `Length: ${slider.value}`;
}

async function pass() {
    try {
        const req = await fetch(`https://api.api-ninjas.com/v1/passwordgenerator?length=${slider.value}&exclude_numbers=${!setNumbers.checked}&exclude_special_chars=${!setSymbol.checked}`, {
        method: "GET",
        headers: {"X-Api-Key": "2ookX64Ufmg3uldWzllYHQ==NOY8DhrYJelVCsxE"},
        contentType: 'application/json',
      })
      const res = await req.json()
      console.log(res.random_password)
      password.value = res.random_password;
      localStorage.setItem("user", res.random_password)
      strengthBar()
    } catch(err) {
        alert("Failed to fetch data")
    }
}

let click = false;
submit.onclick = () => (click = true)

password.addEventListener("input", strengthBar)

submit.addEventListener("click", () => {
    pass()
    if (click) {
        submit.style.rotate = '-360deg'
        submit.onclick = () => (click = false)
    } if (!click) {
        submit.style.rotate = '0deg'           
        submit.onclick = () => (click = true)
    }
})

slider.addEventListener("mousemove", () => {
    wordLen()
})

window.addEventListener("load", () => {
    let get = localStorage.getItem("user")
    password.value = get;
    strengthBar()
});

function strengthBar() {
    if (password.value.length >= 14 && password.value.match(/[!@#$%^&*~`/()_+\-=\[\]{};':"\\|,.<>\/?]+/) 
    && password.value.match(/[0-9]/)
    && password.value.match(/[a-zA-Z]/)) {
        strength.style.width = '504px'
        strength.style.backgroundColor = 'green'
        labelOne.style.color = 'green'
        labelTwo.style.color = 'green'
    } else if (password.value.length >= 10 ) {
        strength.style.width = '350px'
        strength.style.backgroundColor = 'yellow'
        labelOne.style.color = 'yellow'
        labelTwo.style.color = 'yellow'
    } else if (password.value.length < 10 && password.value.length >= 6) {
        strength.style.width = '220px'
        strength.style.backgroundColor = 'orange'
        labelTwo.style.color = 'orange'
        labelOne.style.color = 'orange'
    } else if (password.value.length < 6 && password.value.length >= 1) {
        strength.style.width = '100px'
        strength.style.backgroundColor = 'red'
        labelTwo.style.color = 'red'
        labelOne.style.color = 'red'
    } else if (password.value.length == 0) {
        strength.style.width = '0px'
        strength.style.backgroundColor = 'transparent'
    }
}

/*function handleKeyboard(e) {
    if (e.key === 'Space') e.key.disabled = true;
}

let click = false;
submit.onclick = () => (click = true)

document.addEventListener("keydown", handleKeyboard)
setSymbol.addEventListener("click", pass)
setNumbers.addEventListener("click", pass)
password.addEventListener("input", strengthBar)
submit.addEventListener("click", () => {
    pass()
    if (click) {
        submit.style.rotate = '-360deg'
        submit.onclick = () => (click = false)
    } if (!click) {
        submit.style.rotate = '0deg'           
        submit.onclick = () => (click = true)
    }
})
window.addEventListener("load", () => {
    pass()
})*/