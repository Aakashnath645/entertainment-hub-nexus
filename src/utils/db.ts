
// This file would normally be in a server-side application
// For a full implementation, you would need a backend service

import mongoose from 'mongoose';

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Example Post Schema - would normally be in a separate models file
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true, enum: ['movie', 'game', 'tech'] },
  imageUrl: { type: String, required: true },
  author: {
    name: { type: String, required: true },
    avatar: { type: String, required: true }
  },
  date: { type: Date, default: Date.now },
  readTime: { type: Number, required: true },
  featured: { type: Boolean, default: false },
  trending: { type: Boolean, default: false },
  popular: { type: Boolean, default: false }
});

// This is for demonstration - in a real app, you'd use this in your API routes
export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
