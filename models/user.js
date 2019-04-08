import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: 'String', required: true, unique: true},
  email: {type: 'String', required: true, unique: true},
  password: {type: 'String', required: true, minlength: 6, maxlength: 40},
  role: {type: 'String'},
});

userSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({username: login});
  if (!user) {
    user = await this.findOne({email: login});
  }
  return user;
};

userSchema.pre('save', async function() {
  this.password = await this.generatePasswordHash();
});

userSchema.methods.generatePasswordHash = async function() {
  const saltOrRounds = 10;
  return await bcrypt.hash(this.password, saltOrRounds);
};

userSchema.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);