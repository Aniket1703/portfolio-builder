export const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    success: true,
    message
  };

  if (data) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

export const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};
// ```

// ---

// ## 5️⃣ API Testing Examples (Postman/Thunder Client)

// ### **1. Register User**
// ```
// POST http://localhost:5000/api/auth/register
// Content-Type: application/json

// {
//   "name": "John Doe",
//   "email": "john@example.com",
//   "password": "password123"
// }
// ```

// ### **2. Login User**
// ```
// POST http://localhost:5000/api/auth/login
// Content-Type: application/json

// {
//   "email": "john@example.com",
//   "password": "password123"
// }
// ```

// ### **3. Create Portfolio**
// ```
// POST http://localhost:5000/api/portfolio
// Authorization: Bearer YOUR_JWT_TOKEN
// Content-Type: application/json

// {
//   "slug": "john-doe-developer",
//   "personalInfo": {
//     "name": "John Doe",
//     "title": "Full Stack Developer",
//     "bio": "Passionate developer with 5 years of experience"
//   }
// }
// ```

// ### **4. Update Portfolio Section**
// ```
// PATCH http://localhost:5000/api/portfolio/section/skills
// Authorization: Bearer YOUR_JWT_TOKEN
// Content-Type: application/json

// [
//   {
//     "title": "Frontend",
//     "items": [
//       { "name": "React", "logo": "https://..." },
//       { "name": "JavaScript", "logo": "https://..." }
//     ]
//   }
// ]
// ```

// ### **5. Upload Image**
// ```
// POST http://localhost:5000/api/upload/image
// Authorization: Bearer YOUR_JWT_TOKEN
// Content-Type: multipart/form-data

// image: [SELECT FILE]
// folder: portfolio-builder
// ```

// ### **6. Get Portfolio by Slug (Public)**
// ```
// GET http://localhost:5000/api/portfolio/slug/john-doe-developer
// ```

// ### **7. Publish Portfolio**
// ```
// PATCH http://localhost:5000/api/portfolio/publish
// Authorization: Bearer YOUR_JWT_TOKEN
// Content-Type: application/json

// {
//   "isPublished": true
// }