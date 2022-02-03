async function setPlanetData(name, moons, gravity, desnity, aphelion, perihelion, planetName) {

    try {

        const res = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/{${planetName}}`);
        name.innerHTML = res.data.englishName;
        moons.innerHTML = (res.data.moons == null) ? (
            "<b>Number of moons -</b> " + 0
        ) : (
            "<b>Number of moons -</b> " + res.data.moons.length
        )
        gravity.innerHTML = "<b>Gravity -</b> " + res.data.gravity;
        desnity.innerHTML = "<b>Density -</b> " + res.data.desnity;
        aphelion.innerHTML = "<b>Aphelion -</b> " + res.data.aphelion;
        perihelion.innerHTML = "<b>Perihelion -</b> " + res.data.perihelion;
    } catch (err) {
        console.error(err);
    }
}

const names = document.getElementsByClassName("planet-name");
const moons = document.getElementsByClassName("planet-moons");
const gravaties = document.getElementsByClassName("planet-gravity");
const densities = document.getElementsByClassName("planet-density");
const aphelions = document.getElementsByClassName("planet-aphelion");
const perihelions = document.getElementsByClassName("planet-perihelion");
const planetNames = [
    "mercury",
    "venus",
    "earth",
    "mars",
    "jupiter",
    "saturn",
    "uranus",
    "neptune",
];
for (var i = 0; i < planetNames.length; i++) {


    setPlanetData(names[i], moons[i], gravaties[i], densities[i], aphelions[i], perihelions[i], planetNames[i]);
}