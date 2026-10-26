const express = require("express");

const app = express();
const port = 3000;

app.use(express.json());

let cars = [];
let carsID = 1;

app.get('/api/cars',(req, res) => {
    res.json(cars);
});

app.get('/api/cars/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: 'negative integer' });
    }
    const car = cars.find(car => car.id === id);
    if (!car) {
        return res.status(404).json({ error: 'Car not found.' });
    }
    res.status(200).json(car);
});

app.delete('/api/cars/:id', (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ error: 'negative integer' });
    }
    const carIndex = cars.findIndex(car => car.id === id);
    if (carIndex === -1) {
        return res.status(404).json({ error: 'Car not found.' });
    }
    const deletedCar = cars.splice(carIndex, 1)[0];
    res.status(200).json({ message: 'deleted successfully.', car: deletedCar });
});

app.post('/api/cars', (req, res) =>{
    const {plateNumber, owner, vehicleType, color} = req.body;
    const uniquePlate = plateNumber.trim().toUpperCase();
    const duplicatePlate = cars.find(car => car.plateNumber.toUpperCase() === uniquePlate);

    if (duplicatePlate) {
        return res.status(409).json({ error: 'Plate number already exists.' });
    }

const newRecord = {
    id: carsID++,
    plateNumber: plateNumber.trim(),
    owner,
    vehicleType,
    color
};
    cars.push(newRecord);
    res.status(201).json(newRecord);
});
app.use(express.static(__dirname));


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});