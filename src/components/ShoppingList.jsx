import { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then(r => {
        if (r.ok) {
          return r.json()
        } else {
          console.log("fetch request failed")
        }
      })
      .then(items => setItems(items))
      .catch(error => console.log(error))
  }, []);

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
}

export default ShoppingList;
