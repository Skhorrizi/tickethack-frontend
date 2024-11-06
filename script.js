const searchButton = document.querySelector('#search')
const departureInput = document.querySelector('#departure')
const arrivalInput = document.querySelector('#arrival')
const dateInput = document.querySelector('#date')
const resultContainer = document.querySelector('.container-result')

const id = "id" + Math.random().toString(16).slice(2)
localStorage.setItem("cartId", id);

console.log(id)


searchButton.addEventListener('click', async () => {
    const { value: departure } = departureInput
    const { value: arrival } = arrivalInput
    const { value: date } = dateInput

    const data = { departure, arrival, date }
    // Base de donnée: 2024-11-05T10:37:02.860Z
   // valeur input: { departure: 'Paris', arrival: 'Marseille', date: '2024-11-07' }
  
    console.log(data);
    

    const response = await fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const dataFromBackend = await response.json()
    console.log({dataFromBackend});
    

    if (dataFromBackend.result) {
        dataFromBackend.trips.forEach((trip) => {
            const row = rowResultTeplate(trip)
            resultContainer.innerHTML += row
        })

        addEventOnBackendResult()
    }
})

const rowResultTeplate = data => {
    const date = new Date(data.date)
    const hours = date.getHours()
    let minutes = date.getMinutes()
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes

    return `<div class="result-row">
        <div class="result-row-trip">
            <p>${data.departure}</p>
            <p>&nbsp>&nbsp</p>
            <p>${data.arrival}</p>
        </div>
        <p>${hours}:${minutes}</p>
        <p>${data.price}€</p>
        <button
            class="book"
            data-departure="${data.departure}" 
            data-arrival="${data.arrival}"
            data-hour="${hours}:${minutes}"
            data-date="${data.date}"
            data-price="${data.price}"
            >Book</button>
    </div>`
}

function addEventOnBackendResult() {
    const bookNodes = document.querySelectorAll('.book')
    bookNodes.forEach((node) => {
        node.addEventListener('click', () => {
            const { departure, arrival, hour, price, date } = node.dataset
            console.log({ departure, arrival, hour, price, date });
            
            fetch('http://localhost:3000/basket', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(node.parentNode.dataset)
            })
        })
    })
}