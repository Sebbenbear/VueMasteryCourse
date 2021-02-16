

// We need two-way binding - from template to data, and data to template.
// Need to use v-model for two way binding, and v-bind for one way binding.
Vue.component('product-review', {
  template: `
    <form class="review-form" @submit.prevent="onSubmit"> <!--  @submit.prevent="onSubmit": prevent modifier stops page refreshing when we click submit -->
      
    <p v-if="errors.length">
      <b>Please correct the following errors:</b>
      
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      <ul>
    </p>

    <p>
        <label for="name">Name:</label>
        <input required id="name" v-model="name"> </input>
      </p>
      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"> </textarea>
      </p>
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating"> <!-- v-model.number typecasts this value to a number-->
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
      <p>
        <label for="recommended">Would you recommend this product?</label>
        <br/>
        <label for="yes">Yes</label>
        <input type="radio" id="yes" value="yes" v-model="recommended">
        <label for="no">No</label>
        <input type="radio" id="no" value="no" v-model="recommended">
        <br>
        </input>
      </p>

      <p>
        <input type="submit" value="Submit">
      </p>
    </form>
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      recommended: null,
      errors: []
    }
  },
  methods: {
    onSubmit() {
      this.errors = []
      if (this.name && this.review && this.rating && this.recommended) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
          recommended: this.recommended
        };
        this.$emit('review-submitted', productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
        this.recommended = null;
      }
      else {
        if (!this.name) {
          this.errors.push("Name required.");
        }
        if (!this.review) {
          this.errors.push("Review required.");
        }
        if (!this.rating) {
          this.errors.push("Rating required.");
        }
        if (!this.recommended) {
          this.errors.push("Recommendation required.");
        }
      }
    }
  }
});

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

  <div v-for="(variant, index) in variants"
    :key="variant.variantId"
    class="color-box" 
    :style="{ backgroundColor: variant.variantColour }"
    @mouseover="updateProduct(index)">
  </div>
  
    <button
      v-on:click="addToCart" 
      :disabled="!inStock"
      :class="{ disabledButton: !inStock } ">
        Add to cart
    </button> 
    <button @click="removeFromCart">Remove from cart</button>  
  </div>

  <div>
    <h2>Reviews</h2>
    <p v-if="!reviews.length">There are no reviews yet.</p>
    <ul>
      <li v-for="review in reviews">
      <p>{{ review.name }}</p>
      <p>Rating: {{ review.rating }}</p>
      <p>{{ review.review }}</p>
      <p>Recommended: {{ review.recommended }}</p>
      </li>
    </ul>
  </div>

  <product-review @review-submitted="addReview"></product-review>
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
          variantQuantity: 2,
          isOnSale: false
        }
      ],
      reviews: []
    }
  },
  methods: {
    addToCart() {
      let id = this.variants[this.selectedVariant].variantId;
      this.$emit('add-to-cart', id) // emit an event called add-to-cart. add in another parameter for the value
    },
    updateProduct: function (index) {
      this.selectedVariant = index;
      console.log(this.selectedVariant)
    },
    updateProductes6 (replacementImage) {
      console.log(replacementImage)
    },
    removeFromCart() {
      let id = this.variants[this.selectedVariant].variantId;
      this.$emit('remove-from-cart', id);
    },
    addReview(review) {
      this.reviews.push(review);
    }
  },
  computed: {
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
      premium: true,
      cart: []
    },
    methods: {
      addCart(id) {
        this.cart.push(id);
      },
      removeCart(id) {
        const index = this.cart.indexOf(id);
        if (index >= 0) {
          this.cart.splice(index, 1);
        }
      }
    }
})
