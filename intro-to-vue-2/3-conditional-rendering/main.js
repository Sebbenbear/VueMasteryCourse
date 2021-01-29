var app = new Vue({
    el: '#app', //element property, attach to element with id "app"
    data: {
        product: "Socks",
        image: './assets/vmSocks-green-onWhite.jpg',
        altText: 'a pair of socks',
        imageLink: 'https://www.vuemastery.com/courses/intro-to-vue-js/attribute-binding',
        description: "These are beautiful socks.",
        inStock: true,
        inventory: 100,
        onSale: true
    }
})
