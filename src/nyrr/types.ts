export type EventDetails = {
  distanceName: string,
  distanceUnitCode: string,
  eventCode: string,
  eventName: string,
  startDateTime: string,
  logoImageId: number | null,
  logoImageExtension: string | null,
};

export type TeamEventScorer = {
  runnerId: number,
  firstName: string,
  lastName: string,
  finishTime: string,
  finishPlace: number,
};

export type TeamEventDetails = EventDetails & {
  teamOrder: number | undefined,
  summaryPlace: number | undefined,
  summaryTime: string | undefined
  teamScorers: TeamEventScorer[], 
}