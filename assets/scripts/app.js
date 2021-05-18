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

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if(attributes && attributes.length > 0) { // attributes.length - array length
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }  
}
//inheritence only from one class
class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value; //overwrite existing array with new one
    this.totalOutput.innerHTML = `<h2> Total: \$${this.totalAmount.toFixed(2)} </h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, curItem) => prevValue + curItem.price, 0);
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];       
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }   

  render() {
    //const cartEl =document.createElement('section');
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2> Total": \$${0} </h2>
      <button> Order Now!</button>
    `;
    //cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2'); //totalOutput new property created    
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart(){
    App.addProductToCart(this.product);
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

    this.cart = new ShoppingCart('app'); //saving into property
    this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();
    
    renderHook.append(prodListEl);//append some content
  }
}

class App {
  static cart; //static property

  static init() {
    const shop = new Shop();    
    shop.render(); 
    this.cart = shop.cart;   
  }

  static addProductToCart(product) {
    this.cart.addProduct(product)
  }
}

App.init();