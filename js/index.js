const requestURL = '../json/houses.json';


async function fetchHousesJson(){
    try{
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error(`Error en la peticion al Json ${response.status}`);
        }
        return await response.json();
    }
    catch (error){
        console.error('Error al obtener las casas de la Api : ', error);
        return null;
    }
}

function createHouseCard ({id, image, price, city, description}){
    return `
        <div class="card" style="width: 18rem;">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${price}€</h5>
                <p class="card-text">${id} - ${city}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${description}</li>
            </ul>
        </div>
    `;
}

async function displayHouses() {
    const houseSection = document.getElementById('houseSection');
    const housesData = await fetchHousesJson();

    if (housesData && housesData.houses){
        const houseCards = housesData.houses.map(createHouseCard).join('');
        houseSection.innerHTML = houseCards;
    }
    else
    {
        houseSection.innerHTML = `<p>No se ha podido cargar el Json de las casas</p>`;
    }
}



displayHouses();