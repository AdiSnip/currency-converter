let value = document.querySelector(".value")
let fromimg = document.querySelector('#from-flag')
let toimg = document.querySelector('#to-flag')
let selects = document.querySelectorAll(".select-currency-name")
let inpcur = document.querySelector('.inpcur')
let outcur = document.querySelector('.outcur')
let output = document.querySelector('.output')
let exchange = document.querySelector('.exchange')
let imageurl = "https://flagsapi.com/US/flat/64.png"


for (const select of selects) {
        for (let code in countryList) {
                let country = code
                let option = document.createElement("option");
                option.value = code;
                option.textContent = country;
                select.appendChild(option)
                if(select.name==="from" && code === "USD"){
                        option.selected = "selected"
                }else if (select.name === "to" && code ==="INR") {
                        option.selected = "selected"
                }
        } 
}

inpcur.addEventListener("change",()=>{
        for(code in countryList){
                if(code === inpcur.value){
                        fromimg.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`
                        
                }
        }
        getout()
})
outcur.addEventListener("change",()=>{
        for(code in countryList){
                if(code === outcur.value){
                        toimg.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`
                        
                }
        }
        getout()
})
async function getout(){
        let incr = inpcur.value.toLowerCase() // incr = usd
        let oucr = outcur.value.toLowerCase() //oucr = inr
        let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${incr}.json` //link only take one currency and give object of other currencies with value
        let response = await fetch(URL)
        let data = await response.json()
        
        if (data[incr] && data[incr][oucr]) {
                let convertedValue = data[incr][oucr]; // Get the conversion rate
                output.textContent = convertedValue*value.value
                
        }
        
}
//output the value ***********
value.addEventListener("input", getout);
//exchange button function
exchange.addEventListener("click",()=>{
        let a = inpcur.value
        inpcur.value = outcur.value
        outcur.value = a
        for(code in countryList){
                if(code === inpcur.value){
                        fromimg.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`
                        
                }
        }
        for(code in countryList){
                if(code === outcur.value){
                        toimg.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`
                        
                }
        }
        getout()
})