"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useSettingsStore } from "@/store/settings-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import * as Icon from "lucide-react";
import { useState } from "react";

export default function SettingsMenu() {
    const { settings, setAllSettings } = useSettingsStore();
    const [uncommittedSettings, setUncommittedSettings] = useState({ ...settings, programIDsString: settings.programIDs.join(", ") });

    return (
        <Dialog onOpenChange={(isOpen) => {
            // Save on close
            if (isOpen) {
                setUncommittedSettings({ ...settings, programIDsString: settings.programIDs.join(", ") });
            }
            else if (!isOpen) {
                setAllSettings({ ...uncommittedSettings, programIDs: uncommittedSettings.programIDsString.split(",").map((id) => parseInt(id.trim())).filter((id) => !isNaN(id)) });
                // Reload page
                window.location.reload();
            }
        }}>
            <DialogTrigger>
                <Icon.Settings />
            </DialogTrigger>

            <DialogContent className="w-[90%] bg-zinc-900 rounded-lg border-none">
                <DialogHeader>
                    <DialogTitle>
                        Inställningar
                    </DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-y-2">
                    {/* Back day */}
                    <Label htmlFor="days-fetch-back">Antal dagar tillbaka program ska hämtas ifrån.</Label>
                    <Input className="mb-4" id="days-fetch-back" placeholder="Antal dagar ex. 7" type="number" autoFocus={false}
                        value={uncommittedSettings.fetchBack || ""}
                        onChange={(e) => setUncommittedSettings({ ...uncommittedSettings, fetchBack: Math.max(0, parseInt(e.target.value)) })}
                    />

                    {/* Followed programs */}
                    <Label className="leading-4" htmlFor="followed-programs">Program att hämta. <span className="text-zinc-400">OBS! Detta är inte den slutgiltiga lösningen för den här funktionen.</span></Label>
                    <Input id="followed-programs" placeholder="Program ID ex. 4923, 178" type="text" autoFocus={false}
                        value={uncommittedSettings.programIDsString || ""}
                        onChange={(e) => setUncommittedSettings({ ...uncommittedSettings, programIDsString: e.target.value })}
                    />
                </div>

                <DialogFooter>
                    <Button className="bg-zinc-950 text-zinc-100 mt-1 text-base p-5 font-semibold" autoFocus={true}
                        onClick={(e) => {
                            setAllSettings(uncommittedSettings);
                            (e.target as HTMLButtonElement).textContent = "Sparat";
                        }}
                        onBlur={(e) => (e.target as HTMLButtonElement).textContent = "Spara"}
                    >
                        Spara
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}