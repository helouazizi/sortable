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
};

fetch("https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json")
    .then(response => response.json()) 
    .then(loadData)
    .catch(error => console.error("Error fetching data:", error));
