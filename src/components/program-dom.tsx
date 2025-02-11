"use client";

import { Program } from "@/types/program";
import SRAttribute from "./sr-attribute";
import Image from "next/image";
import * as Icon from "lucide-react";
import LikeButton from "./like-button";

export default function ProgramDOM({ programData, className }: { programData: Program, className?: string }) {
    return (
        <li className={`grid grid-cols-[96px_1fr] grid-rows-[min_96px_min_min] gap-y-2 gap-x-3 ${className}`}>
            {/* SR Attribute */}
            <SRAttribute className="col-span-2" />

            {/* Thumbnail */}
            <Image width={96} height={96} className="bg-zinc-600 rounded-md" src={""} overrideSrc={programData.programimage} alt="Programbild" fetchPriority="low" />

            {/* Header Text */}
            <div className="col-start-2 grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-2">
                {/* Program name */}
                <p className="col-start-1 text-lg font-bold overflow-hidden">{programData.name}</p>

                {/* Other info */}
                <p className="col-start-1 text-xs font-normal text-zinc-400 overflow-hidden">{programData.broadcastinfo}</p>

                {/* Like button */}
                {/* <button className="size-min col-start-2 row-start-1 row-span-2 mt-1"><Icon.Heart size={28} /></button> */}
                <LikeButton programID={programData.id}/>
            </div>

            {/* Description */}
            <p className="col-span-2 text-s pt-1 font-normal overflow-hidden">{programData.description}</p>
        </li>
    );
}

export function ProgramSkeleton() {
    return (
        <li className="grid grid-cols-[96px_1fr] grid-rows-[min_96px_min_min] gap-y-2 gap-x-3">
            {/* SR Attribute */}
            <div className="col-span-2 h-5"></div>

            {/* Thumbnail */}
            <div className="bg-zinc-600 rounded-md w-[96px] h-[96px] animate-pulse"></div>

            {/* Header Text */}
            <div className="col-start-2 grid grid-cols-[1fr_auto] gap-x-2 gap-y-1">
                {/* Program name */}
                <div className="bg-zinc-600 rounded-md col-start-1 h-5 animate-pulse"></div>

                {/* Other info */}
                <div className="bg-zinc-600 rounded-md col-start-1 h-3 animate-pulse"></div>
                <div className="bg-zinc-600 rounded-md col-start-1 h-3 animate-pulse"></div>
            </div>

            {/* Description */}
            <div className="col-span-2 h-10 text-s pt-1 font-normal overflow-hidden animate-pulse"></div>
        </li>
    );
}