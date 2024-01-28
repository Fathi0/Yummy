
// todo-------------------------------------------------------------------------------------
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let ageInput = document.getElementById("ageInput");
let passwordInput = document.getElementById("passwordInput");
let repasswordInput = document.getElementById("repasswordInput");
let search = document.getElementById('searchContainer');
let contact = document.getElementById('rowData');
let submitBtn = document.getElementById('submitBtn');
let searchMealName = document.getElementById('MealByName');
let searchMealLetter = document.getElementById('MealByLetter');
let nameAlert = document.getElementById("nameAlert");
let emailAlert = document.getElementById("emailAlert");
let phoneAlert = document.getElementById("phoneAlert");
let ageAlert = document.getElementById("ageAlert");
let passwordAlert = document.getElementById("passwordAlert");
let repasswordAlert = document.getElementById("repasswordAlert");
// todo-------------------------------------------------------------------------------------
//? loading screen
$(document).ready(() => {
    getMeals().then(() => {
        $(".loading-screen").fadeOut(500)
    })
});
// ?----------------------------------------------------------------------------------------------
// close and open nav
$("#Close").click(function () {
    if ($("#sideNav").css("left") == "0px") {
        let navWidth = $("#navItems").outerWidth()
        $("#sideNav").animate({
            left: -navWidth
        }, 700)

        $(".open-close-icon").addClass("fa-align-justify");
        $(".open-close-icon").removeClass("fa-x");


        $(".items li").animate({
            top: 300
        }, 1000)
    }
    else {
        $("#sideNav").animate({
            left: 0
        }, 700)

        $("#Close").removeClass("fa-align-justify");
        $("#Close").addClass("fa-x");
        for (let i = 0; i < 5; i++) {
            $(".items li").eq(i).animate({
                top: 0
            }, i * 300)
        }
    }
});
// !----------------------------------------------------------------------------------------------
// for enter to catg
$("#categories").click(function () {
    document.getElementById('searchByName').innerHTML = '';
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');
    document.getElementById('ingrediant').classList.add('d-none');
    getCategory();
});
// for enter to area
$("#area").click( function () {
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');
    document.getElementById('ingrediant').classList.add('d-none');


    getArea()
});
// for enter to ingredinet
$("#ingredient").click( function () {
    document.getElementById('searchByName').innerHTML = '';
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');
    document.getElementById('ingrediant').classList.add('d-none');
    getIngredients();
});
// ?  serach by name and home screen
async function getMeals(name = '') {
    $(".inner-loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let data = await request.json();
    displayMeals(data.meals);
    $(".inner-loading-screen").fadeOut(300);

}
async function getMealFirstLatter(mealLetter="a") {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    $(".loading-screen").fadeOut(500);

    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}`);
    let data = await request.json();
    data.meals ? displayMeals(data.meals) : displayMeals([]);
    $(".loading-screen").fadeOut(300);

}
function displayMeals(data) {
    let temp = '';
    data.forEach(e => {
        temp += `   <div class="col-md-3 "  >
                         <div class="position-relative maindiv mealmain  overflow-hidden rounded" meal-id=${e.idMeal}>
                                 <img src="${(e.strMealThumb == null) ? 'images/banner.png' : e.strMealThumb}" class="w-100" meal-id=${e.idMeal}  alt="">
                            <div class="layer details position-absolute d-flex align-items-center" meal-id=${e.idMeal} >
                                  <h5 meal-id=${e.idMeal} class="text-black fs-3" >${e.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('searchByName').innerHTML = temp;

    document.querySelectorAll('.details').forEach(element => {
        element.addEventListener('click', function (e) {
            let id = e.target.getAttribute('meal-id');
            getDetails(id)
        });
    });
}
// !-----------------------------------------------------------------------------


//? ditalis
async function getDetails(id) {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    let data = await request.json();
    displayDetails(data.meals)
    $(".loading-screen").fadeOut(300);
}
function displayDetails(dataid) {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').classList.remove('d-none')
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');




    let temp = "";
    dataid.forEach(e => {
        temp += `<div class="col-md-4" >
        <img src="${e.strMealThumb}" class="w-100 rounded" alt="">
        <h2 class="mt-1">${e.strMeal}</h2>
       </div >
       <div class="col-md-8">
        <h2>instrection</h2>
        <p>${e.strInstructions}</p>

        <h3>Area : <span class="fs-4">${e.strArea}</span></h3>
        <h3> Category : <span class="fs-4">${e.strCategory}</span></h3>
        <h3>Recipes : <span class=" fs-4"></span></h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">`;

        for (let i = 1; i <= 20; i++) {
            const ingredient = e[`strIngredient${i}`];
            const measure = e[`strMeasure${i}`];
            if (ingredient && measure) {
                temp += `<li class="alert alert-info m-2 p-1" > ${measure} ${ingredient}</li > `;
            }
        }


        temp += `
        </ul >
        <h3>Tags :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">

            <li class="alert alert-danger m-2 p-1">${(e.strTags == null) ? '' : e.strTags}</li>
        </ul>
        <a target="_blank" href="${e.strSource}"
            class="btn btn-success">Source</a>
        <a target="_blank" href="${e.strYoutube}" class="btn btn-danger">Youtube</a>
       </div > ` ;
    });
    document.getElementById('ingrediant').innerHTML = temp;

}
// !-------------------------------------------------------------------------------


//?  catgoris
async function getMealCategory(categorys) {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorys}`);
    let data = await request.json();
    displaycategores(data.meals);
    $(".loading-screen").fadeOut(300);
}
function displaycategores(data) {
    let temp = '';
    data.forEach(e => {
        temp += `   <div class="col-md-3 "  >
                         <div class="position-relative maindiv mealmain  overflow-hidden rounded" meal-id=${e.idMeal}>
                                 <img src="${(e.strMealThumb == null) ? 'images/banner.png' : e.strMealThumb}" class="w-100" meal-id=${e.idMeal}  alt="">
                            <div class="layer details position-absolute d-flex align-items-center" meal-id=${e.idMeal} >
                                  <h5 meal-id=${e.idMeal} class="text-black fs-3" >${e.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('searchByName').innerHTML = temp;

    document.querySelectorAll('.details').forEach(element => {
        element.addEventListener('click', function (e) {
            let id = e.target.getAttribute('meal-id');
            getDetails(id)
        });
    });



}
async function getCategory() {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await request.json();
    displaycategory(data.categories);
    $(".loading-screen").fadeOut(300);

}
function displaycategory(data) {
    let temp = '';
    data.forEach(e => {
        temp += `   <div class="col-md-3">
        <div  categorymeal=${e.strCategory} class="position-relative maindiv category overflow-hidden rounded">
            <img src="${(e.strCategoryThumb == null) ? 'images/banner.png' : e.strCategoryThumb}" class="w-100" categorymeal=${e.strCategory} alt="">
            <div class="layer position-absolute pt-2 d-flex flex-column text-black text-center" categorymeal=${e.strCategory}>
                <h5 categorymeal=${e.strCategory} class=" fs-3">${e.strCategory}</h5>
                <p  categorymeal=${e.strCategory}>${(e.strCategoryDescription == null) ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus animi eveniet deserunt eaque tenetur, voluptatibus neque vel debitis eos explicabo!' : e.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>`;

    });

    document.getElementById('searchByName').innerHTML = temp;


    document.querySelectorAll('.category').forEach(element => {
        element.addEventListener('click', function (e) {
            let categorymeal = e.target.getAttribute('categorymeal');
            getMealCategory(categorymeal)
        });
    });
}
// !-------------------------------------------------------------------------------
//? area
async function getArea() {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await request.json();
    displayArea(data.meals);
    $(".loading-screen").fadeOut(300);

}
function displayArea(data) {
    let temp = '';
    data.forEach(e => {
        temp += ` <div class="col-md-3 ">
        <div areameal=${e.strArea} class= " area  d-flex flex-column justify-content-center align-items-center" >
        <i areameal=${e.strArea} class="fa-solid fa-house-laptop fa-4x"></i>
        <h5 areameal=${e.strArea} class="text-white fs-3">${e.strArea}</h5>
        </div >
    </div > `;

    });

    document.getElementById('searchByName').innerHTML = temp;

    document.querySelectorAll('.area').forEach(element => {
        element.addEventListener('click', function (e) {
            let areameal = e.target.getAttribute('areameal');
            getaryas(areameal)
        });
    });
}
async function getaryas(mealarea) {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealarea}`);
    let data = await request.json();
    displayAreas(data.meals);
    $(".loading-screen").fadeOut(300);
}
function displayAreas(data) {
    let temp = '';
    data.forEach(e => {
        temp += `   <div class="col-md-3 "  >
                         <div class="position-relative maindiv mealmain  overflow-hidden rounded" meal-id=${e.idMeal}>
                                 <img src="${(e.strMealThumb == null) ? 'images/banner.png' : e.strMealThumb}" class="w-100" meal-id=${e.idMeal}  alt="">
                            <div class="layer details position-absolute d-flex align-items-center" meal-id=${e.idMeal} >
                                  <h5 meal-id=${e.idMeal} class="text-black fs-3" >${e.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('searchByName').innerHTML = temp;

    document.querySelectorAll('.details').forEach(element => {
        element.addEventListener('click', function (e) {
            let id = e.target.getAttribute('meal-id');
            getDetails(id)
        });
    });



}
// !-------------------------------------------------------------------------------
//? ingrdiants
async function getIngredients() {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await request.json();
    displayIngredients(data.meals.slice(0, 20));
    $(".loading-screen").fadeOut(300);

}
function displayIngredients(data) {
    let temp = '';
    data.forEach(e => {
        temp += ` <div class="col-md-3">
        <div ingredientmeal=${e.strIngredient} class=" ingredient d-flex flex-column text-white justify-content-center align-items-center">
        <i ingredientmeal=${e.strIngredient} class="fa-solid fa-drumstick-bite fa-4x"></i>
       <h4 ingredientmeal=${e.strIngredient} class=" fs-3">${e.strIngredient}</h4>
       <p ingredientmeal=${e.strIngredient} class="text-center">${(e.strDescription == null) ? 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus animi eveniet deserunt eaque tenetur, voluptatibus neque vel debitis eos explicabo!' : e.strDescription.split(" ").slice(0, 20).join(" ")}

       </p>
        </div>
    </div>`;


    });

    document.getElementById('searchByName').innerHTML = temp;



    document.querySelectorAll('.ingredient').forEach(element => {
        element.addEventListener('click', function (e) {
            let ingredientmeal = e.target.getAttribute('ingredientmeal');
            getIngredient(ingredientmeal)
        });
    });


}
async function getIngredient(ingredient) {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    $(".loading-screen").fadeIn(300);
    let request = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    let data = await request.json();
    displayMealIngredient(data.meals);
    $(".loading-screen").fadeOut(300);

}
function displayMealIngredient(data) {
    let temp = '';
    data.forEach(e => {
        temp += `   <div class="col-md-3 "  >
                         <div class="position-relative maindiv mealmain  overflow-hidden rounded" meal-id=${e.idMeal}>
                                 <img src="${(e.strMealThumb == null) ? 'images/banner.png' : e.strMealThumb}" class="w-100" meal-id=${e.idMeal}  alt="">
                            <div class="layer details position-absolute d-flex align-items-center" meal-id=${e.idMeal} >
                                  <h5 meal-id=${e.idMeal} class="text-black fs-3" >${e.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
    });

    document.getElementById('searchByName').innerHTML = temp;

    document.querySelectorAll('.details').forEach(element => {
        element.addEventListener('click', function (e) {
            let id = e.target.getAttribute('meal-id');
            getDetails(id)
        });
    });



}
// !-------------------------------------------------------------------------------
//? to display to inputs
function displaysearchInput() {
    search.classList.remove('d-none');
    search.classList.add('d-block');
    contact.classList.remove('d-block');
    contact.classList.add('d-none');
    document.getElementById('ingrediant').classList.add('d-none');


    document.getElementById('searchByName').innerHTML = '';


    searchMealName.addEventListener('keyup', function () {
        getMeals(searchMealName.value);

    });
    searchMealLetter.addEventListener('keyup', function () {


        getMealFirstLatter(searchMealLetter.value);


    });
}
//! contant
function displayContact() {
    document.getElementById('searchByName').innerHTML = '';
    document.getElementById('ingrediant').innerHTML = '';
    search.classList.remove('d-block');
    search.classList.add('d-none');
    contact.classList.add('d-block');
    contact.classList.remove('d-none');
    document.getElementById('ingrediant').classList.add('d-none');


}
// todo--------------------validation--------------------------------------
function inputsValidation() {
    if (validationNameInput() == true &&
        validationEmailInput() == true &&
        validationPhoneInput() == true &&
        validationAgeInput() == true &&
        validationPasswordInput() == true &&
        validationRepasswordInput() == true) {

        submitBtn.removeAttribute("disabled")
    }
    else {
        submitBtn.setAttribute("disabled", true)
    }
}

function validationNameInput() {
    if ((/^[a-zA-Z ]+$/.test(nameInput.value)) == true) {
        nameAlert.classList.remove("d-block");
        nameAlert.classList.add("d-none");


        return true;
    }
    else {

        nameAlert.classList.remove("d-block");
        nameAlert.classList.add("d-none");

        return false;

    }
}

function validationEmailInput() {
    if ((/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value)) == true) {
        emailAlert.classList.remove("d-block");
        emailAlert.classList.add("d-none");

        return true;
    }
    else {
        emailAlert.classList.add("d-block");
        emailAlert.classList.remove("d-none");


        return false;

    }
}

function validationPhoneInput() {
    if ((/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneInput.value)) == true) {
        phoneAlert.classList.remove("d-block");
        phoneAlert.classList.add("d-none");


        return true;
    }
    else {
        phoneAlert.classList.add("d-block");
        phoneAlert.classList.remove("d-none");


        return false;

    }
}

function validationAgeInput() {
    if ((/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(ageInput.value))) {
        ageAlert.classList.remove("d-block");
        ageAlert.classList.add("d-none");

        return true;
    }
    else {
        ageAlert.classList.add("d-block");
        ageAlert.classList.remove("d-none");


        return false;

    }
}

function validationPasswordInput() {
    if ((/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(passwordInput.value)) == true) {
        passwordAlert.classList.remove("d-block");
        passwordAlert.classList.add("d-none");

        return true;
    }
    else {
        passwordAlert.classList.add("d-block");
        passwordAlert.classList.remove("d-none");


        return false;

    }
}

function validationRepasswordInput() {

    if (repasswordInput.value == passwordInput.value) {
        repasswordAlert.classList.remove("d-block");
        repasswordAlert.classList.add("d-none");

        return true
    }
    else {
        repasswordAlert.classList.add("d-block");
        repasswordAlert.classList.remove("d-none");
        return false;

    }
}
