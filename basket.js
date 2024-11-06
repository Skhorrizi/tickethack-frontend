const bookingId = localStorage.getItem('bookingId')
console.log(bookingId);

const cartContainer = document.querySelector('.trajetGlobal')
const totalPriceNode = document.querySelector('#total')
const purchaseNode = document.querySelector('#purchase')

fetchCarts(bookingId)

purchaseNode.addEventListener('click', async (e) => {
    e.preventDefault()
    const deleteNodes = document.querySelectorAll('.delete')
    console.log(deleteNodes);

    const dates = []
    deleteNodes.forEach(node => dates.push(node.dataset.date))
    
    console.log({ dates });

    const response = await fetch('http://localhost:3000/booking', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dates })
    })
    const data = await response.json()

    if (data.result) {
        const id = "id" + Math.random().toString(16).slice(2)
        localStorage.setItem('bookingId', id);
        console.log(localStorage.getItem('bookingId'));
        window.location.replace(`http://localhost:5501/reservation.html`)
    }
})

async function fetchCarts(bookingId) {
    const response = await fetch(`http://localhost:3000/cart/${bookingId}`)
    const data = await response.json()
    if (data.result) {
        let totalPrice = 0
        cartContainer.innerHTML = ''
        data.carts.forEach(cart => {
            totalPrice += Number(cart.price)
            const template = cartHtmlTemplate(cart)
            cartContainer.innerHTML += template
        });
        totalPriceNode.textContent += totalPrice + '€'
    }
    const deleteNodes = document.querySelectorAll('.delete')
    deleteNodes.forEach(node => {
        node.addEventListener('click', async function () {
            console.log('debug');
            console.log({ dataset: this.dataset });
            const response = await fetch(`http://localhost:3000/cart/${this.dataset.date}`, {
                method: 'DELETE'
            })
            const data = await response.json()
            console.log({ data });
            window.location.reload();
        })
    })
}


const cartHtmlTemplate = data => {

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
            <div class="delete" data-date="${data.date}" >X</div>
        </div>
    </div>
    `
}


// fetch(`http://localhost:3000/cart/${bookingId}`)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);

//         if (data.result) {
//             let totalPrice = 0
//             cartContainer.innerHTML = ''
//             data.carts.forEach(cart => {
//                 totalPrice += Number(cart.price)
//                 const template = cartHtmlTemplate(cart)
//                 cartContainer.innerHTML += template
//             });
//             totalPriceNode.textContent += totalPrice + '€'
//         }
//         const deleteNodes = document.querySelectorAll('.delete')
//         deleteNodes.forEach(node => {
//             node.addEventListener('click', async function () {
//                 console.log('debug');

//                 console.log({ dataset: this.dataset });
//                 const response = await fetch(`http://localhost:3000/cart/${this.dataset.date}`, {
//                     method: 'DELETE'
//                 })
//                 const data = await response.json()
//                 console.log({ data });
//                 window.location.reload();
//             })
//         })
//     })
