import moongoose from "mongoose";

const orderSchema = new moongoose.Schema({});

export const Order = moongoose.model("Order", orderSchema);
