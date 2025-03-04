
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

};

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then(response => response.json()) 
    .then(loadData)
    .catch(error => console.error("Error fetching data:", error));



function pagination(heroes){
    //l ets get the selec html id
    let select =  document.getElementById('alignmentFilter')
    select.addEventListener("change",(event)=>{
        let num = parseInt(event.target.value)
        // console.log(parseInt(event.target.value))
        // console.log(heroes.length)
        // console.log(Math.ceil(heroes.length/num))
        let pages = Math.ceil(heroes.length/num)
        let pagination = document.querySelector('.pagination')
        for (let i = 2; i <= pages ;i++){
            let page = `<li><a href=${i}>${i}<a></li>`
            pagination.innerHTML += page
        }
        Getpage(heroes,num)

    })
}


function Getpage(heroes,num){
    
}
