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
                variantColour: "green"
            },
            {
                variantId: 2235,
                variantColour: "blue"
            }
        ],
        sizes: [
            "S",
            "M",
            "L",
            "XL"
        ]
    }
})
