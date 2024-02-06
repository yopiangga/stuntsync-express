import { RECOMENDATIONS } from "../constant/recomendations-edit";

export async function getRecomendationsByAge(month: number) {
    const recomendations = RECOMENDATIONS.filter((recomendation) => recomendation.month === month);
    return recomendations;
}