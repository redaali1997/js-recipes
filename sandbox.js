const list = document.querySelector('ul');
const form = document.querySelector('form');


//Get Data
db.collection('recipes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            list.innerHTML += `
            <li data-id="${change.doc.id}">
                <div class="row my-2">
                    <div class="col-6">${change.doc.data().title}</div>
                    <div class="col-6">
                        <button class="btn btn-danger btn-sm">Delete</button>
                    </div>
                </div>
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