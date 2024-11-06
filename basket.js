const bookingId = localStorage.getItem('bookingId')
const cartContainer = document.querySelector('.trajetGlobal')

fetch(`http://localhost:3000/cart/${bookingId}`)
    .then(data => {
        if (data.result) {
            data.newCart.forEach(cart => {
                const template = cartHtmlTemplate(cart)
                cartContainer.innerHTML += template
            });
        }
    })


const cartHtmlTemplate = data => {
    const date = new Date(data.date)
    const hours = date.getHours()
    let minutes = date.getMinutes()
    minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes
    `
    <div class="deparr">
        <div id="departure">${data.departue}</div>
        <div id="direction">></div>
        <div id="arrival">${data.arrival}</div>
    </div>
    <div class="rest">
        <div id="hour">${hours}:${minutes}</div>
        <div id="price">${data.price}€</div>
                    <div class="delete">X</div>
    </div>
    `
}