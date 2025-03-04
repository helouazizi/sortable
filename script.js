
const loadData = (heroes) => {
    const tbody = document.querySelector('tbody');      

    heroes.forEach(hero => {
        let row = `
            <tr>
                <td><img src="${hero.images.xs}" alt="${hero.name}" width="50"></td>
                <td>${hero.name}</td>
                <td>${hero.biography.fullName || "Unknown"}</td>
                <td>${JSON.stringify(hero.powerstats)}</td>
                <td>${hero.appearance.race || "Unknown"}</td>
                <td>${hero.appearance.gender}</td>
                <td>${hero.appearance.height.join(", ")}</td>
                <td>${hero.appearance.weight.join(", ")}</td>
                <td>${hero.biography.placeOfBirth || "Unknown"}</td>
                <td>${hero.biography.alignment}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    const search = document.querySelector("[data-search]");

    search.addEventListener("input", e => {
        const value = e.target.value.trim().toLowerCase();
        const rows = document.querySelectorAll("#heroTableBody tr"); 
    
        rows.forEach(row => {
            const nameCell = row.querySelector("td:nth-child(2)"); 
            const name = nameCell.textContent.toLowerCase();
    
            const isVisible = name.includes(value);
            row.classList.toggle("hide", !isVisible);
        });
    });
    
    
    pagination(heroes)
    sort(heroes)

};

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then(response => response.json())
    .then(loadData)
    .catch(error => console.error("Error fetching data:", error));



function pagination(heroes){
    //l ets get the selec html id
    let select = document.getElementById('alignmentFilter')
    select.addEventListener("change", (event) => {
        let num = parseInt(event.target.value)
         //console.log(parseInt(event.target.value))
        // console.log(heroes.length)
        // console.log(Math.ceil(heroes.length/num))
        let pages = Math.ceil(heroes.length / num)
        let pagination = document.querySelector('.pagination')
        pagination.innerHTML = ""
        for (let i = 1; i <= pages; i++) {
            let page = `<li><button class = "getpage" value ="${i}">${i}</button></li>`
            pagination.innerHTML += page
        }
        // Add event listeners to pagination buttons
        document.querySelectorAll('.getpage').forEach(button => {
            button.addEventListener("click", (event) => {
                let pageNum = parseInt(event.target.value);
                Getpage(heroes, num, pageNum);
            });
        });
        Getpage(heroes,num, 1)
    })
}


function Getpage(heroes,num,pagenum) {
    let start = pagenum*num
    if (pagenum === 1){
        start = 0
    }
    let end = start+num
    let filteredheros = heroes.slice(start,end)
    if (num === -1) {
        filteredheros = heroes 
    }
    const tbody = document.querySelector('tbody');
    //console.log(filteredheros.length,heroes.length);
    // lets free the body
    tbody.innerHTML = "" 
    filteredheros.forEach(hero => {
        let row = `
            <tr>
                <td><img src="${hero.images.xs}" alt="${hero.name}" width="50"></td>
                <td>${hero.name}</td>
                <td>${hero.biography.fullName || "Unknown"}</td>
                <td>${JSON.stringify(hero.powerstats)}</td>
                <td>${hero.appearance.race || "Unknown"}</td>
                <td>${hero.appearance.gender}</td>
                <td>${hero.appearance.height.join(", ")}</td>
                <td>${hero.appearance.weight.join(", ")}</td>
                <td>${hero.biography.placeOfBirth || "Unknown"}</td>
                <td>${hero.biography.alignment}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
    


}


function sort(heroes){
    let headers = document.getElementsByTagName('th')
      // Convert headers to an array before using forEach
      Array.from(headers).forEach(th => {
       th.addEventListener("click",(event)=>{
           console.log(event.target.value) 
       })
    });
}
