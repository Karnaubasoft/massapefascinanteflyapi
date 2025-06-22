import { FastifyInstance } from "fastify";
import { placeInstance } from "../instances/placeInstance";
import { authMiddleware } from "../middleware/authMiddleware";

export function placeRegister(fastify: FastifyInstance) {
    fastify.post('/place/register', {
        preHandler: authMiddleware,
        schema: {
            stream: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    category: { type: 'string' },
                    phone: { type: 'string', nullable: true },
                    instagram: { type: 'string', nullable: true },
                    location: { type: 'string' },
                    photos: { type: 'array', items: { type: 'string' } },
                },
                required: ['name', 'description', 'category', 'location']
            },
            summary: 'Register a new place',
            description: 'This endpoint allows you to register a new place with its details including name, description, category, city ID, phone number, Instagram handle, location, and photos.',
            tags: ['Place'],
            consumes: ['multipart/form-data'],
            response: {
                200: {
                    consumes: ['multipart/form-data'],
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Place created successfully'] },
                        place: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                description: { type: 'string' },
                                category: { type: 'string' },
                                cityId: { type: 'string' },
                                phone: { type: 'string', nullable: true },
                                instagram: { type: 'string', nullable: true },
                                location: { type: 'string' },
                                photos: { type: 'array', items: { type: 'string' } }
                            }
                        }
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
            }
        }
    }, (req, res) => placeInstance.create({ req, res }));
}

export function placeUpdate(fastify: FastifyInstance) {
    fastify.put('/place/update/:id', {
        preHandler: authMiddleware,
        schema: {
            stream: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    category: { type: 'string' },
                    phone: { type: 'string', nullable: true },
                    instagram: { type: 'string', nullable: true },
                    location: { type: 'string' },
                    photos: { type: 'array', items: { type: 'string' } },
                }
            },
            summary: 'Update a place',
            description: 'This endpoint allows you to update an existing place with its details including name, description, category, city ID, phone number, Instagram handle, location, and photos.',
            tags: ['Place'],
            consumes: ['multipart/form-data'],
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
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
    }, (req, res) => placeInstance.update({ req, res }));
}

export function placeDelete(fastify: FastifyInstance) {
    fastify.delete('/place/delete/:id', {
        preHandler: authMiddleware,
        schema: {
            summary: 'Delete a place',
            description: 'This endpoint allows you to delete an existing place by its ID.',
            tags: ['Place'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Place deleted successfully'] },
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
            }
        }
    }, (req, res) => placeInstance.delete({ req, res }));
}

export function placeByCategory(fastify: FastifyInstance) {
    fastify.get('/places/:category', {
        schema: {
            params: {
                type: 'object',
                properties: {
                    category: {
                        type: 'string',
                        enum: ['RESTAURANT', 'HOTEL', 'TOURIST_ATTRACTIONS', 'LANDSCAPE', 'HOSTING']
                    }
                },
                required: ['category']
            },
            summary: 'Find places by category',
            description: 'This endpoint allows you to find places by their category.',
            tags: ['Place'],
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
    }, (req, res) => placeInstance.findByCategory({ req, res }));
}

export function placeFindUnique(fastify: FastifyInstance) {
    fastify.get('/place/:id', (req, res) => placeInstance.findUnique({ req, res }));
}

export function placeFindAll(fastify: FastifyInstance) {
    fastify.get('/places', {
        schema: {
            summary: 'Find all places',
            description: 'This endpoint allows you to retrieve a list of all places.',
            tags: ['Place'],
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
    }, (req, res) => placeInstance.findAll({ req, res }));
}

export function placeUpdatePhoto(fastify: FastifyInstance) {
    fastify.put('/place/photo/:id', {
        preHandler: authMiddleware,
        schema: {
            stream: {
                type: 'object',
                properties: {
                    photo: { type: 'string' }
                },
                required: ['photo']
            },
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
            },
            summary: 'Update a place photo',
            description: 'This endpoint allows you to update an existing place photo by its ID.',
            tags: ['Place'],
            consumes: ['multipart/form-data'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo updated successfully'] },
                        photo: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                url: { type: 'string' },
                                placeId: { type: 'string' }
                            }
                        }
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
            }
        }
    }, (req, res) => placeInstance.updatePhoto({ req, res }))
}

export function placeCreatePhoto(fastify: FastifyInstance) {
    fastify.post('/place/create/photo/:placeId', {
        preHandler: authMiddleware,
        schema: {
            stream: {
                type: 'object',
                properties: {
                    photo: { type: 'string' }
                },
                required: ['photo']
            },
            params: {
                type: 'object',
                properties: {
                    placeId: { type: 'string' }
                },
                required: ['placeId']
            },
            summary: 'Create a new place photo',
            description: 'This endpoint allows you to create a new photo for a specific place by its ID.',
            tags: ['Place'],
            consumes: ['multipart/form-data'],
            response: {
                201: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo created successfully'] },
                        statusCode: { type: 'number', enum: [201] },
                        photo: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                url: { type: 'string' },
                                placeId: { type: 'string' }
                            }
                        }
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
            }
        }
    }, (req, res) => placeInstance.createPhoto({ req, res }))
}

export function placeDeletePhoto(fastify: FastifyInstance) {
    fastify.delete('/place/delete/photo/:id', {
        preHandler: authMiddleware,
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string' }
                },
                required: ['id']
            },
            summary: 'Delete a place photo',
            description: 'This endpoint allows you to delete a specific photo of a place by its ID.',
            tags: ['Place'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Photo deleted successfully'] },
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
            }
        }
    }, (req, res) => placeInstance.deletePhoto({ req, res }))
}

export function relatedPlacesById(fastify: FastifyInstance) {
    fastify.get('/place/related/:id', { preHandler: authMiddleware }, (req, res) => 
        placeInstance.getRelatedPlacesById({ req, res })
    );
}