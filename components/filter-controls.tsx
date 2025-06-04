import { useState, useEffect } from "react";
import chaptersData from "@/data/chapters.json";

interface Chapter {
  subject: string;
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: {
    [year: string]: number;
  };
  questionSolved: number;
  status: string;
  isWeakChapter: boolean;
}

interface FilterControlsProps {
  subject: string;
  onFilterChange: (filters: any) => void;
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
    <div className="flex items-center space-x-4 mb-4">
      <div>Filter by:</div>
      {/* Class Filter */}
      {/* Unit Filter */}
      {/* Status Filter */}
      {/* Weak Chapters Toggle */}
      {/* Sorting */}
    </div>
  );
}
