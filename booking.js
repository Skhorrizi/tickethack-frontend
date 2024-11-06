
const panier = document.querySelector('.trajetGlobal')


fetch('http://localhost:3000/booking')
    .then(Response => Response.json())
    .then(data => {
        console.log(data.booking);
        if (data.booking.length > 0) {
            panier.innerHTML = ''
            for (let i = 0; i < data.booking.length; i++) {
                console.log('test');

                let bookedElement = bookHtmlTemplate(data.booking[i]);
                panier.innerHTML += bookedElement;
            }
        }
    })


const bookHtmlTemplate = data => {
    console.log('DEBUG', data.departure);

    const date = new Date(data.date)
    const hours = date.getHours()
    let minutes = date.getMinutes()
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes

    return `
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
    `
}