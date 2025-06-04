import { useState, useEffect } from "react";
import chaptersData from "@/data/chapters.json";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface FilterState {
  classes?: string[];
  units?: string[];
  status?: string | null;
  isWeakChapter?: boolean;
}

interface FilterControlsProps {
  subject: string;
  onFilterChange: (filters: FilterState) => void;
  onSortChange: (sort: string) => void;
}

export default function FilterControls({
  subject,
  onFilterChange,
  onSortChange,
}: FilterControlsProps) {
  const [availableClasses, setAvailableClasses] = useState<string[]>([]);
  const [availableUnits, setAvailableUnits] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isWeakChapter, setIsWeakChapter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("chapter"); // Default sort by chapter

  useEffect(() => {
    const chaptersForSubject = chaptersData.filter(
      (chapter) => chapter.subject.toLowerCase() === subject.toLowerCase()
    );

    const classes = Array.from(new Set(chaptersForSubject.map((c) => c.class)));
    const units = Array.from(new Set(chaptersForSubject.map((c) => c.unit)));

    setAvailableClasses(classes);
    setAvailableUnits(units);
    // Reset selected filters when subject changes
    setSelectedClasses([]);
    setSelectedUnits([]);
    setSelectedStatus(null);
    setIsWeakChapter(false);
  }, [subject]);

  useEffect(() => {
    // Notify parent component of filter changes
    const filters = {
      classes: selectedClasses,
      units: selectedUnits,
      status: selectedStatus,
      isWeakChapter: isWeakChapter,
    };
    onFilterChange(filters);
  }, [
    selectedClasses,
    selectedUnits,
    selectedStatus,
    isWeakChapter,
    onFilterChange,
  ]);

  useEffect(() => {
    // Notify parent component of sort changes
    onSortChange(sortBy);
  }, [sortBy, onSortChange]);

  // TODO: Implement UI for filters and sorting using shadcn/ui components

  return (
    <div className="flex flex-wrap items-center gap-4 mb-4">
      <div>Filter by:</div>
      {/* Class Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Class {selectedClasses.length > 0 && `(${selectedClasses.length})`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Class(es)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableClasses.map((className) => (
            <DropdownMenuCheckboxItem
              key={className}
              checked={selectedClasses.includes(className)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedClasses([...selectedClasses, className]);
                } else {
                  setSelectedClasses(
                    selectedClasses.filter((c) => c !== className)
                  );
                }
              }}
            >
              {className}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Unit Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Unit {selectedUnits.length > 0 && `(${selectedUnits.length})`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Unit(s)</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {availableUnits.map((unitName) => (
            <DropdownMenuCheckboxItem
              key={unitName}
              checked={selectedUnits.includes(unitName)}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedUnits([...selectedUnits, unitName]);
                } else {
                  setSelectedUnits(selectedUnits.filter((u) => u !== unitName));
                }
              }}
            >
              {unitName}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Status {selectedStatus && `(${selectedStatus})`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedStatus || ""}
            onValueChange={setSelectedStatus}
          >
            <DropdownMenuRadioItem value="Not Started">
              Not Started
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Completed">
              Completed
            </DropdownMenuRadioItem>
            {/* Add other statuses if necessary */}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Weak Chapters Toggle */}
      <div className="flex items-center space-x-2">
        <Switch
          id="weak-chapters"
          checked={isWeakChapter}
          onCheckedChange={setIsWeakChapter}
        />
        <Label htmlFor="weak-chapters">Weak Chapters</Label>
      </div>
      {/* Sorting */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Sort by: {sortBy === "chapter" ? "Chapter" : "Unknown"}{" "}
            {/* Update with other sort options */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenuRadioItem value="chapter">
              Chapter
            </DropdownMenuRadioItem>
            {/* Add other sorting options here */}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
