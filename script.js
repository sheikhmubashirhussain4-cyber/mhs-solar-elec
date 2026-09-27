/* =========================
   MENU
========================= */

const menuButton = document.getElementById("menuButton");
const closeMenu = document.getElementById("closeMenu");
const sideMenu = document.getElementById("sideMenu");

if (menuButton && sideMenu) {

    menuButton.addEventListener("click", function () {
        sideMenu.classList.add("active");
    });

}

if (closeMenu && sideMenu) {

    closeMenu.addEventListener("click", function () {
        sideMenu.classList.remove("active");
    });

}


/* =========================
   SEARCH
========================= */

const searchButton = document.getElementById("searchButton");
const searchPanel = document.getElementById("searchPanel");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

const searchItems = [

    {
        name: "Solar Installation",
        page: "services.html"
    },

    {
        name: "Electrical Panel Installation",
        page: "services.html"
    },

    {
        name: "Electrical Panel Wiring",
        page: "services.html"
    },

    {
        name: "Electrical Panel Repair & Maintenance",
        page: "services.html"
    },

    {
        name: "Residential & Commercial Electrical Work",
        page: "services.html"
    },

    {
        name: "Solar Panels",
        page: "products.html"
    },

    {
        name: "Solar Inverters",
        page: "products.html"
    },

    {
        name: "Electrical Equipment",
        page: "products.html"
    },

    {
        name: "Solar Installation Project",
        page: "projects.html"
    },

    {
        name: "Electrical Panel Project",
        page: "projects.html"
    },

    {
        name: "Energy Load Calculator",
        page: "index.html"
    },

    {
        name: "Solar System Calculator",
        page: "index.html"
    }

];


if (searchButton && searchPanel) {

    searchButton.addEventListener("click", function () {

        searchPanel.classList.add("active");

        if (searchInput) {
            searchInput.focus();
        }

    });

}


if (closeSearch && searchPanel) {

    closeSearch.addEventListener("click", function () {

        searchPanel.classList.remove("active");

    });

}


if (searchInput && searchResults) {

    searchInput.addEventListener("input", function () {

        const query =
            searchInput.value.toLowerCase().trim();

        searchResults.innerHTML = "";

        if (query === "") {
            return;
        }


        const matches = searchItems.filter(function (item) {

            return item.name
                .toLowerCase()
                .includes(query);

        });


        if (matches.length === 0) {

            searchResults.innerHTML =
                "<p>No results found.</p>";

            return;
        }


        matches.forEach(function (item) {

            const result = document.createElement("div");

            result.className = "search-result";

            result.innerHTML =
                `<a href="${item.page}">${item.name}</a>`;

            searchResults.appendChild(result);

        });

    });

}


/* =========================
   CALCULATOR MODAL
========================= */

const calculatorModal =
    document.getElementById("calculatorModal");

const calculatorClose =
    document.getElementById("calculatorClose");

const calculatorContent =
    document.getElementById("calculatorContent");


document.querySelectorAll(".calculator-card")
.forEach(function (card) {

    card.addEventListener("click", function () {

        const type =
            card.getAttribute("data-calculator");

        openCalculator(type);

    });

});


if (calculatorClose) {

    calculatorClose.addEventListener("click", function () {

        calculatorModal.classList.remove("active");

    });

}


function openCalculator(type) {

    if (!calculatorModal || !calculatorContent) {
        return;
    }


    if (type === "energy") {

        calculatorContent.innerHTML = `

            <h2>Energy Load Calculator</h2>

            <p>
                Enter your appliances, quantity, watts and hours per day.
            </p>

            <div id="applianceRows">

                <div class="calc-row">

                    <input
                        class="appliance-name"
                        placeholder="Appliance e.g. Fan"
                    >

                    <input
                        class="appliance-watts"
                        type="number"
                        min="0"
                        placeholder="Watts"
                    >

                    <input
                        class="appliance-hours"
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="Hours/day"
                    >

                </div>

            </div>

            <button
                type="button"
                class="calc-button"
                id="addAppliance">

                + Add Appliance

            </button>

            <button
                type="button"
                class="calc-button"
                id="calculateEnergy">

                Calculate

            </button>

            <div
                class="calc-result"
                id="energyResult">

                Enter your appliances to calculate the load.

            </div>
        `;


        const rows =
            document.getElementById("applianceRows");

        document.getElementById("addAppliance")
        .addEventListener("click", function () {

            if (rows.children.length >= 15) {
                return;
            }

            const newRow =
                document.createElement("div");

            newRow.className = "calc-row";

            newRow.innerHTML = `

                <input
                    class="appliance-name"
                    placeholder="Appliance"
                >

                <input
                    class="appliance-watts"
                    type="number"
                    min="0"
                    placeholder="Watts"
                >

                <input
                    class="appliance-hours"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Hours/day"
                >

            `;

            rows.appendChild(newRow);

        });


        document.getElementById("calculateEnergy")
        .addEventListener("click", function () {

            const watts =
                document.querySelectorAll(".appliance-watts");

            const hours =
                document.querySelectorAll(".appliance-hours");

            let totalWatts = 0;
            let dailyWh = 0;


            for (let i = 0; i < watts.length; i++) {

                const w =
                    Number(watts[i].value) || 0;

                const h =
                    Number(hours[i].value) || 0;

                totalWatts += w;

                dailyWh += w * h;

            }


            const dailyKwh =
                dailyWh / 1000;


            document.getElementById("energyResult")
            .innerHTML = `

                <strong>
                    ${totalWatts.toFixed(0)} W
                </strong>

                <p>
                    Total connected load
                </p>

                <hr>

                <strong>
                    ${dailyKwh.toFixed(2)} kWh/day
                </strong>

                <p>
                    Estimated daily energy consumption
                </p>

            `;

        });

    }


    if (type === "solar") {

        calculatorContent.innerHTML = `

            <h2>Solar System Calculator</h2>

            <p>
                Enter your estimated daily energy requirement.
            </p>

            <label>
                Daily Energy Requirement (kWh)
            </label>

            <input
                id="solarEnergy"
                type="number"
                min="0"
                step="0.1"
                placeholder="Example: 10"
                style="width:100%;padding:14px;margin:10px 0 15px;"
            >

            <label>
                Average Peak Sun Hours
            </label>

            <input
                id="sunHours"
                type="number"
                min="1"
                max="12"
                step="0.1"
                value="5"
                style="width:100%;padding:14px;margin:10px 0 15px;"
            >

            <button
                class="calc-button"
                id="calculateSolar">

                Calculate

            </button>

            <div
                class="calc-result"
                id="solarResult">

                Enter your energy requirement.

            </div>
        `;


        document.getElementById("calculateSolar")
        .addEventListener("click", function () {

            const energy =
                Number(
                    document.getElementById("solarEnergy").value
                ) || 0;

            const sun =
                Number(
                    document.getElementById("sunHours").value
                ) || 5;


            const systemSize =
                energy / sun / 0.8;


            const panels =
                Math.ceil(
                    (systemSize * 1000) / 550
                );


            document.getElementById("solarResult")
            .innerHTML = `

                <strong>
                    ${systemSize.toFixed(2)} kW
                </strong>

                <p>
                    Estimated solar system size
                </p>

                <strong>
                    ${panels} panels
                </strong>

                <p>
                    Approximate number of 550W panels
                </p>

                <small>
                    This is a basic estimate. Final system sizing
                    depends on site conditions and equipment.
                </small>

            `;

        });

    }


    if (type === "savings") {

        calculatorContent.innerHTML = `

            <h2>Solar Savings Calculator</h2>

            <p>
                Enter your monthly electricity bill.
            </p>

            <label>
                Monthly Electricity Bill (PKR)
            </label>

            <input
                id="monthlyBill"
                type="number"
                min="0"
                placeholder="Example: 30000"
                style="width:100%;padding:14px;margin:10px 0 15px;"
            >

            <label>
                Estimated Solar Offset (%)
            </label>

            <input
                id="solarOffset"
                type="number"
                min="0"
                max="100"
                value="70"
                style="width:100%;padding:14px;margin:10px 0 15px;"
            >

            <button
                class="calc-button"
                id="calculateSavings">

                Calculate

            </button>

            <div
                class="calc-result"
                id="savingsResult">

                Enter your monthly bill.

            </div>

        `;


        document.getElementById("calculateSavings")
        .addEventListener("click", function () {

            const bill =
                Number(
                    document.getElementById("monthlyBill").value
                ) || 0;

            const offset =
                Number(
                    document.getElementById("solarOffset").value
                ) || 0;


            const monthlySaving =
                bill * (offset / 100);

            const yearlySaving =
                monthlySaving * 12;


            document.getElementById("savingsResult")
            .innerHTML = `

                <strong>
                    PKR ${monthlySaving.toFixed(0)}
                </strong>

                <p>
                    Estimated monthly saving
                </p>

                <strong>
                    PKR ${yearlySaving.toFixed(0)}
                </strong>

                <p>
                    Estimated yearly saving
                </p>

                <small>
                    This is an estimate and actual savings may vary.
                </small>

            `;

        });

    }


    if (type === "electrical") {

        calculatorContent.innerHTML = `

            <h2>Electrical Load Calculator</h2>

            <p>
                Enter connected load and estimated usage.
            </p>

            <label>
                Total Connected Load (Watts)
            </label>

            <input
                id="electricalWatts"
                type="number"
                min="0"
                placeholder="Example: 5000"
                style="width:100%;padding:14px;margin:10px 0 15px;"
            >

            <label>
                Estimated Demand Factor (%)
            </label>

            <input
                id="demandFactor"
                type="number"
                min="1"
                max="100"
                value="80"
                style="width:100%;padding:14px;margin:10px 0 15px;"
            >

            <button
                class="calc-button"
                id="calculateElectrical">

                Calculate

            </button>

            <div
                class="calc-result"
                id="electricalResult">

                Enter your connected load.

            </div>

        `;


        document.getElementById("calculateElectrical")
        .addEventListener("click", function () {

            const watts =
                Number(
                    document.getElementById("electricalWatts").value
                ) || 0;

            const factor =
                Number(
                    document.getElementById("demandFactor").value
                ) || 0;


            const demand =
                watts * (factor / 100);


            document.getElementById("electricalResult")
            .innerHTML = `

                <strong>
                    ${watts.toFixed(0)} W
                </strong>

                <p>
                    Connected load
                </p>

                <strong>
                    ${demand.toFixed(0)} W
                </strong>

                <p>
                    Estimated demand load
                </p>

            `;

        });

    }


    calculatorModal.classList.add("active");

}


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        alert(
            "Thank you! Your inquiry has been received."
        );

        contactForm.reset();

    });

}