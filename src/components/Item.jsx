
// Deconstruct the onDeleteItem prop
function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleDeleteClick() {
    // Call onDeleteItem, passing the deleted item
    fetch(`http://localhost:4000/items${item.id}`, {
      method: "DELETE",
    })
      .then(r => {
      if (r.ok) {
        return r.json()
      } else {
        console.log("failed to delete item")
      }
    })
    .then(() => onDeleteItem(item))
    .catch(error => console.log(error)) 
  }
  // ... rest of component
}

function handleDeleteItem(deletedItem) {
  const updatedItems = items.filter(item => item.id !== deletedItem.id);
  setItems(updatedItems);
}