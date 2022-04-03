window.onload = function () {
    let xhr = new XMLHttpRequest()
    xhr.open("GET", "https://pogoapi.net/api/v1/raid_bosses.json")
    xhr.onload = function () {
        if (xhr.status == 200) {
            let arrayRaids = JSON.parse(xhr.responseText)


            tierMega5(arrayRaids);
            tier3(arrayRaids);
            tier1(arrayRaids);
        }
    }

    xhr.send()
};

function tierMega5(arrayRaids) {
    let bosses = document.querySelector('#raid-bosses')
    bosses.insertAdjacentHTML("beforeend", '<div class="col-md-4" id="mega"></div>')

    let mega = document.querySelector('#mega')

    for (raid of arrayRaids.current.mega) {
        let weatherHTML = ''
        raid.boosted_weather.forEach(boostweather => {
            weatherHTML = weatherHTML + '<img class="raidWeatherIcon" src="./images/weather/' + boostweather + '.png">'

        });
        let typeHTML = ''
        raid.type.forEach(raidType => {
            typeHTML = typeHTML + '<img class="raidTypeIcon" src="https://assets.thesilphroad.com/img/pogo-assets/type-' + raidType.toLowerCase() + '.png">'

        });
        let raidform = ""
        if (raid.form != "Normal") {
            raidform = "-" + raid.form.toLowerCase()
        }

        let raidHTML = `<div class="pokeball-wrapper">
        <img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/mega-raid-icon.png" />
    </div>
    <div class="enhanced">
        <h2>${raid.name}</h2>
        <img class="pokemon small" src="https://assets.thesilphroad.com/img/pokemon/icons/96x96/${raid.name.toLowerCase()}-mega${raidform}.png" />
        <div id="raid-icons">
        <div id="type-icons">${typeHTML}</div>
        <div id="weather-icons">${weatherHTML}</div>
        </div>
        <h4>CP Range  ${raid.min_unboosted_cp} - ${raid.max_unboosted_cp}</h4>
        <h5> Boosted CP  ${raid.min_boosted_cp} - ${raid.max_boosted_cp}</h5>
    </div>`;
        mega.insertAdjacentHTML("beforeend", raidHTML)



    }
    for (raid of arrayRaids.current[5]) {
        let weatherHTML = ''
        raid.boosted_weather.forEach(boostweather => {
            weatherHTML = weatherHTML + '<img class="raidWeatherIcon" src="./images/weather/' + boostweather + '.png">'

        });
        let typeHTML = ''
        raid.type.forEach(raidType => {
            typeHTML = typeHTML + '<img class="raidTypeIcon" src="https://assets.thesilphroad.com/img/pogo-assets/type-' + raidType.toLowerCase() + '.png">'

        });

        let raidHTML = `<div class="pokeball-wrapper">
        <img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png"><img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png"><img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png"><img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png"><img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png">
    </div>
    <div class="enhanced">
        <h2>${raid.name}</h2>
        <img class="pokemon small" src="https://assets.thesilphroad.com/img/pokemon/icons/96x96/${raid.id}.png" />
        <div id="raid-icons">
        <div id="type-icons">${typeHTML}</div>
        <div id="weather-icons">${weatherHTML}</div>
        </div>
        <h4>CP Range  ${raid.min_unboosted_cp} - ${raid.max_unboosted_cp}</h4>
        <h5> Boosted CP  ${raid.min_boosted_cp} - ${raid.max_boosted_cp}</h5>
    </div>`;
        mega.insertAdjacentHTML("beforeend", raidHTML)
    }
}


function tier3(arrayRaids) {
    let bosses = document.querySelector('#raid-bosses')
    bosses.insertAdjacentHTML("beforeend", '<div class="col-md-4" id="tier3"></div>')

    let tier3 = document.querySelector('#tier3')

    for (raid of arrayRaids.current[3]) {
        let weatherHTML = ''
        raid.boosted_weather.forEach(boostweather => {
            weatherHTML = weatherHTML + '<img class="raidWeatherIcon" src="./images/weather/' + boostweather + '.png">'

        });
        let typeHTML = ''
        raid.type.forEach(raidType => {
            typeHTML = typeHTML + '<img class="raidTypeIcon" src="https://assets.thesilphroad.com/img/pogo-assets/type-' + raidType.toLowerCase() + '.png">'

        });

        let raidHTML = `<div class="pokeball-wrapper">
        <img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png"><img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png"><img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png">
    </div>
    <div class="enhanced">
        <h2>${raid.name}</h2>
        <img class="pokemon small" src="https://assets.thesilphroad.com/img/pokemon/icons/96x96/${raid.id}.png" />
        <div id="raid-icons">
        <div id="type-icons">${typeHTML}</div>
        <div id="weather-icons">${weatherHTML}</div>
        </div>
        <h4>CP Range  ${raid.min_unboosted_cp} - ${raid.max_unboosted_cp}</h4>
        <h5> Boosted CP  ${raid.min_boosted_cp} - ${raid.max_boosted_cp}</h5>
    </div>`;
        tier3.insertAdjacentHTML("beforeend", raidHTML)



    }
}


function tier1(arrayRaids) {
    let bosses = document.querySelector('#raid-bosses')
    bosses.insertAdjacentHTML("beforeend", '<div class="col-md-4" id="tier1"></div>')

    let tier1 = document.querySelector('#tier1')

    for (raid of arrayRaids.current[1]) {
        let weatherHTML = ''
        raid.boosted_weather.forEach(boostweather => {
            weatherHTML = weatherHTML + '<img class="raidWeatherIcon" src="./images/weather/' + boostweather + '.png">'

        });
        let typeHTML = ''
        raid.type.forEach(raidType => {
            typeHTML = typeHTML + '<img class="raidTypeIcon" src="https://assets.thesilphroad.com/img/pogo-assets/type-' + raidType.toLowerCase() + '.png">'

        });

        let raidHTML = `<div class="pokeball-wrapper">
       <img class="raidTierIcon" src="https://assets.thesilphroad.com/img/pogo-assets/raid-icon.png">
    </div>
    <div class="enhanced">
        <h2>${raid.name}</h2>
        <img class="pokemon small" src="https://assets.thesilphroad.com/img/pokemon/icons/96x96/${raid.id}.png" />
        <div id="raid-icons">
        <div id="type-icons">${typeHTML}</div>
        <div id="weather-icons">${weatherHTML}</div>
        </div>
        <h4>CP Range  ${raid.min_unboosted_cp} - ${raid.max_unboosted_cp}</h4>
        <h5> Boosted CP  ${raid.min_boosted_cp} - ${raid.max_boosted_cp}</h5>
    </div>`;
        tier1.insertAdjacentHTML("beforeend", raidHTML)
    }
}


