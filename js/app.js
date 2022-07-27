function getRandom  (min, max) {
    return Math.floor(Math.random()* (max -min))+min
}


document.addEventListener("DOMContentLoaded", ()=>{
    const ramdon =  getRandom(1, 151)
    fetchData(ramdon)
    
})



const fetchData = async(id)=>{
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            esperienciea:data.base_experience,
            ataque: data.stats[1].base_stat,
            especial: data.stats[2].base_stat,
            defensa: data.stats[3].base_stat,
            
        }
        
        pintarCard(pokemon)
    }catch(error){
        console.log(error)
    }
}


const pintarCard = (pokemon)=> {
    console.log(pokemon)

    const flex = document.querySelector(".flex")
    const template = document.querySelector("#template-card").content
    const clone= template.cloneNode(true)
    const fragment= document.createDocumentFragment()

    //buscando en el obejto consegui el sitio exacto de las imagenes
    clone.querySelector(".card-body-img").setAttribute("src", pokemon.img)//
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`
    clone.querySelector(".card-body-text").innerHTML= pokemon.esperienciea + " Exp"
    clone.querySelectorAll(".card-footer-social h3")[0].textContent =pokemon.ataque 
    clone.querySelectorAll(".card-footer-social h3")[1].textContent =pokemon.especial
    clone.querySelectorAll(".card-footer-social h3")[2].textContent =pokemon.defensa

    fragment.appendChild(clone)
    flex.appendChild(fragment)


}