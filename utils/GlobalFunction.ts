import Toast from "react-native-toast-message";
import { addToCart } from "../redux/slice/CartSlice";
import { AppDispatch } from "../redux/Store";
import { api } from "./ApiService";

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

export const postUploadQuery = async ({ setLoading, data }: any) => {
  setLoading(true);
  try {
    const response = await api({
      url: "/user/query/create-query",
      method: "POST",
      data
    });

    if(response?.status){
      Toast.show({
        type:"success",
        text1:response?.message,
        text2:"You may check your complain on your mail"
      })
      return response;
    }


    console.log("response in the contact query", response);
  }
  catch (err: any) {
    console.error("Error in the esim", err);
  }
  finally{
    setLoading(false);
  }
}