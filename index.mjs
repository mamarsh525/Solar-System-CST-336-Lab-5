import express from 'express';
const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
//root route
app.get('/', async (req, res) => {
   let data = await getAPIData();
   console.log(data);
   res.render('randomImg.ejs', {data});
});

app.get('/planetInfo', (req, res) => {
   let planet = req.query.planet;
   let planetInfo = planets[`get${planet}`]();
   res.render('planet.ejs', {planetInfo, planet});
});

app.get('/spaceObject', (req, res) => {
   let planet = req.query.planet;
   console.log(planet);
   let planetInfo = planets[`get${planet}`]();
   res.render('spaceObject.ejs', {planetInfo, planet});
});

app.get('/NasaPod', async(req, res) => {
   let today = new Date();
   let url =  "https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=" + today.toISOString().split("T")[0];
   const response = await fetch(url);
   const data = await response.json();
   res.render('nasaPod.ejs', {data});
});

async function getAPIData() {
   let range = Math.floor(Math.random() * 50 + 1);
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=flowers";
   const response = await fetch(url);  
   const data = await response.json();
   return data.hits[range].webformatURL;
}
   
// app.get('/mercury', (req, res) => {
//    let mercuryInfo = planets.getMercury();
//    console.log(mercuryInfo);
//    res.render('mercury.ejs', {mercuryInfo})
// });


app.listen(3000, () => {
   console.log('server started');
});
