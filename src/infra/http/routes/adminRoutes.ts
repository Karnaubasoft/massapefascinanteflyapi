import { FastifyInstance } from "fastify";
import { adminInstace } from "../instances/adminInstance";
import { authMiddleware } from "../middleware/authMiddleware";

export function adminRegister(fastify: FastifyInstance) {
    fastify.post('/admin/register', {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'email', 'password'],
                properties: {
                    name: { type: 'string', minLength: 3 },
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 }
                }
            },
            summary: "Create admin",
            tags: ['Admin'],
            description: 'This endpoint allows you to create a new admin account with a name, email, and password.',
            response: {
                201: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Admin created successfully'] },
                        admin: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', format: 'uuid' },
                                name: { type: 'string' },
                                email: { type: 'string', format: 'email' },
                                rememberMe: { type: 'boolean', default: false }
                            }
                        }
                    },
                    description: 'Admin created successfully'
                }
            },
            401: {
                type: 'object',
                properties: {
                    message: { type: 'string', enum: ['Invalid credentials'] },
                },
                description: 'Invalid credentials'
            }
        }
    }, (req, res) => adminInstace.create({ req, res }));
}

export function adminLogin(fastify: FastifyInstance) {
    fastify.post('/admin/login', {
        schema: {
            summary: "Admin Login",
            description: 'This endpoint allows an administrator to log in using their email and password. If successful, it returns a JWT token that will be turned into a cookie for authentication.',
            tags: ['Admin'],
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                    rememberMe: { type: 'boolean', default: false }
                }
            },
            response: {
                201: {
                    type: "object",
                    properties: {
                        token: { type: 'string', enum: ['JWT token for authentication'] },
                    }
                },
                400: {
                    type: "object",
                    properties: {
                        message: { type: 'string', enum: ['Invalid credentials'] }
                    },
                    description: 'Invalid credentials'
                },
                429: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Too many requests, please try again later.'] }
                    },
                    description: 'Too many requests, please try again later.'
                }
            }
        }
    }, (req, res) => adminInstace.login({ req, res }));
}

export function adminUpdate(fastify: FastifyInstance) {
    fastify.put('/admin/update', {
        preHandler: authMiddleware,
        schema: {
            summary: "Update admin",
            description: 'This endpoint allows an administrator to update their account details such as email, password, and name.',
            tags: ['Admin'],
            body: {
                type: 'object',
                properties: {
                    email: { type: 'string', format: 'email' },
                    password: { type: 'string', minLength: 6 },
                    name: { type: 'string', minLength: 3 },
                },
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Admin updated successfully'] },
                    },
                    description: 'Admin updated successfully'
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Invalid credentials'] },
                    },
                    description: 'Invalid credentials'
                }
            },
            401: {
                type: 'object',
                properties: {
                    message: { type: 'string', enum: ['Unauthorized'] },
                },
                description: 'Unauthorized'
            },
        },
    }, (req, res) => adminInstace.update({ req, res }));
}

export function adminDelete(fastify: FastifyInstance) {
    fastify.delete('/admin/delete', {
        preHandler: authMiddleware,
        schema: {
            summary: 'Delete Admin',
            description: 'This endpoint allows an administrator to delete your account. The cookie will delete the user you are logged in as.',
            tags: ['Admin'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Deleted Admin Sucessfully'] },
                    },
                },
                400: {
                    type: 'object',
                    properties: {

                        message: { type: 'string', enum: ['Admin not found']}
                    }
                },
                401: {
                    type: 'object',
                    properties: {

                        message: { type: 'string', enum: ['Unauthorized'] },
                    },
                    description: 'Unauthorized'
                }
            }
        }
    }, (req, res) => adminInstace.delete({ req, res }));
}

export function adminFindUnique(fastify: FastifyInstance) {
    fastify.get('/admin', {
        preHandler: authMiddleware,
        schema: {
            summary: "Find unique admin",
            description: 'This endpoint retrieves the details of the currently logged-in administrator, including their ID, name, email, and rememberMe status.',
            tags: ['Admin'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        admin: {
                            type: 'object',
                            properties: {
                                id: { type: 'string', format: 'uuid' },
                                name: { type: 'string' },
                                email: { type: 'string', format: 'email' },
                                rememberMe: { type: 'boolean' },
                                password: { type: 'string' },
                                googleId: { type: ['string', 'null'] },
                                authorized: { type: 'boolean' }
                            }
                        }
                    }
                },
                401: {
                    type: 'object',
                    properties: {

                        message: { type: 'string', enum: ['Unauthorized'] },
                    },
                    description: 'Unauthorized'
                }
            }
        }
    }, (req, res) => adminInstace.findUnique({ req, res }));
}

export function adminLogOut(fastify: FastifyInstance) {
    fastify.delete('/admin/logout', {
        preHandler: authMiddleware,
        schema: {
            summary: "Admin Logout",
            description: 'This endpoint allows an administrator to log out by clearing the authentication cookie.',
            tags: ['Admin'],
            response: {
                200: {
                    type: 'object',
                    properties: {
                        statusCode: { type: 'number', enum: [200] },
                        message: { type: 'string', enum: ['Logged out successfully'] },
                    },
                    description: 'Logged out successfully'
                },
                401: {
                    type: 'object',
                    properties: {

                        message: { type: 'string', enum: ['Unauthorized'] },
                    },
                    description: 'Unauthorized'
                }
            }
        }
    }, (req, res) => adminInstace.logout({ req, res }))
}

export function adminCreateGoogle(fastify: FastifyInstance) {
    fastify.post('/admin/register/google', {
        schema: {
            body: {
                type: 'object',
                description: 'This endpoint allows you to create a new admin account using Google authentication. It requires the Google ID token to verify the user\'s identity.',
                required: ['name', 'email'],
                properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string', minLength: 3 },
                    email: { type: 'string', format: 'email' }
                }
            },
            summary: "Create admin with Google",
            tags: ['Admin'],
            response: {
                201: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Admin created successfully'] },
                    },
                    description: 'Admin created successfully'
                }
            }
        }
    }, (req, res) => adminInstace.createWithGoogle({ req, res }))
}

export function adminLoginGoogle(fastify: FastifyInstance) {
    fastify.post('/admin/login/google',{
        schema: {
            summary: "Admin Login with Google",
            description: 'This endpoint allows an administrator to log in using Google authentication. It requires the Google ID token to verify the user\'s identity and returns a JWT token for authentication.',
            tags: ['Admin'],
            body: {
                type: 'object',
                required: ['email'],
                properties: {
                    email: { type: 'string', format: 'email' },
                    name: { type: 'string', minLength: 3 }
                }
            },
            response: {
                201: {
                    type: 'object',
                    properties: {
                        token: { type: 'string', enum: ['JWT token for authentication'] },
                    }
                },
                400: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Invalid credentials'] }
                    },
                    description: 'Invalid credentials'
                },
                429: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', enum: ['Too many requests, please try again later.'] }
                    },
                    description: 'Too many requests, please try again later.'
                }
            }
        }
    }, (req, res) => adminInstace.createWithGoogle({ req, res }))
}