const list = document.querySelector('ul');
const form = document.querySelector('form');


//Get Data
db.collection('recipes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            list.innerHTML += `
            <li data-id="${change.doc.id}" class="d-flex justify-content-between align-content-center">
                <div>${change.doc.data().title}</div>
                <button class="btn btn-danger btn-sm my-2">Delete</button>
            </li>
            `
        } else if (change.type === 'removed') {
            const recipes = document.querySelectorAll('li');
            recipes.forEach(recipe => {
                if (recipe.getAttribute('data-id') === change.doc.id) {
                    recipe.remove();
                }
            });
        }
    });
});

const deleteRecipe = id => {
    console.log(id);
};

// Add Data
form.addEventListener('submit', e => {
    e.preventDefault();
    const recipe = {
        title: form.addRecipes.value,
        created_at: firebase.firestore.Timestamp.fromDate(new Date())
    };
    form.addRecipes.value = "";
    db.collection('recipes').add(recipe).then(() => {
        console.log('Recipe added.');
    })
})

// Delete Data
list.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete().then(() => console.log('recipes deleted.'));
    }
});