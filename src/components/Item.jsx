function Item({ item, onUpdateItem, onDeleteItem }) {
  // Add function to handle button click
  function handleAddToCartClick() {
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isInCart: !item.isInCart,
    }),
  })
    .then((r) => {
      if (r.ok) {
        return r.json();
      } else {
        console.log("failed to update item");
      }
    })
    .then((updatedItem) => onUpdateItem(updatedItem))
    .catch((error) => console.log(error));
}

  function handleDeleteClick() {
  console.log(`DELETE: /items/${item.id}`);
  fetch(`http://localhost:4000/items/${item.id}`, {
    method: "DELETE",
  })
      .then((r) => {
        console.log("Response:", r.status, r.statusText);
        if (r.ok) {
          return r.json();
        } else {
          return r.text().then(text => {
            console.log("Server response body:", text);
            throw new Error(`Failed with ${r.status}: ${r.statusText}`);
          });
        }
      })
      .then((res) => {
        if (res && onDeleteItem) onDeleteItem(item);
      })
      .catch((error) => console.log(error));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      {/* add the onClick listener */}
      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}
export default Item;