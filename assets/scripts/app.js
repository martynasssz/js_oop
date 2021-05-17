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

class ShoppingCart {
  items = [];

  render() {
    const cartEl =document.createElement('section');
    cartEl.innerHTML = `
      <h2> Total": \$${0} </h2>
      <button> Order Now!</button>
    `;
    cartEl.className = 'cart';
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart(){
    console.log('Adding product to cart...');
    console.log(this.product);

  }

  //logic of rending single product in product item
  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
      <div>
        <img src="${this.product.imageUrl}" alt="${this.product.title}" >
        <div class="product-item__content">
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
    `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));

    return prodEl;
  }
}

class ProductList {
  products = [
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
  ];

  constructor() {}

  render() {
    
    const prodList = document.createElement('ul');
    prodList.className = 'product-list'; // add class to prodList
    //logic for render single product 
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);   //to go throught the product list
      const prodEl = productItem.render(); //render return new object
      prodList.append(prodEl);
    } 
    return prodList; 
  }
};

class Shop {
  render() {
    const renderHook = document.getElementById('app'); //render in app (which is inside divs)

    const cart = new ShoppingCart();
    const cartEl = cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);//append some content
    renderHook.append(prodListEl);//append some content
  }
}

const shop = new Shop();
shop.render();