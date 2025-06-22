import { FastifyInstance } from "fastify";
import { eventInstance } from "../instances/eventInstance";
import { authMiddleware } from "../middleware/authMiddleware";

export function eventRegister(fastify: FastifyInstance) {
    fastify.post('/event/register', {
        preHandler: authMiddleware,
        schema: {
            tags: ['Event'],
            summary: 'Create a new event',
            description: 'This endpoint allows you to create a new event. The event must have a name, date, last date, and description. Instagram is optional.',
            consumes: ['multipart/form-data'],
            stream: {
                type: 'object',
                required: ['name', 'date', 'lastDate', 'description'],
                properties: {
                    name: { type: 'string', minLength: 1 },
                    date: { type: 'string', format: 'date-time' },
                    lastDate: { type: 'string', format: 'date-time' },
                    description: { type: 'string', minLength: 1 },
                    instagram: { type: 'string', nullable: true },
                    active: { type: 'boolean', default: false }
                }
            },
            response: {
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                    }
                },
            }
        }
    }, (req, res) => eventInstance.create({ req, res }));
}

export function updateEvent(fastify: FastifyInstance) {
    fastify.put('/event/update/:id', {
        preHandler: authMiddleware,
        schema: {
            summary: 'Update an existing event',
            description: 'This endpoint allows you to update an existing event. The event must have a name, date, last date, and description. Instagram is optional.',
            tags: ['Event'],
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', format: 'uuid' }
                }
            },
            consumes: ['multipart/form-data'],
            stream: {
                type: 'object',
                required: ['name', 'date', 'lastDate', 'description'],
                properties: {
                    name: { type: 'string', minLength: 1 },
                    date: { type: 'string', format: 'date-time' },
                    lastDate: { type: 'string', format: 'date-time' },
                    description: { type: 'string', minLength: 1 },
                    instagram: { type: 'string', nullable: true, maxLength: 100 },
                    active: { type: 'boolean', default: false }
                }
            },
            response: {
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Event not found'] },
                        statusCode: { type: 'number', enum: [404] }
                    }
                }
            }
        }
    }, (req, res) => eventInstance.update({ req, res }));
}

export function deleteEvent(fastify: FastifyInstance) {
    fastify.delete('/event/delete/:id', {
        preHandler: authMiddleware,
        schema: {
            summary: 'Delete an event',
            description: 'This endpoint allows you to delete an existing event by its ID.',
            tags: ['Event'],
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', format: 'uuid' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Event deleted successfully'] },
                        statusCode: { type: 'number', enum: [200] }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Event not found'] },
                        statusCode: { type: 'number', enum: [404] }
                    }
                }
            }
        }
    }, (req, res) => eventInstance.delete({ req, res }));
}

export function findUniqueEvent(fastify: FastifyInstance) {
    fastify.get('/event/:id', {
        schema: {
            tags: ['Event'],
            summary: 'Find an event by ID',
            description: 'This endpoint allows you to find an event by its ID.',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', format: 'uuid' }
                }
            },
            response: {
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Event not found'] },
                        statusCode: { type: 'number', enum: [404] }
                    }
                }
            }
        }
    }, (req, res) => eventInstance.findUnique({ req, res }));
}

export function findAllEvent(fastify: FastifyInstance) {
    fastify.get('/events', {
        schema: {
            tags: ['Event'],
            summary: 'Find all events',
            description: 'This endpoint allows you to find all events.',
            response: {
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                }
            }
        }
    }, (req, res) => eventInstance.findAll({ req, res }));
}

export function findAvailableEvent(fastify: FastifyInstance) {
    fastify.get('/events/available', {
        schema: {
            tags: ['Event'],
            summary: 'Find available events',
            description: 'This endpoint allows you to find all available events.',
            response: {
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                }
            }
        }
    }, (req, res) => eventInstance.findAvaliableEvent({ req, res }))
}

export function UpdatePhotoEvent(fastify: FastifyInstance) {
    fastify.put('/event/photo/:id', {
        preHandler: authMiddleware,
        schema: {
            tags: ['Event'],
            summary: 'Update an existing event photo',
            description: 'This endpoint allows you to update an existing event photo by its ID.',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', format: 'uuid' }
                }
            },
            consumes: ['multipart/form-data'],
            stream: {
                type: 'object',
                required: ['photo'],
                properties: {
                    photo: { type: 'string', format: 'binary' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo updated successfully'] },
                        statusCode: { type: 'number', enum: [200] },
                        photoUrl: { type: 'string' }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo not found'] },
                        statusCode: { type: 'number', enum: [404] }
                    }
                }
            }
        }
    }, (req, res) => eventInstance.updatePhoto({ req, res }))
}

export function CreatePhotoEvent(fastify: FastifyInstance) {
    fastify.post('/event/create/photo/:eventId', {
        preHandler: authMiddleware,
        schema: {
            tags: ['Event'],
            summary: 'Create a new event photo',
            description: 'This endpoint allows you to create a new photo for an event. The photo must be provided in the request stream.',
            params: {
                type: 'object',
                required: ['eventId'],
                properties: {
                    eventId: { type: 'string', format: 'uuid' }
                }
            },
            consumes: ['multipart/form-data'],
            stream: {
                type: 'object',
                required: ['photo'],
                properties: {
                    photo: { type: 'string', format: 'binary' }
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo created successfully'] },
                        photoUrl: { type: 'string' }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                    }
                }
            }
        }
    }, (req, res) => eventInstance.createPhoto({ req, res }))
}

export function DeletePhotoEvent(fastify: FastifyInstance) {
    fastify.delete('/event/delete/photo/:id', {
        preHandler: authMiddleware,
        schema: {
            tags: ['Event'],
            summary: 'Delete an event photo',
            description: 'This endpoint allows you to delete an existing event photo by its ID.',
            params: {
                type: 'object',
                required: ['id'],
                properties: {
                    id: { type: 'string', format: 'uuid' }
                }
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo deleted successfully'] },
                        statusCode: { type: 'number', enum: [200] }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Bad Request'] },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Unauthorized'] },
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo not found'] },
                        statusCode: { type: 'number', enum: [404] }
                    }
                }
            }
        }
    }, (req, res) => eventInstance.deletePhoto({ req, res }))
}