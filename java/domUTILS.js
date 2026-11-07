// domUtils.js

export function generateCards(dataArray, containerId) {    
    //Hämta den tomma behållaren i HTML där korten ska ligga
    const container = document.getElementById(containerId);
    if (!container) return; //Den bör få tillgång till hela HTML sidan om funktionen importerades till base.js
    
    
    //Rensa behållaren innan vi startar loopen så det inte blir dubbletter
    container.innerHTML = "";

    //Loopa igenom din data
    dataArray.forEach((item) => {
        // Skapa själva ytterhöljet (<article class="job">)
        const article = document.createElement("article");
        article.classList.add("job");

        // Dynamisk text beroende på om det är jobb (jobtitle) eller utbildning (educationTitle)
        const title = item.jobtitle || item.educationTitle;
        let isFullTime;
        if(item.fulltime){
            isFullTime = "Full Time"
        }else{
            isFullTime = "Part Time"
        }

        // Lägg in hela din exakta HTML-struktur
        // Vi byter ut den hårdkodade texten mot dynamiska variabler som ${jobb.jobtitle}
        article.innerHTML = `
            <h3 class="job-title">
                <span id="jobTitle">${title}</span>
                <svg width="84" height="24" viewBox="0 0 84 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="84" height="24" rx="12" fill="#D7FFE0"/>
                    <text x="42" y="15" 
                        font-family="Poppins" 
                        font-size="11" 
                        fill="#015B0A"
                        text-anchor="middle">
                        ${isFullTime}
                    </text>
                </svg>
            </h3>

            <!--Beskrivning av jobb-->
            <ul class="job-description">
                <li class="Company" aria-label="Company name">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="#A7A7A7" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.33331 1.5V10.5H7.33331V8.75H8.66665V10.5H12.6666V1.5H3.33331ZM4.66665 2.5H5.99998V3.5H4.66665V2.5ZM7.33331 2.5H8.66665V3.5H7.33331V2.5ZM9.99998 2.5H11.3333V3.5H9.99998V2.5ZM4.66665 4.5H5.99998V5.5H4.66665V4.5ZM7.33331 4.5H8.66665V5.5H7.33331V4.5ZM9.99998 4.5H11.3333V5.5H9.99998V4.5ZM4.66665 6.5H5.99998V7.5H4.66665V6.5ZM7.33331 6.5H8.66665V7.5H7.33331V6.5ZM9.99998 6.5H11.3333V7.5H9.99998V6.5ZM4.66665 8.5H5.99998V9.5H4.66665V8.5ZM9.99998 8.5H11.3333V9.5H9.99998V8.5Z"/>
                    </svg>
                    <span>${item.companyname}</span>
                </li>

                <li class="location-description" aria-label="location description">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 6.75C7.50555 6.75 7.0222 6.64003 6.61108 6.43401C6.19995 6.22798 5.87952 5.93514 5.6903 5.59253C5.50108 5.24992 5.45157 4.87292 5.54804 4.50921C5.6445 4.14549 5.8826 3.8114 6.23223 3.54918C6.58187 3.28695 7.02732 3.10838 7.51228 3.03603C7.99723 2.96368 8.4999 3.00081 8.95671 3.14273C9.41353 3.28464 9.80397 3.52496 10.0787 3.83331C10.3534 4.14165 10.5 4.50416 10.5 4.875C10.4992 5.3721 10.2356 5.84867 9.76689 6.20017C9.29822 6.55167 8.6628 6.74941 8 6.75ZM8 3.75C7.70333 3.75 7.41332 3.81598 7.16665 3.9396C6.91997 4.06321 6.72771 4.23892 6.61418 4.44448C6.50065 4.65005 6.47095 4.87625 6.52882 5.09448C6.5867 5.31271 6.72956 5.51316 6.93934 5.6705C7.14912 5.82783 7.41639 5.93498 7.70737 5.97838C7.99834 6.02179 8.29994 5.99951 8.57403 5.91437C8.84812 5.82922 9.08238 5.68502 9.24721 5.50002C9.41203 5.31501 9.5 4.09751 9.5 4.875C9.4996 4.57672 9.34144 4.29075 9.06022 4.07983C8.779 3.86892 8.3977 3.7503 8 3.75Z" fill="#A7A7A7"/>
                        <path d="M8.00001 11.25L3.78201 7.51912C3.7234 7.4631 3.66539 7.40673 3.60801 7.35C2.8875 6.63817 2.49826 5.76871 2.50001 4.875C2.50001 3.78098 3.07947 2.73177 4.11092 1.95818C5.14237 1.1846 6.54132 0.75 8.00001 0.75C9.4587 0.75 10.8576 1.1846 11.8891 1.95818C12.9205 2.73177 13.5 3.78098 13.5 4.875C13.5018 5.7683 13.1127 6.63737 12.3925 7.34888L12.392 7.35C12.392 7.35 12.242 7.49775 12.2195 7.51763L8.00001 11.25ZM4.40601 6.89813C4.40701 6.89813 4.52301 7.01362 4.54951 7.03837L8.00001 10.0905L11.455 7.03425C11.477 7.01362 11.594 6.89738 11.5945 6.897C12.1831 6.31542 12.5012 5.60514 12.5 4.875C12.5 3.97989 12.0259 3.12145 11.182 2.48851C10.3381 1.85558 9.19348 1.5 8.00001 1.5C6.80653 1.5 5.66194 1.85558 4.81803 2.48851C3.97411 3.12145 3.50001 3.97989 3.50001 4.875C3.49896 5.60559 3.81739 6.31628 4.40651 6.89813H4.40601Z" fill="#A7A7A7"/>
                    </svg>
                    <span id="companyName">${item.location}</span>
                </li>

                <!--Date SVG-->
                <li class="Right-side" aria-label="time">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="#A7A7A7" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_22_143)">
                            <path d="M5.33332 6.5C5.15651 6.5 4.98694 6.44732 4.86192 6.35355C4.73689 6.25979 4.66666 6.13261 4.66666 6C4.66666 5.86739 4.73689 5.74021 4.86192 5.64645C4.98694 5.55268 5.15651 5.5 5.33332 5.5C5.51013 5.5 5.6797 5.55268 5.80473 5.64645C5.92975 5.74021 5.99999 5.86739 5.99999 6C5.99999 6.13261 5.92975 6.25979 5.80473 6.35355C5.6797 6.44732 5.51013 6.5 5.33332 6.5ZM5.33332 8.5C5.15651 8.5 4.98694 8.44732 4.86192 8.35355C4.73689 8.25979 4.66666 8.13261 4.66666 8C4.66666 7.86739 4.73689 7.74021 4.86192 7.64645C4.98694 7.55268 5.15651 7.5 5.33332 7.5C5.51013 7.5 5.6797 7.55268 5.80473 7.64645C5.92975 7.74021 5.99999 7.86739 5.99999 8C5.99999 8.13261 5.92975 8.25979 5.80473 8.35355C5.6797 8.44732 5.51013 8.5 5.33332 8.5ZM7.33332 8C7.33332 8.13261 7.40356 8.25979 7.52859 8.35355C7.65361 8.44732 7.82318 8.5 7.99999 8.5C8.1768 8.5 8.34637 8.44732 8.47139 8.35355C8.59642 8.25979 8.66666 8.13261 8.66666 8C8.66666 7.86739 8.59642 7.74021 8.47139 7.64645C8.34637 7.55268 8.1768 7.5 7.99999 7.5C7.82318 7.5 7.65361 7.55268 7.52859 7.64645C7.40356 7.74021 7.33332 7.86739 7.33332 8ZM10.6667 8.5C10.4898 8.5 10.3203 8.44732 10.1953 8.35355C10.0702 8.25979 9.99999 8.13261 9.99999 8C9.99999 7.86739 10.0702 7.74021 10.1953 7.64645C10.3203 7.55268 10.4898 7.5 10.6667 7.5C10.8435 7.5 11.013 7.55268 11.1381 7.64645C11.2631 7.74021 11.3333 7.86739 11.3333 8C11.3333 8.13261 11.2631 8.25979 11.1381 8.35355C11.013 8.44732 10.8435 8.5 10.6667 8.5ZM7.33332 6C7.33332 6.13261 7.40356 6.25979 7.52859 6.35355C7.65361 6.44732 7.82318 6.5 7.99999 6.5C8.1768 6.5 8.34637 6.44732 8.47139 6.35355C8.59642 6.25979 8.66666 6.13261 8.66666 6C8.66666 5.86739 8.59642 5.74021 8.47139 5.64645C8.34637 5.55268 8.1768 5.5 7.99999 5.5C7.82318 5.5 7.65361 5.55268 7.52859 5.64645C7.40356 5.74021 7.33332 5.86739 7.33332 6ZM10.6667 6.5C10.4898 6.5 10.3203 6.44732 10.1953 6.35355C10.0702 6.25979 9.99999 6.13261 9.99999 6C9.99999 5.86739 10.0702 5.74021 10.1953 5.64645C10.3203 5.55268 10.4898 5.5 10.6667 5.5C10.8435 5.5 11.013 5.55268 11.1381 5.64645C11.2631 7.74021 11.3333 7.86739 11.3333 6C11.3333 6.13261 11.2631 6.25979 11.1381 6.35355C11.013 6.44732 10.8435 6.5 10.6667 6.5ZM5.33332 3.5C5.15651 3.5 4.98694 3.55268 4.86192 3.64645C4.73689 3.74021 4.66666 3.86739 4.66666 4C4.66666 4.13261 4.73689 4.25979 4.86192 4.35355C4.98694 4.44732 5.15651 4.5 5.33332 4.5H10.6667C10.8435 4.5 11.013 4.44732 11.1381 4.35355C11.2631 4.25979 11.3333 4.13261 11.3333 4C11.3333 3.86739 11.2631 3.74021 11.1381 3.64645C11.013 3.55268 10.8435 3.5 10.6667 3.5H5.33332Z"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4 1.5C3.46957 1.5 2.96086 1.65804 2.58579 1.93934C2.21071 2.22064 2 2.60218 2 3V9C2 9.39782 2.21071 9.77936 2.58579 10.0607C2.96086 10.342 3.46957 10.5 4 10.5H12C12.5304 10.5 13.0391 10.342 13.4142 10.0607C13.7893 9.77936 14 9.39782 14 9V3C14 2.60218 13.7893 2.22064 13.4142 1.93934C13.0391 1.65804 12.5304 1.5 12 1.5H4ZM12 2.5H4C3.82319 2.5 3.65362 2.55268 3.5286 2.64645C3.40357 2.74021 3.33333 2.86739 3.33333 3V9C3.33333 9.13261 3.40357 9.25979 3.5286 9.35355C3.65362 9.44732 3.82319 9.5 4 9.5H12C12.1768 9.5 12.3464 9.44732 12.4714 9.35355C12.5964 9.25979 12.6667 9.13261 12.6667 9V3C12.6667 2.86739 12.5964 2.74021 12.4714 2.64645C12.3464 2.55268 12.1768 2.5 12 2.5Z"></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_22_143">
                                <rect width="16" height="12" fill="white"></rect>
                            </clipPath>
                        </defs>
                    </svg>                    
                    <span id="workDate">${item.date}</span>
                </li>
            </ul>
            <p class="breaker-line">
                <br>
            </p>
        `;

        // Tryck in det färdiga kortet i behållaren på sidan
        container.appendChild(article);
    });
}

//project cards

export function generateProjectTiles(githubArray) {
    // 1. Hämta din huvudbehållare från HTML
    const container = document.querySelector(".project-tiles");
    if (!container) return;

    // Rensa behållaren från dina hårdkodade testkort
    container.innerHTML = "";

    // 2. Loopa igenom alla 13 objekt med map, object deconstructing används för att hämta name html och description för varje object
    // Vi plockar ut 'i' (indexet) också för att kunna skifta bakgrundsbilder!
    githubArray.map(({ name, html_url, description }, i) => {
        
        // 3. Skapa själva kortet (<article class="project-tile">)
        const article = document.createElement("article");
        article.classList.add("project-tile");

        // Räkna ut ett nummer mellan 1 och 3 baserat på vilket varv vi är på (i)
        // Varv 0 blir bild 1, varv 1 blir bild 2, varv 2 blir bild 3, varv 3 blir bild 1 osv.
        const bgNumber = i + 1; 

        // 4. Klistra in din exakta HTML-struktur inuti backticks
        article.innerHTML = `
            <img class="background-image" src="svg/background-images/background${bgNumber}.svg" alt="background image">
            <div class="tile-description">
                <h3>${name}</h3>
                <p>${description || "This is a sample project description. No description was provided on GitHub."}</p>
                
                <span>Tech stack:
                    <span>HTML, JavaScript, CSS</span> 
                </span>
                
                <nav class="tile-navigation">
                    <a href="#A">
                        <img class="chain-icon" alt="chain icon" src="svg/chain-icon.svg">
                        Live Preview
                    </a>
                    
                    <!-- Här sätter vi in din dynamiska html_url länk till GitHub -->
                    <a href="${html_url}" target="_blank">
                        <img class="tile-github-icon" alt="github icon" src="svg/github.svg">
                        View Code
                    </a>
                </nav>
            </div>
        `;

        // 5. Skjut in det färdiga kortet i din behållare på skärmen
        container.appendChild(article);
    });
}
