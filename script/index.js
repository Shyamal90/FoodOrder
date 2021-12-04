
    let Navbar = `<div class="searchBox">
                    <input type="text"  id="searchItems" placeholder="Search  ex..Chicken Biriyani">
                </div>

                <div class="pageSection">
                    <ul>
                        <li> <a href="searchFood.html">Home</a></li>
                        <li> <a href="randomFood.html">Random Food</a></li>
                        <li> <a href="latestFood.html">Latest Food</a></li>
                    </ul>
                </div>`

    // import navbar in id navbar
    document.querySelector("#navbar").innerHTML = Navbar;

     
    

    // fetch data from search box
    let searchBox = document.querySelector("#searchItems");
    searchBox.addEventListener("keyup",function(){
    // console.log(searchBox.value);
    searchResult(searchBox.value)
    });


    // fetch data from API
    async function searchResult(item_name){
    // console.log(item_name);

    try{
        if(!item_name){
            document.querySelector(".searchResult").innerHTML = "";
            document.querySelector(".searchResult").style.display = "none";
            // return;
        }else{
            // document.querySelector(".searchResult").innerHTML = "";
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item_name}`);
            let data     = await response.json();
            document.querySelector(".searchResult").style.display = "block";
            // console.log(data.meals);
            showData(data.meals);
        }
    
    }catch(error){
        console.log(error);
      }
    }

    // show search result in div

    function showData(foodArr){
        console.log(foodArr);
        document.querySelector(".searchResult").innerHTML = "";

        foodArr.map((food)=>{
        let div = document.createElement("div");
        div.setAttribute("class","food_wrapper");

        let mealName = document.createElement("h5");
        mealName.setAttribute("class","mealName");
        mealName.innerHTML = food.strMeal;

        div.append(mealName);

        div.onclick = () =>{
            
            showDetails(food);
            document.querySelector(".searchResult").style.display = "none";
            // window.location.href = "searchFood.html";
        }

        // let foodItems = foodArr.strMeal
        document.querySelector(".searchResult").append(div);
        })

    }
    

    const showDetails = (mealName) =>{
        
        console.log(mealName);
        let price = Math.random() * 100;
        price = price.toFixed(2);

        obj = {
            image : mealName.strMealThumb,
            name  : mealName.strMeal,
            catagory: mealName.strCategory,
            price:price
        } 

        localStorage.setItem("foodDetails",JSON.stringify(obj));
        let getItem = JSON.parse(localStorage.getItem("foodDetails"));
        
        showFoodDetails(getItem);
    }

    function showFoodDetails(getItem){
        document.querySelector(".food_image--container").innerHTML = "";
        document.querySelector(".food_details--container").innerHTML = "";
        

        let img = document.createElement("img");
        img.src = getItem.image;

        let name = document.createElement("h3");
        name.innerHTML = getItem.name;

        let price = document.createElement("p");
        price.innerHTML = "Rs. " + getItem.price;

        let catagory = document.createElement("p");
        catagory.innerHTML = "Catagory: " + getItem.catagory;

        document.querySelector(".food_image--container").append(img);
        document.querySelector(".food_details--container").append(name,price,catagory);
    }


    

