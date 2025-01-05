"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, Users } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { workspace } from "@/db/schema";
import { useRouter } from "next/navigation";

interface WorkspaceSwitcherProps {
  workspaces: workspace[];
  currentWorkspace: workspace;
  onWorkspaceSelect: (workspace: workspace) => void;
  onInviteClick: () => void;
}

export function WorkspaceSwitcher({
  workspaces,
  currentWorkspace,
  onWorkspaceSelect,
  onInviteClick,
}: WorkspaceSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a workspace"
          className="h-fit w-full justify-between rounded-[0.75rem] hover:bg-background"
        >
          <div className="grid truncate">
            <div className="truncate text-left text-base font-medium">
              {currentWorkspace.name}
            </div>
            <div className="truncate text-left text-sm text-muted-foreground">
              1 members
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="ml-2 w-[300px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Search workspace..." />
          <CommandList>
            <CommandEmpty>No workspace found.</CommandEmpty>
            <CommandGroup heading="Workspaces">
              {workspaces.map((workspace) => (
                <CommandItem
                  key={workspace.id}
                  onSelect={() => {
                    onWorkspaceSelect(workspace);
                    setOpen(false);
                  }}
                  className="text-sm"
                >
                  <div className="flex flex-1 flex-col truncate">
                    <span>{workspace.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {workspace.name} members
                    </span>
                  </div>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      currentWorkspace.id === workspace.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  onInviteClick();
                  setOpen(false);
                }}
              >
                <Users className="mr-2 h-4 w-4" />
                <span>Invite teammates</span>
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/onboarding/workspaces?new=true");
                  setOpen(false);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                <span>Create new workspace</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
