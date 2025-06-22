import { FastifyInstance } from "fastify";
import { cityInstance } from "../instances/cityInstance";
import { authMiddleware } from "../middleware/authMiddleware";

export function cityRegister(fastify: FastifyInstance){
    fastify.post('/city/register', {
        preHandler: authMiddleware,
        schema: {
            stream: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    location: { type: 'string' },
                    description: { type: 'string' },
                    photos: { type: 'array' },
                    places: { type: 'array' },
                    events: { type: 'array' },
                    instagram: { type: 'string', nullable: true },                 
                },
                required: ['name', 'location', 'description']
            },
            summary: 'Register a new city',
            description: 'This endpoint allows you to register a new city with its details including name, location, description, and optional photos, places, events, and Instagram handle.',
            tags: ['City'],
            consumes: ['multipart/form-data'],
            responses: {
                201: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number', enum: [201] },
                        message: { type: 'string', enum: ['City created successfully'] },
                        city: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                location: { type: 'string' },
                                description: { type: 'string' },
                                photos: { type: 'array', items: { type: 'string' } },
                                places: { type: 'array', items: { type: 'string' } },
                                events: { type: 'array', items: { type: 'string' } },
                                instagram: { type: 'string', nullable: true }
                            }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Bad request' },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Unauthorized' },
                    }
                },
            }
        }
    }, (req, res) => cityInstance.createCity({req, res}))
}

export function cityUpdate(fastify: FastifyInstance){
    fastify.put('/city/update', {
        preHandler: authMiddleware,
        schema: {
            stream: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    location: { type: 'string' },
                    description: { type: 'string' },
                    photos: { type: 'array' },
                    places: { type: 'array' },
                    events: { type: 'array' },
                    instagram: { type: 'string', nullable: true },                 
                },
            },
            summary: 'Update an existing city',
            description: 'This endpoint allows you to update an existing city with your data, all of which are optional, I can update just one and it will work.',
            tags: ['City'],
            consumes: ['multipart/form-data'],
            responses: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['City updated successfully'] },
                        city: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                location: { type: 'string' },
                                description: { type: 'string' },
                                photos: { type: 'array', items: { type: 'string' } },
                                places: { type: 'array', items: { type: 'string' } },
                                events: { type: 'array', items: { type: 'string' } },
                                instagram: { type: 'string', nullable: true }
                            }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Bad request' },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Unauthorized' },
                    }
                },
            }
        }
    }, (req, res) => cityInstance.updateCity({req, res}))
}

export function cityDelete(fastify: FastifyInstance){
    fastify.delete('/city/delete', {
        preHandler: authMiddleware,
        schema: {
            summary: 'Delete a city',
            description: 'This endpoint allows you to delete a city',
            tags: ['City'],
            responses: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['City deleted successfully'] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Bad request' },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Unauthorized' },
                    }
                },
            }
        }
    }, (req, res) => cityInstance.deleteCity({req, res}))
}

export function cityFindUnique(fastify: FastifyInstance){
    fastify.get('/city', {
        preHandler: authMiddleware,
        schema: {
            summary: 'Find a city by ID',
            description: 'This endpoint allows you to find a city by its ID.',
            tags: ['City'],
            responses: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['City found successfully'] },
                        city: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                name: { type: 'string' },
                                location: { type: 'string' },
                                description: { type: 'string' },
                                photos: { type: 'array', items: { type: 'string' } },
                                places: { type: 'array', items: { type: 'string' } },
                                events: { type: 'array', items: { type: 'string' } },
                                instagram: { type: 'string', nullable: true }
                            }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Bad request' },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Unauthorized' },
                    }
                },
            }
        }
    }, (req, res) => cityInstance.findUniqueCity({req, res}))
}

export function cityFindMany(fastify: FastifyInstance){
    fastify.get('/citys', {
        schema: {
            summary: 'Find all cities',
            description: 'This endpoint allows you to find all cities.',
            tags: ['City'],
            responses: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Cities found successfully'] },
                        citys: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    name: { type: 'string' },
                                    location: { type: 'string' },
                                    description: { type: 'string' },
                                    photos: { type: 'array', items: { type: 'string' } },
                                    places: { type: 'array', items: { type: 'string' } },
                                    events: { type: 'array', items: { type: 'string' } },
                                    instagram: { type: 'string', nullable: true }
                                }
                            }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Bad request' },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Unauthorized' },
                    }
                },
            }
        }
    },(req, res) => cityInstance.findAllCity({req, res}))
}

export function cityUpdatePhoto(fastify: FastifyInstance){
    fastify.put('/city/update/photo/:id', {
        preHandler: authMiddleware,
        schema: {
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'The ID of the city photo to update' }
                },
                required: ['id']
            },
            stream: {
                type: 'object',
                properties: {
                    url: { type: 'string' },
                    cityId: { type: 'string' }
                },
                required: ['url', 'cityId']
            },
            summary: 'Update a city photo',
            description: 'This endpoint allows you to update a city photo by its ID.',
            tags: ['City'],
            consumes: ['multipart/form-data'],
            responses: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['City photo updated successfully'] },
                        photo: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                url: { type: 'string' },
                                cityId: { type: 'string' }
                            }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Bad request' },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Unauthorized' },
                    }
                },
            }
        }
    }, (req, res) => cityInstance.updatePhoto({req, res}))
}

export function cityCreatePhoto(fastify: FastifyInstance){
    fastify.post('/city/create/photo', {
        preHandler: authMiddleware,
        schema: {
            stream: {
                type: 'object',
                properties: {
                    url: { type: 'string' },
                    cityId: { type: 'string' }
                },
                required: ['url']
            },
            summary: 'Create a new city photo',
            description: 'This endpoint allows you to create a new photo for a city.',
            tags: ['City'],
            consumes: ['multipart/form-data'],
            responses: {
                201: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number', enum: [201] },
                        message: { type: 'string', enum: ['City photo created successfully'] },
                        photo: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                url: { type: 'string' },
                                cityId: { type: 'string' }
                            }
                        }
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Bad request' },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Unauthorized' },
                    }
                },
            }
        }
    }, (req, res) => cityInstance.createPhoto({req, res}))
}

export function cityDeletePhoto(fastify: FastifyInstance){
    fastify.delete('/city/delete/photo/:id', {
        preHandler: authMiddleware,
        schema: {
            summary: 'Delete a city photo',
            description: 'This endpoint allows you to delete a city photo by its ID.',
            tags: ['City'],
            params: {
                type: 'object',
                properties: {
                    id: { type: 'string', description: 'The ID of the city photo to delete' }
                },
                required: ['id']
            },
            responses: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['City photo deleted successfully'] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Bad request' },
                    }
                },
                401: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', default: 'Unauthorized' },
                    }
                },
            }
        }
    }, (req, res) => cityInstance.deletePhoto({req,res}))
}