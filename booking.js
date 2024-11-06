
const panier = document.querySelector('.panier')


fetch('http://localhost:3000/booking')
.then(Response => Response.json())
.then(data => {
    for(let i = 0; i < data[i]; i++) {
    let bookedElement = bookHtmlTemplate(data[i]);
    panier.innerHTML += bookedElement;
    } 
})


const bookHtmlTemplate = data => {
    const date = new Date(data.date)
    const hours = date.getHours()
    let minutes = date.getMinutes()
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes
    
    return `
<div class="middlebox">
        <div class="panier">
            <div class="text">My bookings</div>
            <div class="trajetGlobal">
                <div class="row-result">
                    <div class="deparr">
                        <div id="departure">${data.departure}</div>
                        <div id="direction">></div>
                        <div id="arrival">${data.arrival}</div>
                    </div>
                    <div class="rest">
                        <div id="hour">${hours}:${minutes}</div>
                        <div id="price">${data.price}€</div>
                        <div class="decompte">Departure in 5 hours</div>
                    </div>
                </div>
            </div>
            <div class="messageResa">
                <div id="Remerciements">Enjoy your travel with Tickethack </div>
            </div>
        </div>
    </div>
    `
}