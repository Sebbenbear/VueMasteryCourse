var app = new Vue({
    el: '#app', //element property, attach to element with id "app"
    data: {
        product: "Socks",
        image: './assets/vmSocks-green-onWhite.jpg',
        altText: 'a pair of socks',
        imageLink: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
        description: "These are beautiful socks.",
        inStock: true,
        details: ["80% cotton", "20% polyester", "gender-neutral"],
        onSale: true,
        inventory: 40,
        variants: [
            {
                variantId: 2234,
                variantColour: "green",
                variantImage: './assets/vmSocks-green-onWhite.jpg'
            },
            {
                variantId: 2235,
                variantColour: "blue",
                variantImage: './assets/vmSocks-blue-onWhite.png'
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function (e) {
            this.cart += 1
            console.log(e)
        },
        updateProduct: function (replacementImage) {
            // this.image = e.target
            this.image = replacementImage;
            // console.log(e.target.innerText)
            // this.variants.forEach(variant => {
            //     if (variant.variantColour == e.target.innerText) {
            //         this.image = variant.variantImage
            //     }
            // });
        },
        updateProductes6 (replacementImage) {
            console.log(replacementImage)
        },
        removeFromCart() {
            if(this.cart > 0) {
                this.cart -= 1
            }
        }
    }
})
