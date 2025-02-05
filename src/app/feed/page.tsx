import { Episode } from "@/types/episode";
import * as Icon from "lucide-react";
import Image from "next/image";

const settings = {
    pastFetchTime: 7,
};
const episodeData: { [episodeID: number]: Episode } = {};

export default async function FeedPage() {
    // Time Span
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - settings.pastFetchTime);
    const toDate = new Date();
    toDate.setDate(toDate.getDate() + 1);

    const programIDs = [4923, 178, 2778, 4540]; // , 5380

    const episodes: React.ReactNode[] = [];

    for (const programID of programIDs) {
        const response = await fetch(`https://api.sr.se/api/v2/episodes/index?programid=${programID}&fromdate=${fromDate.toISOString().slice(0, 10)}&todate=${toDate.toISOString().slice(0, 10)}&format=json&pagination=false&audioquality=high`);
        const data: { episodes: Episode[] } = await response.json();

        data.episodes.forEach((episode: Episode) => {
            episodeData[episode.id] = episode;

            const publishDate = new Date(parseInt(episode.publishdateutc.replace(/\D/g, "")))
            const localeDate = publishDate.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10) ?
                "Idag"
                :
                publishDate.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm", day: "2-digit", month: "short" });
            const localeTime = publishDate.toLocaleString("sv-SE", { timeZone: "Europe/Stockholm", hour12: false, hour: "2-digit", minute: "2-digit" });
            const duration = Math.floor((episode?.listenpodfile?.duration || episode?.downloadpodfile?.duration || episode?.broadcast?.broadcastfiles[0]?.duration || 0) / 60);

            episodes.push(
                <li className="w-full grid grid-cols-[128px_1fr] grid-rows-[min_1fr] gap-2" key={episode.id}>
                    <Image width={128} height={72} src={episode.imageurltemplate} alt="Avsnittsbild" className="bg-zinc-600 rounded-md" fetchPriority="low"></Image>

                    <div className="col-start-2">
                        <p className="text-sm font-light overflow-hidden">{episode.program.name}</p>
                        <p className="text-sm font-bold overflow-hidden">{episode.title}</p>
                    </div>

                    <p className="text-xs font-normal overflow-hidden col-span-2">{episode.description}</p>

                    <div className="col-span-2 flex flex-row justify-between items-center">
                        {/* <p className="text-xs text-zinc-400">3 feb 6:23&nbsp;&nbsp;&middot;&nbsp;&nbsp;10 min</p> */}
                        <p className="text-xs text-zinc-400">{localeDate} {localeTime}&nbsp;&nbsp;&middot;&nbsp;&nbsp;{duration} min</p>

                        <button className="w-min self-end">
                            <Icon.Play className="fill-zinc-100" />
                        </button>
                    </div>
                </li>
            );
        });
    }

    // Sort by publish time
    episodes.sort((a: any, b: any) => {
        const publishTimeA: number = parseInt(episodeData[a?.key].publishdateutc.replace(/\D/g, ""));
        const publishTimeB: number = parseInt(episodeData[b?.key].publishdateutc.replace(/\D/g, ""));
        return publishTimeB - publishTimeA;
    });

    return (
        <main>
            <ul className="flex flex-col gap-y-10 mt-2 mb-4">
                {episodes}
            </ul>
        </main>
    )
}