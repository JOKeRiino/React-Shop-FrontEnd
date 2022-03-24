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


# TODOS
- Pre Checkout quantity check!!!
- Footer not on end of page
- cross-selling section on productPage not fully responsive (missing scrollbar)
- Size messes up placement on small screen cart page