

export function fetchData(URL){

    return fetch(URL)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP-fel! Status: ${response.status}`);
        }
        return response.json();
        //den returnerar en promise, när man importerar detta behöver man använda .then 
    })
    .then(data => {
        //console.log(data); //Här har du din data
        return data;
    })
    .catch(error => {
        console.log("An error har ocurred:", error);
        return null;
    });
    //Den returnernar
}


