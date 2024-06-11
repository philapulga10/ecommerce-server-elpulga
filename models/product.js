import moongoose from "mongoose";

const productSchema = new moongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  price: {
    type: String,
    required: [true, "Please enter price"],
  },
  stock: {
    type: String,
    required: [true, "Please enter stock"],
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  category: {
    type: moongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = moongoose.model("Product", productSchema);
