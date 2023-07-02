## 🛍️ Next.js Clothes Website
[![Project Status: Active.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

### [🌐 Demo - hosted on vercel](https://shopping-clothes-website.vercel.app/) 
https://shopping-clothes-website.vercel.app/

#### (NOTE: Demo video at bottom)


## ⚡ Features
1. Home page, Search page + page for each product (using a mobile first approach)
2. Next Auth authentication required for posting comments and buying products
3. When ordering, user can select from previous delivery addresses or add a new address
4. Stripe payment processor
5. Order summary page for the order + page to view all previous orders by the user
6. Admin page to upload new products to firebaseDB & stripe
7. Comment section under each product


## 🏗️ Built With:
1. Next JS 13 _(Beta with app directory)_ + Typescript
2. React
3. Tailwindcss
4. Zustand State Management
5. Next Auth _(for authentication)_
6. Firebase database
7. Stripe _(payment processor)_


## 🌳 Environmental Variables:
```
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
    STRIPE_SECRET_KEY=
    
    FIREBASE_SERVICE_ACCOUNT_KEY=
    FIREBASE_CONFIG_APIKEY=
    
    GOOGLE_ID=
    GOOGLE_SECRET=
    
    FACEBOOK_ID=
    FACEBOOK_SECRET=
    
    NEXTAUTH_URL=
    NEXTAUTH_SECRET=
```

- Stripe keys are to access Stripe payment processor
- Firebase keys are to access FirebaseDB
- Google & Facebook keys are for Next Auth
- NextAuth keys are for authentication


## 🎬 Demo Video:
https://github.com/Nick-M1/clothes-website/assets/91367903/26412ad6-26af-41ce-91f5-ebed4fd8c4d3
