function Item({ item, onUpdateItem, onDeleteItem }) {
  //Add function to handle button click
  function handleAddToCartClick() {
    // Call onUpdateItem, passing the data returned from the fetch request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          console.log("failed to update item")
        }
      })
      .then(updatedItem => onUpdateItem(updatedItem))
      .catch(err => console.log(err))
  }
  // ... rest of component

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
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
      .catch(err => console.log(err))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button 
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
        >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove"onClick={handleDeleteClick} >Delete</button>
    </li>
  );
}

export default Item;
