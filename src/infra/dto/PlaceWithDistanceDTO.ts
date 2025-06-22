import { Place } from "@prisma/client";

export type PlaceWithDistance = Place & { distance: number }