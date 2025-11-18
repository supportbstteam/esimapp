import Toast from "react-native-toast-message";
import { addToCart } from "../redux/slice/CartSlice";
import { AppDispatch } from "../redux/Store";

export const handleAddToCart = async (plan: any, dispatch: AppDispatch) => {
  try {
    const response = await dispatch(
      addToCart([{ ...plan, planId: plan?.id, quantity: 1 }])
    );

    // console.log("Response from addToCart:", response);

    if (response?.type === "cart/addToCart/fulfilled") {
      Toast.show({
        type: "success",
        text1: "Added to Cart",
        text2: "You can checkout even later as well",
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Failed to add to cart",
        text2: "Please try again later",
      });
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    Toast.show({
      type: "error",
      text1: "Something went wrong",
      text2: "Please try again",
    });
  }
};
