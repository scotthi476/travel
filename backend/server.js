//Reference https://www.youtube.com/watch?v=NMnKGHgw8aM Run your React app on Google Cloud

const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Using port ${port}`);
});

//API to access to the trip data
app.get('/api/trips/:id', (req, res) => {
  const id = req.params.id;
  const trip = getTrip(id);
  if(!trip){
     res.status(404).send({error: `trip ${id} not found` })
    }
   else {
    res.send({ data:trip });
   }     
})

//TODO: Below code is using a sample data set.  Need to connect to the cloud SQL and retrive data from the db. 
function getTrip(id){
    const trips = [
      {id: 1, name: 'Boston Trip'},
      {id: 2, name: 'New York Trip'},
      {id: 3, name: 'Arizona Trip'},
      {id: 4, name: 'California Trip'},
      {id: 5, name: 'East Cost Trip'},
      {id: 6, name: 'Illinois Trip'},
    ];
    return trips.find(p =>p.id == id);
}