



const getdetails =async()=>{
   const params = new URLSearchParams(window.location.search);
   const category = params.get('category');
    const{data} =await axios.get(`https://dummyjson.com/products/category/${category}`) ; 
    return data;

}

const displaydetails =async()=>{
    const details = await getdetails() ; 
   
    const result = details.products.map(function(category){
        return`
        <div class="items">
        <img src="${category.thumbnail}" alt="">
        <h2>${category.title}</h2>
        </div>
        `
    }).join(' ');
    document.querySelector(".details .row").innerHTML = result ; 
}
displaydetails() ;