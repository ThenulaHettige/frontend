import React, { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal } = useCart();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // cart, details, confirmation

  const renderCart = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Your cart is empty</p>
          <Button className="mt-4" onClick={() => window.location.href = '/marketplace'}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-lg">Rs. {item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto text-red-500 hover:text-red-600"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t">
            <span className="text-xl font-bold">Total: Rs. {getTotal().toLocaleString()}</span>
            <Button onClick={() => setCheckoutStep('details')}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );

  const renderCheckoutDetails = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Checkout Details</h2>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your full name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="Enter your email" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" placeholder="Enter your phone number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Delivery Address</Label>
          <Input id="address" placeholder="Enter your delivery address" />
        </div>
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => setCheckoutStep('cart')}>
            Back to Cart
          </Button>
          <Button onClick={() => setCheckoutStep('confirmation')}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Order Confirmed!</h2>
      <p className="text-gray-600">
        Thank you for your order. We'll send you a confirmation email shortly.
      </p>
      <Button onClick={() => window.location.href = '/marketplace'}>Continue Shopping</Button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {checkoutStep === 'cart' && renderCart()}
      {checkoutStep === 'details' && renderCheckoutDetails()}
      {checkoutStep === 'confirmation' && renderConfirmation()}
    </div>
  );
};

export default Cart; 