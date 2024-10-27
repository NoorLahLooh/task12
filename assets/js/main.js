
const getcategories = async () => {

    const { data } = await axios.get(`https://dummyjson.com/products/category-list`);
    return data;
}


const displaycategories = async () => {

const loader = document.querySelector(".load-container");
loader.classList.add("active") ; 
try{
    const categories = await getcategories();
    const result = categories.map(function (category) {
        return `
        <div class="category">
        <h2>${category}</h2>
        <a href="categorydetails.html?category=${category}">more details</a>
        </div>
        `
    }).join(' ');
    document.querySelector(".categories .row").innerHTML = result;
    
}catch(error){
document.querySelector(".categories .row").innerHTML = "<p>error loading categories</p>" ; 
}
finally{
    loader.classList.remove("active") ; 
}


}

const getproducts = async (page) => {
    const skip = (page-1)*20 ; 
    const { data } = await axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    return data;

}
const displayproducts = async (page=1) => {
    
const loader = document.querySelector(".load-container");
loader.classList.add("active") ; 
try{
    
 const data = await getproducts(page);
 const Numberofpages = (data.total)/20 ; 
const result = data.products.map(function (product) {
        return `
            <div class="product">
                    <img src="${product.thumbnail}" alt="" class="images">
                    <h2>${product.title}</h2>
                </div>`
    }).join(' ');
    document.querySelector(".products .row").innerHTML = result;
    let paginationlinks = ' ' ; 
    if(page == 1){
         paginationlinks +=  `<li class="page-item"><button class="page-link" >&laquo;</button></li>` ;
    }
         else{
         paginationlinks += `<li class="page-item"><button onclick=displayproducts('${page-1}') class="page-link" >&laquo;</button></li>` ;
    }
  
    for(let i=1 ; i<=Numberofpages ; i++){
        paginationlinks += `<li class="page-item ${i==page?'active':' '}"><button onclick=displayproducts('${i}') class="page-link" >${i}</button></li>` ; 
    }
    if(page == Numberofpages){
        paginationlinks += `<li class="page-item"><button disabled class="page-link" >&raquo;</button></li>`;
    }
    else{
       paginationlinks += ` <li class="page-item"><button onclick=displayproducts('${page+1}') class="page-link" >&raquo;</button></li>`;
    }

document.querySelector(".pagination").innerHTML = paginationlinks ; 
Modal() ; 
}

catch(error){
    document.querySelector(".products .row").innerHTML = "<p>error loading products</p>" ;
}
finally{
    loader.classList.remove("active") ;
}
}

displayproducts();
displaycategories();

window.onscroll = function () {
    const navbar = document.querySelector(".header");
    const products = document.querySelector(".products");
    console.log(products.offsetTop);
    if (window.scrollY > products.offsetTop) {
        navbar.classList.add("scrollnavbar");

    }
    else {
        navbar.classList.remove("scrollnavbar");
    }


}
const countdown = () => {
    const countdowndate = new Date("2025-03-02T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = countdowndate - now;
    console.log(countdowndate);
    const days = Math.floor(distance / 86400000);
    const hours = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / 60000);
    const second = Math.floor((distance % (1000 * 60)) / 1000);
    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes;
    document.querySelector("#second").textContent = second;
}
setInterval(() => {
    countdown();
}
    , 1000
)

function Modal(){
    const modal = document.querySelector(".my-modal") ; 
const close = document.querySelector(".close") ;
const leftbtn = document.querySelector(".left-btn") ;
const rightbtn = document.querySelector(".right-btn") ;
const images = Array.from(document.querySelectorAll(".images")) ;
console.log(modal , leftbtn , rightbtn , images , close) ;
let currentindex = 0 ; 
    images.forEach(function(img){
        img.addEventListener("click",function(e){
            modal.classList.remove('d-none') ;
            modal.querySelector("img").setAttribute("src" , e.target.src);
            const currentimage = e.target ; 
            const currentindex = images.indexOf(currentimage) ; 
            
            
        })
       
       })
       close.addEventListener("click",function(){
        modal.classList.add('d-none') ;
        })
        rightbtn.addEventListener("click",function(){
            currentindex++ ;
            if(currentindex >= images.length) {
                currentindex=0 ; 
            }
           const src= images[currentindex].src ; 
           modal.querySelector("img").setAttribute("src",src) ; 
        })
        leftbtn.addEventListener("click", function(){
            if(currentindex<0){
                currentindex = images.length - 1 ; 
            }
            currentindex-- ; 
            const src = images[currentindex].src ; 
            modal.querySelector("img").setAttribute("src",src) ; 
        })

    }













