import slugify from 'slugify';
import Portfolio from '../models/Portfolio.js';

export const generateUniqueSlug = async (name) => {
  let slug = slugify(name, { lower: true, strict: true });
  let slugExists = await Portfolio.findOne({ slug });
  
  let counter = 1;
  while (slugExists) {
    slug = `${slugify(name, { lower: true, strict: true })}-${counter}`;
    slugExists = await Portfolio.findOne({ slug });
    counter++;
  }
  
  return slug;
};