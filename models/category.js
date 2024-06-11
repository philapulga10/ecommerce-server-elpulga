import moongoose from "mongoose";

const categorySchema = new moongoose.Schema({
  category: {
    type: String,
    required: [true, "Please enter category"],
  },
});

export const Category = moongoose.model("Category", categorySchema);
