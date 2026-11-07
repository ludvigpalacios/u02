// domUtils.js

export function replaceChild(workAndEducation, elements) {
    const workArray = workAndEducation.work;
    const educationArray = workAndEducation.education;

    // Eftersom variablerna (jobTitle, companyName osv) låg i bas.js,
    // måste vi skicka med dem in i funktionen via 'elements'-objektet
    const { jobTitle, companyName, locationName, workDate, isFullTime } = elements;

    jobTitle.forEach((element, i) => {
        if (i <= 3) {
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
        } else {
            const eduIndex = i - 4;
            if (!educationArray[eduIndex]) return;

            element.textContent = educationArray[eduIndex].educationTitle; 
            companyName[i].textContent = educationArray[eduIndex].companyname; 
            locationName[i].textContent = educationArray[eduIndex].location;
            workDate[i].textContent = educationArray[eduIndex].date;
            
            isFullTime[i].textContent = "Education"; 
        }
    });
}
