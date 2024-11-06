const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address']
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    recipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
      }
    ],
    savedRecipes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// Set up pre-save middleware to hash password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to compare and validate password during login
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Virtual to get the count of user's recipes
userSchema.virtual('recipeCount').get(function () {
  return this.recipes.length;
});

const User = model('User', userSchema);

module.exports = User;
