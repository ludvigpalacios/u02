//Import functions
import { fetchWorkAndEducation, fetchWorkAndEducationWithThen} from "./fetchJSON.js";
//import {replaceChild} from "./replaceChild.js";

let isHidden=false;
/*We want to have the menu hidden by default, but remove the class once we click the hamburger icon */
/*Grab elements from html */
const grabHidden=document.querySelectorAll(".hidden");
const grabHamburgers=document.querySelectorAll(".hamburgare");

//
const jobTitle= document.querySelectorAll("#jobTitle");
const isFullTime= document.querySelectorAll("#isFullTime");
const companyName= document.querySelectorAll("#companyName");
const locationName= document.querySelectorAll("#locationName");
const workDate = document.querySelectorAll("#workDate");



/*Listen for click */

grabHamburgers.forEach(function (hamburger) { 
  hamburger.addEventListener("click", removeHidden);
});


/*Maybe we can create a variable isHidden*/


function removeHidden(){
    console.log("removeHiddenbutton has been pressed")
    //grabHidden.classList.toggle("active");
    if(isHidden===false){
        grabHidden.forEach((hidden) => { /*Using arrows to skip writing 'function', does the same thing*/
            hidden.classList.remove("hidden");
            console.log("Button is now shown")
            return isHidden=true;
        });
    }
    else{
        grabHidden.forEach(function (hidden) {
            hidden.classList.add("hidden");
            console.log("button is now hidden")
            return isHidden=false;
        });
    }
    
}

//Unpack the promise 

fetchWorkAndEducationWithThen() 
.then(workAndEducation =>{
    if(workAndEducation){
        //Start function
        replaceChild(workAndEducation);
        //console.log(workAndEducation.work[0].companyname)
    }
}).catch(error =>{
    //Den här koden körs om det kastas ett fel
    console.log("Ett fel uppstod:", error);
    //Hämta iframe från HTML
    const errorIframe=document.getElementById("error-popup");

    if(errorIframe){
        //gör iframe synligt
        errorIframe.style.display = "block";
    }
});

//Function that inputs the jobTitle, CompanyName, location, date and fullTime
//replaceChild(jobTitle, isFullTime, companyName, locationName, workDate);
/*function replaceChild(workAndEducation){
    jobTitle.textContent=workAndEducation.work[0].jobtitle;
    companyName.textContent=workAndEducation.work[0].companyname;
    locationName.textContent=workAndEducation.work[0].location;
    workDate.textContent=workAndEducation.work[0].date;

    if(workAndEducation.work[0].fulltime){
        isFullTime.textContent="Full time";
    }else{
        isFullTime.textContent="Part time";
    }


}*/

function replaceChild(workAndEducation) {
    const workArray = workAndEducation.work;
    const educationArray = workAndEducation.education;

    jobTitle.forEach((element, i) => {
        
        // 1. Om i är 0, 1, 2 eller 3 -> Hämta från workArray
        if (i <= 3) {
            // Säkerhetskontroll ifall det finns färre än 4 jobb i arrayen
            if (!workArray[i]) return;

            element.textContent = workArray[i].jobtitle;
            companyName[i].textContent = workArray[i].companyname;
            locationName[i].textContent = workArray[i].location;
            workDate[i].textContent = workArray[i].date;

            if (workArray[i].fulltime) {
                isFullTime[i].textContent = "Full time";
            } else {
                isFullTime[i].textContent = "Part time";
            }
        } 
        // 2. Om i är 4 eller högre -> Växla till educationArray!
        else {
            // Vi räknar ut utbildnings-indexet. Om i = 4, blir eduIndex = 4 - 4 = 0!
            const eduIndex = i - 4;

            // Säkerhetskontroll så vi inte läser utanför utbildningslistan
            if (!educationArray[eduIndex]) return;

            element.textContent = educationArray[eduIndex].educationTitle; // Ändra till din egna property för utbildningsnamn (t.ex. 'degree')
            companyName[i].textContent = educationArray[eduIndex].companyname; // (Skola/Universitet)
            locationName[i].textContent = educationArray[eduIndex].location;
            workDate[i].textContent = educationArray[eduIndex].date;
            
            // Vad ska det stå på 'isFullTime' för utbildningar? 
            isFullTime[i].textContent = "Education"; 
        }
    });
}




