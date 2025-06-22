import { TaxiDriverCreateUseCase } from "../../../use-cases/taxiDriver/taxiDriverCreateUseCase";
import { TaxiDriverDeleteUseCase } from "../../../use-cases/taxiDriver/taxiDriverDeleteUseCase";
import { TaxiDriverFindAllUseCase } from "../../../use-cases/taxiDriver/taxiDriverFindAllUseCase";
import { TaxiDriverFindUniqueUseCase } from "../../../use-cases/taxiDriver/taxiDriverFindUniqueUseCase";
import { TaxiDriverUpdateUseCase } from "../../../use-cases/taxiDriver/taxiDriverUpdateUseCase";
import { FastifyContextDTO } from "../../dto/fastifyContextDTO";
import { Multipart } from "../plugins/multipart";

export class taxiDriverController {
  constructor(
    private readonly taxiDriverCreateUseCase: TaxiDriverCreateUseCase,
    private readonly multipart: Multipart,
    private readonly taxiDriverFindAllUseCase: TaxiDriverFindAllUseCase,
    private readonly taxiDriverFindUniqueUseCase: TaxiDriverFindUniqueUseCase,
    private readonly taxiDriverUpdateUseCase: TaxiDriverUpdateUseCase,
    private readonly taxiDriverDeleteUseCase: TaxiDriverDeleteUseCase
  ) {}

  async create(fastify: FastifyContextDTO) {
    const data = await this.multipart.handleDataMultipart(
      fastify.req,
      "taxiDrivers"
    );
    const taxiDriver = await this.taxiDriverCreateUseCase.execute(
      data,
      fastify.req
    );
    fastify.res
      .status(201)
      .send({ message: "Taxi Driver created", ...taxiDriver });
  }

  async findAll(fastify: FastifyContextDTO) {
    const taxiDriver = await this.taxiDriverFindAllUseCase.execute();
    fastify.res.send(taxiDriver);
  }

  async findUnique(fastify: FastifyContextDTO) {
    const { id } = fastify.req.params as { id: string };
    const taxiDriver = await this.taxiDriverFindUniqueUseCase.execute(id);
    fastify.res.send({ message: "Taxi Driver found", ...taxiDriver });
  }

  async update(fastify: FastifyContextDTO) {
    const { id } = fastify.req.params as { id: string };
    const data = await this.multipart.handleDataMultipart(
      fastify.req,
      "taxiDrivers"
    );
    const updatedTaxiDriver = await this.taxiDriverUpdateUseCase.execute(
      data,
      id
    );
    fastify.res.send({ message: "Updated Taxi Driver", ...updatedTaxiDriver });
  }

  async delete(fastify: FastifyContextDTO) {
    const { id } = fastify.req.params as { id: string };
    await this.taxiDriverDeleteUseCase.execute(id);
    fastify.res.send("Taxi Driver deleted");
  }
}
