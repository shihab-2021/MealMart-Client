"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  removeFromCart,
  updateQuantity,
} from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function MyCart() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartData = useAppSelector((state) => state.cart);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);
  const toastId = "cart";

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({ products: cartData.items }).unwrap();
      router.replace(res.data);
    } catch (error: any) {
      toast.error(error.data.message, { id: toastId });
    }
  };
  return (
    <Card className="mt-8">
      <CardContent className="flex-1 overflow-y-auto pt-4">
        {cartData.items.length > 0 ? (
          <ul className="space-y-4">
            {cartData.items.map((item) => (
              <li key={item.product} className="flex items-center gap-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-16 w-16 rounded object-cover"
                  width={500}
                  height={500}
                />
                <div className="flex-1">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.product,
                            quantity: Math.max(item.quantity - 1, 1),
                          })
                        )
                      }
                      className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(
                          updateQuantity({
                            id: item.product,
                            quantity: Math.min(item.quantity + 1, 10000),
                          })
                        )
                      }
                      className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-800">
                  ${(item.quantity * item.price).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.product))}
                  className="text-red-600 text-sm hover:underline bg-red-50 p-1 rounded-md"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        )}

        <div className="border-b my-3"></div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">
            Total Quantity:
          </span>
          <span className="text-lg font-bold">{cartData.totalQuantity}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700">
            Total Price:
          </span>
          <span className="text-lg font-bold">
            ${cartData.totalPrice.toFixed(2)}
          </span>
        </div>

        <Button
          disabled={cartData.items.length < 1 || isLoading}
          className="w-full"
          onClick={handlePlaceOrder}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Placing Order...
            </div>
          ) : (
            "Place Order"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
