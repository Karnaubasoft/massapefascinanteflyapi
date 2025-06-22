import { TaxiDriverCreateUseCase } from "../../../use-cases/taxiDriver/taxiDriverCreateUseCase";
import { TaxiDriverDeleteUseCase } from "../../../use-cases/taxiDriver/taxiDriverDeleteUseCase";
import { TaxiDriverFindAllUseCase } from "../../../use-cases/taxiDriver/taxiDriverFindAllUseCase";
import { TaxiDriverFindUniqueUseCase } from "../../../use-cases/taxiDriver/taxiDriverFindUniqueUseCase";
import { TaxiDriverUpdateUseCase } from "../../../use-cases/taxiDriver/taxiDriverUpdateUseCase";
import { IPrismaAdminReposotory } from "../../database/IPrismaAdminRepository";
import { IPrismaCityRepository } from "../../database/IPrismaCityRepository";
import { IPrismaTaxiDriverRepository } from "../../database/IPrismaTaxiDriverRepository";
import { PhotoStorageService } from "../../services/photoStorageService";
import { taxiDriverController } from "../controllers/taxiDriverController";
import { Multipart } from "../plugins/multipart";

const taxiDriverRepository = new IPrismaTaxiDriverRepository();
const adminRepository = new IPrismaAdminReposotory();
const photoStorage = new PhotoStorageService();
const cityRepository = new IPrismaCityRepository();
const multipart = new Multipart(photoStorage);

const taxiDriverCreateUseCase = new TaxiDriverCreateUseCase(taxiDriverRepository, adminRepository, cityRepository );
const taxiDriverFindAllUseCase = new TaxiDriverFindAllUseCase(taxiDriverRepository);
const taxiDriverFindUniqueUseCase = new TaxiDriverFindUniqueUseCase(taxiDriverRepository);
const taxiDriverUpdateUseCase = new TaxiDriverUpdateUseCase(taxiDriverRepository);
const taxiDriverDeleteUseCase = new TaxiDriverDeleteUseCase(taxiDriverRepository);

export const taxiDriverInstance = new taxiDriverController(
    taxiDriverCreateUseCase,
    multipart,
    taxiDriverFindAllUseCase,
    taxiDriverFindUniqueUseCase,
    taxiDriverUpdateUseCase,
    taxiDriverDeleteUseCase
);