class Product {
  // title = 'DEFAULT'; //(public) class field
  // imageUrl;
  // description;
  // price;

  //method which js calls after creating new instance (object)
  constructor(title, image, desc, price) {
    this.title = title; //(public) class property
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

const productList = {
  products: [
    new Product( //new product object
      'A Pillow',
      'https://www.maxpixel.net/static/photo/2x/Soft-Pillow-Green-Decoration-Deco-Snuggle-1241878.jpg',
      'A soft pillow!',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg',
      'A carpet which you might like - or not.',
      89.99
    )
  ],
  //render list of products
  render() {
    const renderHook = document.getElementById('app'); //render in app (which is inside divs)
    const prodList = document.createElement('ul');
    prodList.className = 'product-list'; // add class to prodList
    //logic for render single product 
    for (const prod of this.products) {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
        <div>
          <img src="${prod.imageUrl}" alt="${prod.title}" >
          <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\$${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      prodList.append(prodEl);
    }
    renderHook.append(prodList);//append some content 
  }
};

productList.render();
