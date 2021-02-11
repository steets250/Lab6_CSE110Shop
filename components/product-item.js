// product-item.js

class ProductItem extends HTMLElement {
    constructor(productData) {
        super();

        const shadow = this.attachShadow({mode: 'open'});

        const product = document.createElement('li');
        product.setAttribute('class', 'product');

        const image = document.createElement('img');
        image.setAttribute('src', productData.image);
        image.setAttribute('alt', productData.title);
        image.setAttribute('width', 200);

        const title = document.createElement('p');
        title.setAttribute('class', 'title');
        title.textContent = productData.title;

        const price = document.createElement('p');
        price.setAttribute('class', 'price');
        title.textContent = '$' + productData.price;

        const button = document.createElement('b');
        button.onclick = () => {
            const cartCount = document.getElementById('cart-count');

            if (button.textContent === 'Add to Cart') {
                button.textContent = 'Remove from Cart';
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
                localStorage.setItem(productData.id, 'true');
                alert('Added to Cart!');
            } else {
                button.textContent = 'Add to Cart';
                cartCount.textContent = parseInt(cartCount.textContent) - 1;
                localStorage.removeItem(productData.id);
                alert('Removed from Cart!');
            }
        };
        if (localStorage.getItem(productData.id)) {
            button.textContent = 'Remove from Cart';
        } else {
            button.textContent = 'Add to Cart';
        }
    
        const style = document.createElement('style');
        style.textContent = `
            .price {
                color: green;
                font-size: 1.8em;
                font-weight: bold;
                margin: 0;
            }
            
            .product {
                align-items: center;
                background-color: white;
                border-radius: 5px;
                display: grid;
                grid-template-areas: 
                'image'
                'title'
                'price'
                'add';
                grid-template-rows: 67% 11% 11% 11%;
                height: 450px;
                filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
                margin: 0 30px 30px 0;
                padding: 10px 20px;
                width: 200px;
            }
            
            .product > button {
                background-color: rgb(255, 208, 0);
                border: none;
                border-radius: 5px;
                color: black;
                justify-self: center;
                max-height: 35px;
                padding: 8px 20px;
                transition: 0.1s ease all;
            }
            
            .product > button:hover {
                background-color: rgb(255, 166, 0);
                cursor: pointer;
                transition: 0.1s ease all;
            }
            
            .product > img {
                align-self: center;
                justify-self: center;
                width: 100%;
            }
            
            .title {
                font-size: 1.1em;
                margin: 0;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            
            .title:hover {
                font-size: 1.1em;
                margin: 0;
                white-space: wrap;
                overflow: auto;
                text-overflow: unset;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(product);
        product.appendChild(image);
        product.appendChild(title);
        product.appendChild(price);
        product.appendChild(button);
      }
}

customElements.define('product-item', ProductItem);