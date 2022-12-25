let min_size = 5;
let max_size = 15;

let min_dY = 5;
let max_dY = 20;

let min_dX = 5;
let max_dX = 20;

let flakeN = 100;
let createdFlakes = 100;

let SCREEN_HEIGHT = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
);
let SCREEN_WIDTH = document.documentElement.clientWidth;

document.body.innerHTML = ` 
    <div id="snowfall"></div>
    <button class="panel_button" id="panel_button" onclick="return openSettingPanel()">
        <img src="HappyNewYear/img_NY/snow_icon.png" id="setting_icon">
    </button>
    <div id="new-year_decor"></div>
    <div id="decor_panel" class="setting_panel setting_panel_left">
        <div>
            <div class="form_flex" style="justify-content: space-between;">
                <p id="snow_choose" class="input_value" onclick="return changeUnderline('left')">Снегопад</p>
                <p id="ball_choose" class="input_value" onclick="return changeUnderline('right')">Гирлянда</p>
            </div>
        </div>
        <form name="snow_params" class="form_ny">
            <p class="input_value">Количество снежинок:</p>
            <div class="form_flex">
                <input type="range" min="100" max="2500" step="50" name="snow_number" 
                class="slider" oninput="return newSlideData('snow_params', 'snow_number', 'number')" value="100">
                <span class="input_value" id="number">100</span>
            </div>

            <p class="input_value">Направление ветра:</p>
            <div class="form_flex">
                <input type="range" min="-90" max="90" step="1" name="snow_direction" value="45"
                class="slider" oninput="return newSlideData('snow_params', 'snow_direction', 'direction')">
                <span class="input_value" id="direction">45</span>
            </div>

            <p class="input_value">Скорость ветра:</p>
            <div class="form_flex">
                <input type="range" min="1" max="10" step="1" name="snow_speed" 
                class="slider" oninput="return newSlideData('snow_params', 'snow_speed', 'speed')" value="5">
                <span class="input_value" id="speed">5</span>
            </div>
            
            <p class="input_value">Цвет снежинок:</p>
            <input type="color" name="snow_color"
            value="#ffffff" style="height: 50px;">
        </form>

        <div class="button_set">
            <button class="setting_buttons" onclick="return startSnow()">Сохранить</button>
            <button class="setting_buttons" onclick="return cancelSnow()">Отмена</button>
        </div>
    </div>
` + document.body.innerHTML;

let setting_panel = document.getElementById("decor_panel");
let decor_body = document.getElementById("new-year_decor");
let snowfall_body = document.getElementById("snowfall");
let flake = [];
let speed = 5;
let direction = 45;
let color = "#ffffff";
document.body.onresize = (event) => {
    SCREEN_WIDTH = document.documentElement.clientWidth;
    SCREEN_HEIGHT = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );
    createBalls();
};

function changeUnderline(dir) {
    if (dir == "left") {
        document.getElementById("snow_choose").classList.toggle("deleted");
        if (document.getElementById("snow_choose").classList.contains("deleted")) {
            deleteSnow();
        } else {
            updateFlakes();
        }
    }
    if (dir == "right") {
        document.getElementById("ball_choose").classList.toggle("deleted");
        if (document.getElementById("ball_choose").classList.contains("deleted")) {
            deleteBalls();
        } else {
            decor_body.style.display = 'block';
            createBalls();
        }
    }
    return false;
}

function deleteSnow() {
    for (let i = 0; i < flakeN; i++) {
        flake[i].x = -100;
        flake[i].animated = false;
        document.getElementById(`snowflake${i}`).style.left = "-100px"
    }
}

function deleteBalls() {
    decor_body.innerHTML = "";
    decor_body.style.display = 'none';
}

function newSlideData(formName, elName, inputId) {
    document.getElementById(inputId).innerHTML =
        document.forms[formName].elements[elName].value;
    return false;
}

function startSnow() {
    flakeN = parseInt(document.forms['snow_params'].elements["snow_number"].value);
    speed = parseInt(document.forms['snow_params'].elements["snow_speed"].value);
    direction = parseInt(document.forms['snow_params'].elements["snow_direction"].value);
    color = (document.forms['snow_params'].elements["snow_color"].value);
    updateFlakes();
    openSettingPanel();
    return false;
}

function cancelSnow() {
    openSettingPanel();
    return false;
}

function getRandomInt(min, max) {
    let result = Math.floor(Math.random() * (max - min)) + min;
    return result;
}

function updateFlakes() {
    // console.log(getTanDeg(direction));
    // console.log((flake[0].size + speed * 4));
    // console.log((flake[0].size + speed * 4) * getTanDeg(Math.abs(direction)));

    if (flakeN > createdFlakes) {
        flake.length = flakeN;
        for (let i = 0; i < flakeN; i++) {
            if (i > createdFlakes - 1) {
                flake[i] = {
                    size: getRandomInt(min_size, max_size),

                    max_dY: 0,
                    min_dY: 0,

                    max_dX: 0,
                    min_dX: 0,

                    alpha: Math.random(),

                    x: getRandomInt(10, SCREEN_WIDTH),
                    y: getRandomInt(10, SCREEN_HEIGHT),

                    animated: true
                }
                snowfall_body.innerHTML += `
                    <div id="snowflake${i}" class="flake_style" style="
                        top: ${flake[i].y}px;
                        left: ${flake[i].x}px;
                        width: ${flake[i].size}px;
                        height: ${flake[i].size}px;
                        background-color: ${color};
                        opacity: ${getRandomInt(0, 100)}%;   
                    "></div>
                `;
            } else {
                document.getElementById(`snowflake${i}`).style.backgroundColor = color;

                flake[i].x = getRandomInt(10, SCREEN_WIDTH);
                document.getElementById(`snowflake${i}`).style.left = flake[i].x;
                flake[i].y = getRandomInt(10, SCREEN_HEIGHT);
                document.getElementById(`snowflake${i}`).style.top = flake[i].y;
            }
            setDirection(i, getTanDeg(Math.abs(direction)));
            flake[i].animated = true;
        }
        createdFlakes = flakeN;
    } else {
        for (let i = 0; i < createdFlakes; i++) {
            if (i < flakeN) {
                setDirection(i, getTanDeg(Math.abs(direction)));
                document.getElementById(`snowflake${i}`).style.backgroundColor = color;
                flake[i].animated = true;

                flake[i].x = getRandomInt(10, SCREEN_WIDTH);
                document.getElementById(`snowflake${i}`).style.left = flake[i].x;
                flake[i].y = getRandomInt(10, SCREEN_HEIGHT);
                document.getElementById(`snowflake${i}`).style.top = flake[i].y;
            } else {
                flake[i].x = -100;
                flake[i].animated = false;
                document.getElementById(`snowflake${i}`).style.left = "-100px";
            }
        }
    }
}

function setDirection(i, tang) {
    if (direction > 0 & direction < 90) {
        flake[i].max_dY = (flake[i].size + speed * 4);
        flake[i].max_dX = (flake[i].size + speed * 4) * tang;

        if (flake[i].max_dY < flake[i].max_dX) {
            let a = flake[i].max_dX / (flake[i].size + speed * 4);
            flake[i].max_dY /= a;
            flake[i].max_dX /= a;
        }
    }

    if (direction < 0 & direction > -90) {
        flake[i].max_dY = (flake[i].size + speed * 4);
        flake[i].max_dX = -(flake[i].size + speed * 4) * tang;

        if (Math.abs(flake[i].max_dY) < Math.abs(flake[i].max_dX)) {
            let a = Math.abs(flake[i].max_dX / (flake[i].size + speed * 4));
            flake[i].max_dY /= a;
            flake[i].max_dX /= a;
        }
    }

    if (direction == 0) {
        flake[i].max_dX = 0;
        flake[i].max_dY = (flake[i].size + speed * 4);
    }

    if (direction == 90 || direction == -90) {
        flake[i].max_dX = (flake[i].size + speed * 4) * (90 / direction);
        flake[i].max_dY = 0;
    }

    flake[i].min_dX = flake[i].max_dX * 0.7;
    flake[i].min_dY = flake[i].max_dY * 0.7;
}

function getTanDeg(deg) {
    var rad = deg * Math.PI / 180;
    return Math.tan(rad);
}

function createFlakes() {
    flake.length = flakeN;
    for (let i = 0; i < flakeN; i++) {
        flake[i] = {
            size: getRandomInt(min_size, max_size),

            max_dY: 0,
            min_dY: 0,

            max_dX: 0,
            min_dX: 0,

            alpha: Math.random(),

            x: getRandomInt(10, SCREEN_WIDTH),
            y: getRandomInt(10, SCREEN_HEIGHT),

            animated: true
        }
        setDirection(i, getTanDeg(Math.abs(direction)));
        snowfall_body.innerHTML += `
            <div id="snowflake${i}" class="flake_style" style="
                top: ${flake[i].y}px;
                left: ${flake[i].x}px;
                width: ${flake[i].size}px;
                height: ${flake[i].size}px;
                background-color: ${color};
                opacity: ${getRandomInt(0, 100)}%;   
            "></div>
        `;
    }
}

function drawFlakes() {
    for (let i = 0; i < flake.length; i++) {
        if (flake[i].animated) {
            snowflake = document.getElementById(`snowflake${i}`);
            snowflake.style.top = flake[i].y + 'px';
            snowflake.style.left = flake[i].x + 'px';
        }
    }
}

function moveFlakes() {
    for (let i = 0; i < flake.length; i++) {
        if (flake[i].animated) {
            flake[i].x += getRandomInt(flake[i].min_dX, flake[i].max_dX);
            flake[i].y += getRandomInt(flake[i].min_dY, flake[i].max_dY);
            if (direction >= 0) {
                if (flake[i].x > SCREEN_WIDTH - 30) {
                    flake[i].x = 0;
                }

                if (flake[i].y > SCREEN_HEIGHT - 30) {
                    flake[i].y = 0;
                }
            } else {
                if (flake[i].x < 30) {
                    flake[i].x = SCREEN_WIDTH - 30;
                }

                if (flake[i].y > SCREEN_HEIGHT - 30) {
                    flake[i].y = 0;
                }
            }
        }
    }
}

function createBalls() {
    decor_body.innerHTML = "";
    let ballsN = 0;
    for (let i = 0; i < SCREEN_WIDTH; i += 173) {
        let heightBall = getRandomInt(50, 75);
        decor_body.innerHTML += `
            <img src="HappyNewYear/img_NY/ball${getRandomInt(1, 5)}.png" class="new-year_ball" id="ball${ballsN}" style ="
                top: ${getRandomInt(10, 40)}px;
                left: ${i}px;
                height: ${heightBall}px;
                width: ${Math.round(476 / (550 / heightBall))}px;
            ">
        `;
        ballsN++;
    }
    for (let i = 0; i < ballsN; i++) {
        let ball = document.getElementById(`ball${i}`);
        ball.onmouseover = function () {
            ball.classList.toggle("bounce1");
            let b1 = setTimeout(function () {
                ball.classList.toggle("bounce2");
                let b2 = setTimeout(function () {
                    ball.classList.toggle("bounce3");
                    let b3 = setTimeout(function () {
                        ball.classList.toggle("bounce4");
                        let b4 = setTimeout(function () {
                            ball.classList.toggle("bounce5");
                            let b5 = setTimeout(function () {
                                ball.classList.toggle("bounce6");
                                let b5 = setTimeout(function () {
                                    ball.classList.remove("bounce6");
                                    ball.classList.remove("bounce5");
                                    ball.classList.remove("bounce4");
                                    ball.classList.remove("bounce3");
                                    ball.classList.remove("bounce2");
                                    ball.classList.remove("bounce1");
                                }, 200);
                            }, 200);
                        }, 400);
                    }, 200);
                }, 400);
            }, 200);
        };
    }
}

function showSettingPanel() {
    if (setting_panel.classList.contains("setting_panel_left")) {
        setting_panel.classList.remove("setting_panel_left");
        setting_panel.classList.toggle("setting_panel_right");
    } else {
        setting_panel.classList.remove("setting_panel_right");
        setting_panel.classList.toggle("setting_panel_left");
    }
}

function openSettingPanel() {
    showSettingPanel();

    return false;
}

createFlakes();
let timer = setInterval(function () {
    drawFlakes();
    moveFlakes();
}, 50);

createBalls();