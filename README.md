---

# **Sportswear E-Commerce Application**  

A sportswear e-commerce platform built with the MERN stack, providing a seamless experience for customers to browse, shop, and manage their accounts, while allowing administrators to efficiently manage products, orders, and payments.

---

## **Table of Contents**  
1. [About the Project](#about-the-project)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Installation](#installation)  
5. [Folder Structure](#folder-structure)  
6. [Contributors](#contributors)  
7. [License](#license)  

---

## **About the Project**  
The Sportswear E-Commerce Application allows users to browse a variety of sportswear products, manage their accounts, place orders, and leave reviews. Admins have full control over the catalog, orders, and payments, offering a dynamic platform for both shopping and business management.  

This project incorporates key features such as product management, user authentication, shopping cart functionality, order placement, and integration with popular payment gateways like Stripe and Razorpay.

---

## **Features**  
### **User Features**  
- **User Management:** Sign up, log in, and update profiles.  
- **Product Browsing:** Browse and filter products by categories such as footwear, apparel, and accessories.  
- **Cart & Wishlist:** Add, remove, or update items in the cart and wishlist.  
- **Order Management:** Place, track, and cancel orders.  
- **Reviews & Ratings:** Add, update, and delete reviews for products.  

### **Admin Features**  
- **Product Management:** Admins can perform CRUD operations on products, including adding, viewing, updating, and deleting products.  
- **Category Management:** Create and manage categories for sportswear like shoes, apparel, accessories, etc.  
- **Order Management:** View, update, and cancel customer orders.  
- **Payment Gateway Integration:** Manage and process payments through Stripe, Razorpay, and bank transfer options.  
- **Admin Dashboard:** A centralized dashboard to monitor and manage users, orders, and products.

---

## **Tech Stack**  
- **Frontend:** React.js, Redux  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Cloud Storage:** Cloudinary (for image uploads)  
- **Payment Gateways:** Stripe, Razorpay  
- **Authentication:** JSON Web Tokens (JWT), bcrypt  

---

## **Installation**  
Follow these steps to set up the project locally:

1. Clone the repository:  
   ```bash  
   git clone https://github.com/Plymouth-University/coursework-group_09.git  
   cd coursework-group_09  
   ```  

2. Install dependencies:  
   ```bash  
   cd backend  
   npm install  
   cd ../frontend  
   npm install  
   ```  

3. Set up environment variables:  
   - Create a `.env` file in the `backend` directory.  
   - Add the following variables:  
     ```env  
     PORT=4000  
     MONGO_URI=your-mongodb-uri  
     JWT_SECRET=your-jwt-secret  
     CLOUDINARY_CLOUD_NAME=your-cloud-name  
     CLOUDINARY_API_KEY=your-api-key  
     CLOUDINARY_API_SECRET=your-api-secret  
     STRIPE_SECRET_KEY=your-stripe-key  
     RAZORPAY_KEY_ID=your-razorpay-key-id  
     RAZORPAY_KEY_SECRET=your-razorpay-key-secret  
     ```  

4. Start the application:  
   ```bash  
   # Start the backend  
   cd backend  
   npm run server  

   # Start the frontend  
   cd ../frontend  
   npm run dev  
   ```  

---

## **Folder Structure**  
```plaintext
coursework-group_09/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env
│   └── package.json
├── README.md
└── LICENSE
```

---

## **Contributors**  
- **Ishara:** User Management, Home Page Enhancements  
- **Sinel:** Product Management, Product Page Enhancements  
- **Bingum:** Category Management, Collection Page Enhancements  
- **Ashen:** Order Management, Order Placement Frontend  
- **Anuradha:** Cart Management, Cart Page Features  
- **Thisal:** Wishlist Management, About & Contact Page  
- **Eshan:** Reviews & Ratings, Admin Dashboard Integration  
- **Maheeshi:** Payment Gateway Integration  

---

## **License**  
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.  

---
