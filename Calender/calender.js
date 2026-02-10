const monthnameE1=document.getElementById("month-name")
const daynameE1=document.getElementById("day-name")
const daynumE1=document.getElementById("day-number")
const yearE1=document.getElementById("year")

const date=new Date();
// window.alert(date)
// console.log(date.getFullYear());  
const month=date.getMonth()
monthnameE1.innerText=date.toLocaleDateString("en",{month:"long"})
daynameE1.innerText=date.toLocaleTimeString("en",{weekday:"long"})
 
daynumE1.innerText=date.getDate()
yearE1.innerText=date.getFullYear()