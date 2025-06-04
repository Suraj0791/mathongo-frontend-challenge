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

export default function ChapterList({ subject }: { subject: string }) {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    // In a real application, you would fetch data here.
    // For this task, we are using the mock JSON data.
    const filteredChapters = chaptersData.filter(
      (chapter) => chapter.subject.toLowerCase() === subject.toLowerCase()
    );
    setChapters(filteredChapters);
  }, [subject]);

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
