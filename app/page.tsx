import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterList from "@/components/chapter-list";
import FilterControls from "@/components/filter-controls";

interface FilterState {
  classes?: string[];
  units?: string[];
  status?: string | null;
  isWeakChapter?: boolean;
}

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({});
  const [sort, setSort] = useState<string>("chapter");
  const [physicsChapterCount, setPhysicsChapterCount] = useState<number>(0);
  const [chemistryChapterCount, setChemistryChapterCount] = useState<number>(0);
  const [mathChapterCount, setMathChapterCount] = useState<number>(0);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  const handleChapterCountChange = (subject: string, count: number) => {
    if (subject === "Physics") {
      setPhysicsChapterCount(count);
    } else if (subject === "Chemistry") {
      setChemistryChapterCount(count);
    } else if (subject === "Math") {
      setMathChapterCount(count);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">
        JEE Main Chapter-wise Collection of Physics PYQs
      </h1>
      <Tabs defaultValue="physics">
        <TabsList>
          <TabsTrigger value="physics">
            Physics PYQs ({physicsChapterCount})
          </TabsTrigger>
          <TabsTrigger value="chemistry">
            Chemistry PYQs ({chemistryChapterCount})
          </TabsTrigger>
          <TabsTrigger value="math">
            Mathematics PYQs ({mathChapterCount})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="physics">
          <FilterControls
            subject="Physics"
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          <ChapterList
            subject="Physics"
            filters={filters}
            sort={sort}
            onChapterCountChange={(count) =>
              handleChapterCountChange("Physics", count)
            }
          />
        </TabsContent>
        <TabsContent value="chemistry">
          <FilterControls
            subject="Chemistry"
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          <ChapterList
            subject="Chemistry"
            filters={filters}
            sort={sort}
            onChapterCountChange={(count) =>
              handleChapterCountChange("Chemistry", count)
            }
          />
        </TabsContent>
        <TabsContent value="math">
          <FilterControls
            subject="Math"
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          <ChapterList
            subject="Math"
            filters={filters}
            sort={sort}
            onChapterCountChange={(count) =>
              handleChapterCountChange("Math", count)
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
