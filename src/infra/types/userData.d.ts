export interface userData { id: string, cityId: string | null, remenberMe: boolean }

declare module 'fastify' {
    interface FastifyRequest {
        user?: userData 
    }
}
