let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  const toyCollection = document.getElementById('toy-collection');
  const likes = [];

  function getToys() {
    fetch('http://localhost:3000/toys')
      .then(response => response.json())
      .then(toys => toys.forEach(toy => {
        const card = document.createElement('div');
        card.className = 'card';
        const h2 = document.createElement('h2');
        const img = document.createElement('img');
        img.className = 'toy-avatar';
        const p = document.createElement('p');
        const button = document.createElement('button');
        button.className = 'like-btn';
        button.id = toy.id
        button.innerText = 'Like ❤️';
        likes.push({
          likes: toy.likes
        })

        button.addEventListener('click', (e) => {
          likes[e.target.id - 1].likes += 1;
          fetch(`http://localhost:3000/toys/${e.target.id}`, {
            method: 'PATCH',
            headers:
            {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              likes: likes[e.target.id - 1].likes
            })
          })

        })

        card.append(h2, img, p, button);
        h2.innerText = toy.name;
        img.src = toy.image;
        p.innerText = toy.likes;
        // button[`${toy.id}`];

        toyCollection.append(card);
      }))
  }

  getToys()


  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const newName = e.target['name'].value;
    const newImage = e.target['image'].value;


    const newToy = {
      name: newName,
      image: newImage,
      likes: 0
    }

    addNewToy(newToy);
  })


  function addNewToy(newToy) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newToy)
    })
  }



});
