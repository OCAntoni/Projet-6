const gallery = document.querySelector(".gallery");
console.log(gallery);
gallery = fetch("http://localhost:5678/api/works").then(res => res.json());
console.log(gallery);