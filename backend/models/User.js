const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  title: { type: String, default: '' },
  location: { type: String, default: '' },
  education: { type: String, default: '' },
  experience: { type: String, default: '' },
  skills: { type: String, default: '' },
  interests: { type: String, default: '' },
  bio: { type: String, default: '' },
  achievements: { type: String, default: '' },
  goals: { type: String, default: '' },
  privacy: { type: Boolean, default: true }, // true = public, false = private
}, { timestamps: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Password comparison method
UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema); 