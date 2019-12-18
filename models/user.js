const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required: true
    },
    resetToken: String,
    resetTokenExp: Date,
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                courseId : {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                }
            }
        ]
    }
});

userSchema.methods.addToCart = function (course) {
  const items = this.cart.items.concat();
  const index = items.
  findIndex(el => el.courseId.toString() === course._id.toString());

  if(index >= 0) {
      items[index].count = items[index].count + 1;
  } else {
      items.push({
          courseId: course._id,
          count: 1
      })
  }

  this.cart = {items};

  return this.save();
};

userSchema.methods.removeFromCart = function (courseId) {
    const items = this.cart.items.concat();
    const index = items.
    findIndex(el => el.courseId.toString() === courseId);

    if(items[index].count === 1) {
        items.splice(index, 1);
    } else {
        items[index].count--;
    }

    this.cart = {items};

    return this.save();
};

userSchema.methods.clearCart = function (courseId) {
    this.cart = {items: []};

    return this.save();
};

module.exports = model('User', userSchema);




