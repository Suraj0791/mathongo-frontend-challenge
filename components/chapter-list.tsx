import { useEffect, useState } from "react";
// Assuming the JSON data is in a file named chapters.json in a data directory at the root of the project
import chaptersData from "@/data/chapters.json";
import {
  Book,
  Atom,
  Flask,
  Calculator,
  Lightbulb,
  CircleWavyCheck,
  CircleWavyQuestion,
  Flame,
} from "@phosphor-icons/react";

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
  onChapterCountChange: (count: number) => void;
}

export default function ChapterList({
  subject,
  filters,
  sort,
  onChapterCountChange,
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
    onChapterCountChange(filteredChapters.length);
  }, [subject, filters, sort, onChapterCountChange]);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">{subject} Chapters</h2>
      <ul>
        {chapters.map((chapter) => (
          <li
            key={chapter.chapter}
            className="border-b py-4 flex items-center justify-between"
          >
            <div className="flex items-center">
              {renderRandomIcon()}
              <div className="ml-3">
                <p className="text-lg font-semibold">{chapter.chapter}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {chapter.class} | {chapter.unit}
                </p>
                <div className="flex items-center text-sm">
                  {chapter.status === "Completed" && (
                    <CircleWavyCheck
                      size={16}
                      className="text-green-600 mr-1"
                    />
                  )}
                  {chapter.status === "Not Started" && (
                    <CircleWavyQuestion
                      size={16}
                      className="text-yellow-600 mr-1"
                    />
                  )}
                  <span>{chapter.status}</span>
                  {chapter.isWeakChapter && (
                    <span className="ml-2 text-red-600 flex items-center">
                      <Flame size={16} className="mr-1" /> Weak
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 text-right">
              {Object.entries(chapter.yearWiseQuestionCount).map(
                ([year, count]) => (
                  <span key={year} className="ml-2">
                    {year}: {count} Qs
                  </span>
                )
              )}
              <p className="mt-1">Solved: {chapter.questionSolved}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const icons = [Book, Atom, Flask, Calculator, Lightbulb];

const renderRandomIcon = () => {
  const RandomIcon = icons[Math.floor(Math.random() * icons.length)];
  return <RandomIcon size={24} className="text-blue-500 dark:text-blue-400" />;
};
