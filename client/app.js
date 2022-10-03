const tableBody = document.getElementById('table-body')
const getFlight = () => {
    fetch('http://localhost:8000/flights')
        .then(response => response.json())
        .then(flights => {
            console.log(flights)
            populateTable(flights)
        })
        .catch(err => console.error(err))
}
getFlight()

const populateTable = (flights) => {
    for (const flight of flights) {
        const tableRow = document.createElement('tr')
        const tableIcon = document.createElement('td')
        tableIcon.textContent = "✈"
        tableRow.append(tableIcon)

        const flightDetails = {
            time: flight.schedule.slice(11,16),
            destination: flight.fromtolocation.toUpperCase(),
            flight: flight.flightno,
            gate: flight.gatenumber,
            remarks: flight.flightstat
        }

        for (const flightDetail in flightDetails) {
            const tableCell = document.createElement('td')
            const word = Array.from(flightDetails[flightDetail])

            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div')
                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                }, 250 * index)

                tableCell.append(letterElement)
            }

            tableRow.append(tableCell)
        }

        tableBody.append(tableRow)
    }
}
