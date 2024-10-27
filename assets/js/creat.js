const creatproduct = document.querySelector(".creatproduct");
creatproduct.onsubmit = async()=>{
    const title = document.querySelector(".title").value ;
    const description  = document.querySelector(",description").value ; 
    const {data} = await axios.post('https://dummyjson.com/products/add',{
        title:title , description:description
    });
console.log(data) ; 
}