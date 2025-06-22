import { FastifyInstance } from "fastify";
import { authMiddleware } from "../middleware/authMiddleware";
import { roomInstance } from "../instances/roomInstance";

export function createRoom(fastify: FastifyInstance){
    fastify.post("/room/register/:id", {preHandler: authMiddleware}, (req, res) => roomInstance.create({req, res}));
}

export function findAllRooms(fastify: FastifyInstance){
    fastify.get("/rooms", (req, res) => roomInstance.findAll({req, res}));
}

export function findAvailableRooms(fastify: FastifyInstance){
    fastify.get("/rooms/available", (req, res) => roomInstance.findAvailableRooms({req, res}));
}

export function findUniqueRoom(fastify: FastifyInstance){
    fastify.get("/room/:id", (req, res) => roomInstance.findUnique({req, res}));
}

export function updateRoom(fastify: FastifyInstance){
    fastify.put("/room/update/:id", {preHandler: authMiddleware}, (req, res) => roomInstance.update({req, res}));
}

export function deleteRoom(fastify: FastifyInstance){
    fastify.delete("/room/delete/:id", {preHandler: authMiddleware}, (req, res) => roomInstance.delete({req, res}));
}