const nn = ml5.neuralNetwork({task: 'regression'})
nn.load('./model/model.json', modelLoaded)

async function modelLoaded() {
    console.log("the model was successfully loaded!")
}

let predictButton = document.getElementById('predict')
predictButton.addEventListener('click', ev => predict(ev))

async function predict(ev) {
    // let exShowroomPrice = document.getElementById('exShowroomPrice').value;
    let year = document.getElementById('year').value;
    let kmDriven = document.getElementById('kmDriven').value;

    console.log(year, kmDriven)

    const result = await nn.predict({
        // ex_showroom_price: parseInt(exShowroomPrice),
        year: parseInt(year),
        km_driven: parseInt(kmDriven),
    })

    console.log(result)

    let endResult = document.getElementById('result')
    endResult.innerHTML = `De prijs van de motor is: ${result[0].selling_price}`;
}