# DEVLOG REACT-SHOP

## 8.03.2022
- Setting up react and mui

## 13.03.2022
- Deinstalling mui and trying with semantic
- Setting up early routes

## 15.03-2022
- Deinstalling semantic --> From now on own CSS!!!
- Setting up own font --> TO AVOID GOOGLE FONTS
- Setting up Working navigation
- Setting up missing pages
- Navigation and Header fully working // Responsive!

## 16.03.2022
- Changing the product datastructure
- Fetching the data through REST successfully
- Creating the mockup images and creating all mock products

## 17.03.2022
- Building the Products (List) Page with all its components // MOBILE FIRST APPROACH
- Comps: Productspage -> Card -> Slider (for Images)
- Adding Click listener to every card and navigate to product page

## 18.03.2022
- Setting up the Product Page // MOBILE FIRST APPROACH
- Fetching the data via REST and displaying it
- Configuring GraphQL in Strapi // GraphQL features many benefits compared to REST -> TO BE FULLY IMPLEMENTED!

## 19.03.2022
- Exchanged All Data fetching with GRAPHQL QUERIES!
- REMOVED Redux as currently not longer needed
- Finished Size selector and cross-selling section on product page
- Created AboutPage data structure and filled with dummy
- AboutPage integrated but not working as of now!

## 20.03.2022
- Aboutpage fixed
- Form installed in Product Page
- Cart component initialized

## 21.03.2022
- Added descriptions and comments to all existing components
- Form now fires product, to add to cart
- Products page now fetches all items (Removed/Specified special fetching limit in gqlQuery)

## 22.03.2022
- The cart gets an item and manages to decide wether the item is already existing and the
quantity needs to be adjusted or if the item is new and just gets added to the cart.
- The amount of inventory available has to be controlled on the server (db) side. if someone adds an item to
their cart, the quantity of this item(s) should not be available to other customers on the website!
Therefore there has to be another quantity check right before a payment is made and the quantity has to be adjusted
when a sale takes place (--> This problem took 8 hours to solve!!!)

## 23.03.2022
- Adding items to cart now works
- The cart value is shown in the header by using an refactored/reusable funtion
- Built a functioning cart list
- Cart page finished. (Apart from car checkout FORM!!!)
- Header is now fully responsive!

## 24.03.2022
- All Cart functions are now working via redux.
- Pre Checkout quantity check verifies that in the event of a sale the items in cart are actually available.

## 25.03.2022
- Strapi integrated
- Basic checkout works

## 26.03.2022
- Items now appear successfully in checkout.
- The pre checkout quantity check is now called directly on the cart AND whenever the quantity of any items changes.
This assures that it is not possible to add a quantity to cart that isn't available in inventory.

## 27.03.2022
- With the help of the redux-persist library, the state
is now saved within the browsers local storage and can be accessed even after reloading or closing the page
- After an order is placed successfully, each cart items inventory is adjusted by the ordered quantity!
- After an order is placed successfully, the cart aswell as localstorage are successfully cleaned (purged).

## 28.03.2022
- Overall Code Cleanup
- FIXED: Size messes up placement on small screen cart page
- Implemented Loader Component that shows up on pages before the actual content is fetched from the db
- Created order type in strapi backend (because in stripe dashboard, product sizes arent submitted)
- On a successful payment an api post request is sent to the backend, creating an order type.
In the backend the create method of the controller was overwritten. The checkout session data is fetched from
Stripe via the session id. The products object is sent from the frontend state.
- Now the orders can be controlled in the strapi backend with more information than the stripe dashboard.

## 29.03.2022
- Finished successpage content and styling
- Collection Component works for all created components

## 30.03.2022
- Building the frontpage (boring and no value for the assignment)

## 31.03.2022
- Adding shipping to the cart page and collecting a billing/shipping address
at checkout!
- Getting the neccessary name and address data in the backend for emails
- Sending an unformatted email via sendgrid works
- installing the email templating engine for strapi
- Sending a FORMATTED EMAIL works fine!!!!!

## 01.04.2022
- Footer finally on end of page!!!

## 02.04.2022
- Fixed buttons on homepage
- Cart shipping fee fixed on empty cart
- Converted all images to webp format. Avg. saving on image size: 90-95%!!!!

## 03.04.2022
- The Creation of the checkout has now been moved entirely to the strapi backend
Because the old method was deprecated and not as secure + less features...!
- Added .env variables (Base url and stripe key)
- Code clean up and simple bug fixes

# TODOS
- Add spinning circle when checkout is clicked?!
- idk?!
(- Write all content into strapi! In this case maybe dont,
because of the missing SEO!)