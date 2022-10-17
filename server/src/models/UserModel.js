import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tasks: {
      type: [
        {
          data: {
            type: String,
          },
          flag: {
            type: Boolean,
            default: false,
            // 0 undone task
            // 1 done
          },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
