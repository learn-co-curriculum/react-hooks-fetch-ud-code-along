function Item({ item, onUpdateItem, onDeleteItem }) {

  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify({isInCart: !item.isInCart})
    })
    .then(resp => {
      if (resp.ok) {
        return resp.json()
      } else {
        console.log("failed to update item")
      }
    })
    .then(updatedItem => onUpdateItem(updatedItem))
    .catch(error => console.log(error))
  }

  function handleDeleteClick(){
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
    .then(response => {
      if(response.ok){
        return response.json()
      } else {
        console.log("failed to delete item")
      }
    })
    .then(()=> onDeleteItem(item))
    .catch(error => console.log(error))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
        className={item.isInCart ? "remove" : "add"} 
        onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button 
        className="remove" 
        onClick={handleDeleteClick}>
          Delete
      </button>
    </li>
  );
}

export default Item;
