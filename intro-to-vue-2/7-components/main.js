



Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
});


Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
<div class="product">
  <div class="product-image">
    <img v-bind:src="image" :alt="altText">
</div>

<div class="product-info">
  <h1>{{ title }}</h1>

  <p v-if="inStock">In stock</p>
  
  <p :class=" { outOfStock: !inStock }" v-else >Out of stock</p>
  <p>Shipping for premium members: {{ shipping }}</p>

  <p v-show="onSale">{{ onSale }}</p>

  <product-details :details="details"></product-details>

  <p>Colours Available</p>

  <!-- No : before class since it's not computed and doesn't need binding-->
  <div v-for="(variant, index) in variants"
    :key="variant.variantId"
    class="color-box" 
    :style="{ backgroundColor: variant.variantColour }"
    @mouseover="updateProduct(index)">
  </div>
  
  <button
    v-on:click="addToCart" 
    :disabled="!inStock"
    :class="{ disabledButton: !inStock } "><!-- : before class since it's computed and needs binding-->
      Add to cart
  </button> 
  <button @click="removeFromCart">Remove from cart</button>

  <div class="cart">
    <p>Cart ({{cart}})</p>
  </div>
  
</div>

<p>{{ description }}</p>
</div>
  `,
  data() { // different to a view instance, in that data returns a function, not an object.
    return { // this is so each component can have it's own unique data. use props to pass data to components.
      brand: 'Vue Mastery',
      product: "Socks",
      altText: "socks are nice",
      description: "These are beautiful socks.",
      details: ["80% cotton", "20% polyester", "gender-neutral"],
      inventory: 40,
      selectedVariant: 0,
      variants: [
        {
          variantId: 2234,
          variantColour: "green",
          variantImage: './assets/vmSocks-green-onWhite.jpg',
          variantQuantity: 10,
          isOnSale: true
        },
        {
          variantId: 2235,
          variantColour: "blue",
          variantImage: './assets/vmSocks-blue-onWhite.png',
          variantQuantity: 0,
          isOnSale: false
        }
      ],
      cart: 0
    }
  },
  methods: {
    addToCart: function (e) {
      this.cart += 1
      console.log(e)
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
      console.log(this.selectedVariant)
    },
    updateProductes6 (replacementImage) {
      console.log(replacementImage)
    },
    removeFromCart() {
      if(this.cart > 0) {
          this.cart -= 1
      }
    }
  },
  computed: { // Vue instance updates this whenever the dependant properties change
      // computed properties are cached until the properties are updated.
      // It's more efficient to run a computed property than a method.
    title() {
        return this.brand + ' ' + this.product;
    },
    image() {
        return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
        return this.variants[this.selectedVariant].variantQuantity;
    },
    onSale() {
        const { isOnSale, variantColour } = this.variants[this.selectedVariant];
        if (isOnSale) {
            return `${this.brand} ${this.product} (${variantColour})` + ' are on sale!'
        }
        return '';
    },
    shipping() {
      if (this.premium) {
        return 'free!'
      } else {
        return '$2.99'
      }
    } 
  }
});

var app = new Vue({
    el: '#app',
    data: {
      premium: true
    }
})
