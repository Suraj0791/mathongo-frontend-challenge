import { useEffect, useState } from "react";
// Assuming the JSON data is in a file named chapters.json in a data directory at the root of the project
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

interface ChapterListProps {
  subject: string;
  filters: {
    classes?: string[];
    units?: string[];
    status?: string | null;
    isWeakChapter?: boolean;
  };
  sort: string;
}

export default function ChapterList({
  subject,
  filters,
  sort,
}: ChapterListProps) {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    let filteredChapters = chaptersData.filter(
      (chapter) => chapter.subject.toLowerCase() === subject.toLowerCase()
    );

    // Apply filters
    if (filters.classes && filters.classes.length > 0) {
      filteredChapters = filteredChapters.filter((chapter) =>
        filters.classes?.includes(chapter.class)
      );
    }
    if (filters.units && filters.units.length > 0) {
      filteredChapters = filteredChapters.filter((chapter) =>
        filters.units?.includes(chapter.unit)
      );
    }
    if (filters.status) {
      filteredChapters = filteredChapters.filter(
        (chapter) => chapter.status === filters.status
      );
    }
    if (filters.isWeakChapter) {
      filteredChapters = filteredChapters.filter(
        (chapter) => chapter.isWeakChapter
      );
    }

    // Apply sorting
    if (sort === "chapter") {
      filteredChapters.sort((a, b) => a.chapter.localeCompare(b.chapter));
    } // Add more sorting options here later

    setChapters(filteredChapters as Chapter[]);
  }, [subject, filters, sort]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">{subject} Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter.chapter} className="border-b py-2">
            {chapter.chapter} - {chapter.class} - {chapter.unit} (
            {chapter.status})
          </li>
        ))}
      </ul>
    </div>
  );
}
