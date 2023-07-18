class CastDTO {
    name: string;
    birthday: string;
    deadday: string | null;
}

export class MovieCastDTO {
    id: number;
    name: string;
    casts: CastDTO[];
}