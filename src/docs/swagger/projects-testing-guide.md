# Projects API Testing Guide

This document provides examples and test cases for the Projects API endpoints.

## Base URL

```
http://localhost:3000/api/v1
```

## Authentication

All endpoints require a JWT bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. Get All Projects

**GET** `/projects`

**Query Parameters:**
- `page` (required): Page number (integer, min: 1)
- `size` (required): Items per page (integer, min: 1, max: 100)
- `keyword` (optional): Search keyword for title, description, or searchId
- `sort` (optional): Sort field (title, description, searchId, createdAt)
- `order` (optional): Sort order (asc, desc)

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/v1/projects?page=1&size=10&keyword=AI" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Successfully Retrieved!",
  "data": {
    "data": [
      {
        "id": 1,
        "title": "AI Research Project",
        "description": "A comprehensive study on AI applications",
        "searchId": "ai-research-2024",
        "pdfList": [
          {
            "name": "Research Methodology",
            "url": "https://example.com/docs/methodology.pdf"
          }
        ]
      }
    ],
    "pagination": {
      "page": 1,
      "size": 10,
      "totalCount": 1,
      "totalPages": 1
    }
  }
}
```

### 2. Get Project by ID

**GET** `/projects/{id}`

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/v1/projects/1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Successfully Retrieved!",
  "data": {
    "id": 1,
    "title": "AI Research Project",
    "description": "A comprehensive study on AI applications",
    "searchId": "ai-research-2024",
    "pdfList": [
      {
        "name": "Research Methodology",
        "url": "https://example.com/docs/methodology.pdf"
      }
    ]
  }
}
```

### 3. Create Project

**POST** `/projects`

**Description:** Creates a new project by taking a title and description, automatically searches for relevant research papers using the ThinkSource API, and stores the results.

**Request Body:**
```json
{
  "title": "Machine Learning Neural Networks",
  "description": "Research on deep learning architectures and neural network optimization techniques for computer vision and natural language processing"
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/v1/projects" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Machine Learning Neural Networks",
    "description": "Research on deep learning architectures and neural network optimization techniques for computer vision and natural language processing"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Successfully Created!",
  "data": {
    "id": 2,
    "title": "Machine Learning Neural Networks",
    "description": "Research on deep learning architectures and neural network optimization techniques for computer vision and natural language processing",
    "searchId": "47",
    "pdfList": [
      {
        "id": 445,
        "searchId": 47,
        "title": "Stochastic Quantum Spiking Neural Networks with Quantum Memory and Local Learning",
        "authors": ["Jiechen Chen", "Bipin Rajendran", "Osvaldo Simeone"],
        "abstract": "Neuromorphic and quantum computing have recently emerged as promising paradigms for advancing artificial intelligence...",
        "year": 2025,
        "source": "arxiv",
        "sourceId": "2506.21324v1",
        "url": "https://arxiv.org/abs/2506.21324v1",
        "pdfUrl": "https://arxiv.org/pdf/2506.21324v1.pdf",
        "doi": null,
        "citations": 0,
        "fileSize": null,
        "pageCount": null,
        "language": "en",
        "tags": ["cs.NE", "cs.LG"],
        "matchScore": 100,
        "metadata": {
          "arxivId": "2506.21324v1",
          "updated": "2025-06-26T14:39:14Z",
          "categories": ["cs.NE", "cs.LG"]
        },
        "selected": false,
        "createdAt": "2025-06-28T19:36:11.279Z"
      }
    ]
  }
}
```

### 4. Update Project

**PUT** `/projects/{id}`

**Request Body (partial update):**
```json
{
  "title": "Updated AI Project",
  "description": "Updated description"
}
```

**Example Request:**
```bash
curl -X PUT "http://localhost:3000/api/v1/projects/1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated AI Project",
    "description": "Updated description"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "message": "Successfully Updated!",
  "data": {
    "id": 1,
    "title": "Updated AI Project",
    "description": "Updated description",
    "searchId": "ai-research-2024",
    "pdfList": [
      {
        "name": "Research Methodology",
        "url": "https://example.com/docs/methodology.pdf"
      }
    ]
  }
}
```

### 5. Delete Project

**DELETE** `/projects/{id}`

**Example Request:**
```bash
curl -X DELETE "http://localhost:3000/api/v1/projects/1" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Example Response:**
```json
{
  "success": true,
  "message": "Successfully Deleted!",
  "data": {
    "id": "1"
  }
}
```

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "message": "String must contain at least 1 character(s)",
      "path": ["title"],
      "type": "too_small"
    }
  ]
}
```

### Unauthorized Error (401)
```json
{
  "success": false,
  "error": "Unauthorized Access!"
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "error": "Project not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "error": "Failed to process request",
  "details": "Database connection error"
}
```

## Test Cases

### Test Case 1: Create AI Research Project

```json
{
  "title": "Artificial Intelligence and Machine Learning",
  "description": "Comprehensive research on artificial intelligence applications, machine learning algorithms, and deep neural networks"
}
```

### Test Case 2: Create Medical Research Project

```json
{
  "title": "Healthcare AI Applications",
  "description": "Research on artificial intelligence applications in healthcare, medical diagnosis, and patient care optimization"
}
```

### Test Case 3: Validation Errors

- Empty title: `{"title": "", "description": "Some description"}`
- Missing description: `{"title": "Valid title"}`
- Missing both fields: `{}`

### Test Case 3: Search Projects
- Test keyword search: `?keyword=AI&page=1&size=10`
- Test empty search: `?keyword=&page=1&size=10`
- Test case-insensitive search: `?keyword=ai&page=1&size=10`

### Test Case 4: Pagination
- First page: `?page=1&size=5`
- Second page: `?page=2&size=5`
- Large page size: `?page=1&size=50`

### Test Case 5: Validation Errors
- Empty title: `{"title": ""}`
- Invalid PDF URL: `{"title": "Test", "pdfList": [{"name": "Doc", "url": "invalid-url"}]}`
- Title too long: `{"title": "A".repeat(300)}`

## RBAC Integration (Future)

When RBAC is enabled, the following permissions will be required:

- **VIEW**: Read access to projects
- **CREATE**: Ability to create new projects
- **UPDATE**: Ability to modify existing projects
- **DELETE**: Ability to delete projects

Example RBAC configuration:
```javascript
{
  action: ACTIONS.VIEW,
  roles: [ROLES.ADMIN, ROLES.USER],
  module: MODULES.PROJECT_MANAGEMENT,
  subModule: SUB_MODULES.PROJECT
}
```
