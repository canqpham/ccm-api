const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      sparse: true,
      required: true
    },
    active: { type: Boolean, default: true },
    password: String,
    avatarUrl: { type: String, default: "/media/avatar5.png" },
    isSupperAdmin: { type: Boolean, default: false },
    fullName: { type: String, required: true },
    jobTitle: { type: String },
    displayName: { type: String },
  },
  {
    collection: "users",
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  // Hash password
  const hash = bcrypt.hashSync(this.password, "$2b$04$2uXRjOrtjYMP3NY/ksrQJe");
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = function(password) {
  const account = this;
  return bcrypt.compareSync(password, account.password);
};

const UserModel = mongoose.model("users", UserSchema);
export default UserModel;
