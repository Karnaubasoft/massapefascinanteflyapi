import { Admin } from "../entities/admin";

export interface IAdminRepository {
    createAdmin(data: Admin): Promise<Admin | null>;
    updateAdmin(data: Admin): Promise<Admin | null>;
    deleteAdmin(id: string): Promise<Admin | null>;
    getAdminByEmail(email: string): Promise<Admin | null>;
    getAdminById(id: string): Promise<Admin | null>;
    upsertGoogleAdminInput(data: Admin): Promise<Admin | null>;
    findAdminAuthorized(id: string): Promise<boolean>;
};