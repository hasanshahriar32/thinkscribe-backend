import Joi from 'joi';

// Validation schema for creating an embedding task
export const createEmbeddingTaskSchema = Joi.object({
  projectId: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Project ID must be a number',
      'number.integer': 'Project ID must be an integer',  
      'number.positive': 'Project ID must be positive',
      'any.required': 'Project ID is required'
    }),
  
  searchId: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Search ID must be a number',
      'number.integer': 'Search ID must be an integer',
      'number.positive': 'Search ID must be positive', 
      'any.required': 'Search ID is required'
    }),

  papers: Joi.array().items(
    Joi.object({
      paperId: Joi.number().integer().positive().required()
        .messages({
          'number.base': 'Paper ID must be a number',
          'number.integer': 'Paper ID must be an integer',
          'number.positive': 'Paper ID must be positive',
          'any.required': 'Paper ID is required'
        }),
      
      title: Joi.string().trim().min(1).max(500).required()
        .messages({
          'string.base': 'Paper title must be a string',
          'string.empty': 'Paper title cannot be empty',
          'string.min': 'Paper title must have at least 1 character',
          'string.max': 'Paper title cannot exceed 500 characters',
          'any.required': 'Paper title is required'
        }),
      
      blobUrl: Joi.string().uri().required()
        .messages({
          'string.base': 'Blob URL must be a string',
          'string.uri': 'Blob URL must be a valid URL',
          'any.required': 'Blob URL is required'
        }),
      
      status: Joi.string().valid('pending', 'processing', 'success', 'failed').optional()
        .messages({
          'string.base': 'Status must be a string',
          'any.only': 'Status must be one of: pending, processing, success, failed'
        })
    })
  ).min(1).max(100).required()
    .messages({
      'array.base': 'Papers must be an array',
      'array.min': 'At least 1 paper is required',
      'array.max': 'Cannot exceed 100 papers per task',
      'any.required': 'Papers list is required'
    })
});

// Validation schema for pagination query parameters
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).required()
    .messages({
      'number.base': 'Page must be a number',
      'number.integer': 'Page must be an integer',
      'number.min': 'Page must be at least 1',
      'any.required': 'Page is required'
    }),
  
  size: Joi.number().integer().min(1).max(100).required()
    .messages({
      'number.base': 'Size must be a number',
      'number.integer': 'Size must be an integer',
      'number.min': 'Size must be at least 1',
      'number.max': 'Size cannot exceed 100',
      'any.required': 'Size is required'
    }),
  
  keyword: Joi.string().trim().min(1).max(100).optional()
    .messages({
      'string.base': 'Keyword must be a string',
      'string.min': 'Keyword must have at least 1 character',
      'string.max': 'Keyword cannot exceed 100 characters'
    }),
  
  sort: Joi.string().valid('createdAt', 'updatedAt', 'status', 'taskId').optional()
    .messages({
      'string.base': 'Sort field must be a string',
      'any.only': 'Sort field must be one of: createdAt, updatedAt, status, taskId'
    }),
  
  order: Joi.string().valid('asc', 'desc').optional()
    .messages({
      'string.base': 'Order must be a string',
      'any.only': 'Order must be either asc or desc'
    })
});

// Validation schema for webhook status updates
export const webhookUpdateSchema = Joi.object({
  taskId: Joi.string().trim().min(1).required()
    .messages({
      'string.base': 'Task ID must be a string',
      'string.empty': 'Task ID cannot be empty', 
      'string.min': 'Task ID must have at least 1 character',
      'any.required': 'Task ID is required'
    }),
  
  status: Joi.string().valid('pending', 'processing', 'completed', 'failed').required()
    .messages({
      'string.base': 'Status must be a string',
      'any.only': 'Status must be one of: pending, processing, completed, failed',
      'any.required': 'Status is required'
    }),
  
  papers: Joi.array().items(
    Joi.object({
      paperId: Joi.number().integer().positive().required(),
      title: Joi.string().trim().min(1).max(500).required(),
      blobUrl: Joi.string().uri().required(),
      status: Joi.string().valid('pending', 'processing', 'success', 'failed').required(),
      errorMessage: Joi.string().trim().max(1000).optional()
    })
  ).optional()
    .messages({
      'array.base': 'Papers must be an array'
    }),
  
  message: Joi.string().trim().max(500).optional()
    .messages({
      'string.base': 'Message must be a string',
      'string.max': 'Message cannot exceed 500 characters'
    })
});

// Validation schema for task ID parameter
export const taskIdParamSchema = Joi.object({
  id: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Task ID must be a number',
      'number.integer': 'Task ID must be an integer',
      'number.positive': 'Task ID must be positive',
      'any.required': 'Task ID is required'
    })
});

// Validation schema for project ID parameter  
export const projectIdParamSchema = Joi.object({
  projectId: Joi.number().integer().positive().required()
    .messages({
      'number.base': 'Project ID must be a number',
      'number.integer': 'Project ID must be an integer',
      'number.positive': 'Project ID must be positive',
      'any.required': 'Project ID is required'
    })
});
