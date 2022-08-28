import axios from 'axios';
import { z } from 'zod';

let token:string;

const eventDetailsSchema = z.object({
  distanceName: z.string(),
  distanceUnitCode: z.string(),
  eventCode: z.string(),
  eventName: z.string(),
  isClubPointsPublished: z.boolean(),
  isPointsReallyExists: z.boolean(),
  isTeamAwardExists: z.boolean(),
  logoImageExtension: z.string().nullable(),
  logoImageId: z.number().nullable(),
  points: z.number().nullable(),
  startDateTime: z.string(),
});

const clubStandingsSchema = z.object({
  eventDetails: z.array(
    eventDetailsSchema,
  ),
  teamCode: z.string(),
  teamName: z.string(),
  teamPlace: z.number(),
  totalPoints: z.number(),
});

const clubScorerSchema = z.object({
    runnerId: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    bib: z.string(),
    gender: z.string(),
    age: z.number(),
    city: z.string(),
    stateProvince: z.string(),
    country: z.string(),
    iaaf: z.string(),
    finishTime: z.string(),
    finishPlace: z.number(),
  }
);

export type ClubScorer = z.infer<typeof clubScorerSchema>;
export type EventDetails = z.infer<typeof eventDetailsSchema>;
export type ClubStandings = z.infer<typeof clubStandingsSchema>;


export const fetchToken = async () : Promise<void> => {
  const response = await axios.get('/api/nyrr-token');
  const data = response.data;

  z.object({
    'token': z.string(),
  }).parse(data);

  token = data.token;
}

export const fetchClubStandings = async () : Promise<ClubStandings[]> => {
  const divisionCode = 'AM';
  const year = 2022;

  const response = await postWithNyrrToken(
    'https://results.nyrr.org/api/ClubStandings/getDivisionResults', 
    { 
      year,
      divisionCode,
    }
  );

  const data = response.data.response.items;
  z.array(clubStandingsSchema).parse(data);

  return data;
}

export const fetchClubScorers = async (eventCode:string) : Promise<ClubScorer[]> => {
  const response = await postWithNyrrToken(
    'https://results.nyrr.org/api/awards/teamAwardRunners',
    {
      eventCode: eventCode,
      teamCode: "PPTC",
    }
  );

  const data = response.data.response.items;
  z.array(clubScorerSchema).parse(data);

  return data;
}

const postWithNyrrToken = async (url:string, data:object) => {  
  if (token === undefined) {
    await fetchToken();
  }

  const response = await axios.post(url, data, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
      token,
    }
  });

  return response;
}

