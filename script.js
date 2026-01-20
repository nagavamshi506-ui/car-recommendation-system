let carData = [];

// Fetch car data (API simulation)
fetch("cars.json")
  .then(response => response.json())
  .then(data => {
      carData = data;
  })
  .catch(error => {
      console.error("Error loading car data:", error);
  });

function recommendCars() {
    const budget = Number(document.getElementById("budget").value);
    const fuel = document.getElementById("fuel").value;
    const transmission = document.getElementById("transmission").value;
    const seats = Number(document.getElementById("seats").value);

    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";

    const results = carData
        .filter(car =>
            car.price <= budget &&
            (fuel === "any" || car.fuel === fuel) &&
            (transmission === "any" || car.transmission === transmission) &&
            car.seats >= seats
        )
        .sort((a, b) => b.rating - a.rating);

    if (results.length === 0) {
        resultDiv.innerHTML = "<p>No cars found.</p>";
        return;
    }

    results.forEach(car => {
        const div = document.createElement("div");
        div.className = "car";
        div.innerHTML = `
            <h3>${car.brand} ${car.model}</h3>
            <p>Price: ₹${car.price.toLocaleString()}</p>
            <p>Fuel: ${car.fuel}</p>
            <p>Transmission: ${car.transmission}</p>
            <p>Mileage: ${car.mileage ? car.mileage + " kmpl" : "EV"}</p>
            <p>Safety Rating: ⭐ ${car.safety}</p>
            <p>User Rating: ⭐ ${car.rating}</p>
        `;
        resultDiv.appendChild(div);
    });
}
