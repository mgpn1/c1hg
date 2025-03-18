// Mobile Menu Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            navLinks.classList.remove('active');
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically handle the form submission
        // For now, we'll just show an alert
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.program-card, .pricing-card, .contact-item');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation properties
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.program-card, .pricing-card, .contact-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease-out';
    });
    animateOnScroll();
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Shopping Cart Functionality
const cartContainer = document.getElementById('cartContainer');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutButton = document.getElementById('checkoutButton');

// Cart state
let cart = [];

// Product database
const products = {
    whey1: {
        name: 'Premium Whey Protein',
        price: 2499,
        image: 'https://images.pexels.com/photos/3766210/pexels-photo-3766210.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    bcaa1: {
        name: 'BCAA 6000',
        price: 1299,
        image: 'https://images.pexels.com/photos/3766209/pexels-photo-3766209.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    pre1: {
        name: 'Pre-Workout Elite',
        price: 1799,
        image: 'https://images.pexels.com/photos/3766207/pexels-photo-3766207.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    creatine1: {
        name: 'Creatine Monohydrate',
        price: 899,
        image: 'https://images.pexels.com/photos/3766208/pexels-photo-3766208.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
};

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.id;
        addToCart(productId);
        showCart();
    });
});

// Close cart
closeCart.addEventListener('click', () => {
    cartContainer.classList.remove('active');
});

// Add to cart function
function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }
    
    updateCart();
}

// Update cart display
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const product = products[item.id];
        total += product.price * item.quantity;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-title">${product.name}</div>
                    <div class="cart-item-price">₹${product.price}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartTotal.textContent = `₹${total}`;
    
    // Add event listeners for quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.id;
            if (button.classList.contains('minus')) {
                decreaseQuantity(productId);
            } else {
                increaseQuantity(productId);
            }
        });
    });
}

// Show cart
function showCart() {
    cartContainer.classList.add('active');
}

// Increase quantity
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCart();
    }
}

// Decrease quantity
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCart();
    }
}

// Checkout button
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Initialize Razorpay payment
    const options = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with actual Razorpay key
        amount: parseInt(cartTotal.textContent.replace('₹', '')) * 100, // Amount in paise
        currency: 'INR',
        name: 'Online Fitness Guru',
        description: 'Supplement Purchase',
        handler: function(response) {
            alert('Payment successful! Order confirmed.');
            cart = [];
            updateCart();
            cartContainer.classList.remove('active');
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        theme: {
            color: '#ff4d4d'
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
}); 