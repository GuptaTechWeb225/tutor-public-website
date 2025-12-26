// add guest 

const guestField = document.getElementById("guest-field");
const dropdown = document.getElementById("guestDropdown");
const guestInput = document.getElementById("guestInput");

let adults = 0, children = 0, rooms = 0;


function updateText() {
    guestInput.value = `${adults} adults · ${children} children · ${rooms} rooms`;
}

dropdown.innerHTML = `
    <div class="guest-box">
        <div class="guest-row">
            <label>Adults</label>
            <div class="counter">
                <button class="minus" data-type="adults">-</button>
                <span id="adultsCount">${adults}</span>
                <button class="plus" data-type="adults">+</button>
            </div>
        </div>
        <div class="guest-row">
            <label>Children</label>
            <div class="counter">
                <button class="minus" data-type="children">-</button>
                <span id="childrenCount">${children}</span>
                <button class="plus" data-type="children">+</button>
            </div>
        </div>
        <div class="guest-row">
            <label>Rooms</label>
            <div class="counter">
                <button class="minus" data-type="rooms">-</button>
                <span id="roomsCount">${rooms}</span>
                <button class="plus" data-type="rooms">+</button>
            </div>
        </div>
        <button class="done-btn" id="guestDone">Done</button>
    </div>
`;


guestField.addEventListener("click", function (e) {
    dropdown.classList.add("show");

    const rect = guestField.getBoundingClientRect();
    dropdown.style.top = rect.bottom + 8 + "px";
    dropdown.style.left = rect.left + "px";
    dropdown.style.width = rect.width + "px";

    e.stopPropagation();
});

dropdown.addEventListener("click", function (e) {
    if (e.target.classList.contains("plus")) {
        let type = e.target.dataset.type;
        if (type === "adults") adults++;
        if (type === "children") children++;
        if (type === "rooms") rooms++;
    }

    if (e.target.classList.contains("minus")) {
        let type = e.target.dataset.type;
        if (type === "adults" && adults > 1) adults--;
        if (type === "children" && children > 0) children--;
        if (type === "rooms" && rooms > 1) rooms--;
    }

    document.getElementById("adultsCount").textContent = adults;
    document.getElementById("childrenCount").textContent = children;
    document.getElementById("roomsCount").textContent = rooms;

    updateText();
});


document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) dropdown.classList.remove("show");
});


document.getElementById("guestDone").addEventListener("click", () => {
    dropdown.classList.remove("show");
});



