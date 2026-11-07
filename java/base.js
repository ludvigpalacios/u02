//Import functions
import { fetchData} from "./fetchJSON.js";
import {replaceChild} from "./replaceChild.js";
import { generateCards } from './domUTILS.js';

let isHidden=false;
/*We want to have the menu hidden by default, but remove the class once we click the hamburger icon */
/*Grab elements from html */
const grabHidden=document.querySelectorAll(".hidden");
const grabHamburgers=document.querySelectorAll(".hamburgare");

//
const elements = {
    jobTitle: document.querySelectorAll("#jobTitle"),
    isFullTime: document.querySelectorAll("#isFullTime"),
    companyName:  document.querySelectorAll("#companyName"),
    locationName: document.querySelectorAll("#locationName"),
    workDate: document.querySelectorAll("#workDate"),
 
};



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
const workEduURL = "./json/workEducation.json";

fetchData(workEduURL) 
.then(workAndEducation =>{
    if(workAndEducation){
        //Start function
        //replaceChild(workAndEducation, elements);
        //console.log(workAndEducation.work[0].companyname)

        //Bygg jobben i jobb-container
        generateCards(workAndEducation.work, "work-experience-container");

        //Bygg utbildningar i utbildnings-container!
        generateCards(workAndEducation.education, "education-container");
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


//Project cards
const gitHubURL="https://api.github.com/users/ludvigpalacios/repos";
fetchData(gitHubURL) 
.then(workAndEducation =>{
    if(workAndEducation){
        //Start function
        console.log(workAndEducation)
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



