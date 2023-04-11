function loadData() {
        Papa.parse("./data/BikeDetails.csv", {
                download: true,
                header: true,
                dynamicTyping: true,
                complete: results => prepareData(results.data)
        })

}

function prepareData(data) {
        const nn = ml5.neuralNetwork({task: 'regression', debug: true})

        data.sort(() => Math.random() > 0.5)
        let trainData = data.slice(0, Math.floor(data.length * 0.8))
        let testData  = data.slice(Math.floor(data.length * 0.8) + 1)

        // .filter(day =>
        // typeof day.MinTemp !== "number" &&
        // typeof day.MaxTemp !== "number"
        // )

        for (let row of trainData) {
                nn.addData({year: row.year, km_driven: row.km_driven}, {selling_price: row.selling_price})
        }

        nn.normalizeData()
        nn.train({ epochs: 10}, () => doneTraining(nn))
}

function doneTraining(nn) {
        let saveButton = document.getElementById('saveButton')
        saveButton.addEventListener('click', (event) => saveModel(nn))
}

function saveModel(nn){
        nn.save()
}

loadData();
