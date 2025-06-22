import { TaxiDriver } from "../entities/taxiDriver";

export interface ITaxiDriverRepository {
    createTaxiDriver(taxiDriver: TaxiDriver): Promise<TaxiDriver | null>;
    updateTaxiDriver(taxiDriver: TaxiDriver): Promise<TaxiDriver | null>;
    deleteTaxiDriver(id: string): Promise<void>;
    getTaxiDriverById(id: string): Promise<TaxiDriver | null>;
    getAllTaxiDriversByCityId(): Promise<TaxiDriver[]>;
}