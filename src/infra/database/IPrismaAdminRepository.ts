import { prisma } from "../../config/prisma";
import { Admin } from "../../domain/entities/admin";
import { IAdminRepository } from "../../domain/repositorys/IAdminRepository";

export class IPrismaAdminReposotory implements IAdminRepository {
    async getAdminByEmail(email: string): Promise<Admin | null> {
        const admin = await prisma.admin.findUnique({
            where: {email}
        });
        return admin;
    }

    async getAdminById(id: string): Promise<Admin | null> {
        const admin = await prisma.admin.findUnique({
            where: {id}
        });

        return admin;
    }

    async findAdminAuthorized(id: string): Promise<boolean> {
        const adminAuthorized = await prisma.admin.findUnique({
            where: {id, authorized: true}
        })

        if (!adminAuthorized) return false;
        return true;
    }

    async createAdmin(data: Admin): Promise<Admin | null> {
        const admin = await prisma.admin.create({
            data: {
                id: data.id ?? '',
                name: data.name,
                email: data.email,
                password: data.password,
            }
        })

        return admin;
    }

    async updateAdmin(data: Admin): Promise<Admin | null> {
        const admin = await prisma.admin.update({
            where: {id: data.id},
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            }
        })

        return admin;
    }

    async deleteAdmin(id: string): Promise<Admin | null> {
        const admin = await prisma.admin.delete({
            where: {id}
        })

        return admin;
    }

    async upsertGoogleAdminInput(data: Admin): Promise<Admin | null> {
        const admin = await prisma.admin.upsert({
            where: {email: data.email},
            update: {},
            create: {
                id: data.id,
                name: data.name,
                googleId: data.googleId,
                email: data.email
            }
        })
        return admin
    }
} 