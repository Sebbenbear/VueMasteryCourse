var app = new Vue({
    el: '#app', //element property, attach to element with id "app"
    data: {
        brand: 'Vue Mastery',
        product: "Socks",
        altText: 'a pair of socks',
        imageLink: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
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
        }
    }
})
