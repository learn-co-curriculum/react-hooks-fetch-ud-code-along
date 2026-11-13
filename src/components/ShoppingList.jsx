import { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

// Destructure the onUpdateItem prop
function Item({ item, onUpdateItem }) {
  function handleAddToCartClick() {
    // Call onUpdateItem, passing the data returned from the fetch request
    fetch(`http://localhost:4000/items${item.id}`, {
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
      .catch(error => console.log(error))
  }
  // ... rest of component

  // src/components/ShoppingList.js

function handleUpdateItem(updatedItem) {
  const updatedItems = items.map(item => {
    if (item.id === updatedItem.id) {
      return updatedItem;
    } else {
      return item;
    }
  });
  setItems(updatedItems);
}
}

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* pass it as a prop to Item */}
        {itemsToDisplay.map(item => (
          <Item key={item.id} item={item} onUpdateItem={handleUpdateItem} />
        ))}
      </ul>
    </div>
  );
