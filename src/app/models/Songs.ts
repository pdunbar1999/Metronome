export interface Song {
    id: number;
    name: string;
    BPM: number;
    stressFirstBeat: boolean;
}


export const listOfSongs: Song[] = [
    {
        id: 0,
        name: "Hotel California",
        BPM: 80,
        stressFirstBeat: true
    },
    {
        id: 1,
        name: "Way I talk",
        BPM: 100,
        stressFirstBeat: false
    }
]