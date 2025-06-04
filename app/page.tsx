import { useState } from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterList from "@/components/chapter-list";
import FilterControls from "@/components/filter-controls";

export default function Home() {
  const [filters, setFilters] = useState<any>({});
  const [sort, setSort] = useState<string>("chapter");

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        JEE Main Chapter-wise Collection of Physics PYQs
      </h1>
      <Tabs defaultValue="physics">
        <TabsList>
          <TabsTrigger value="physics">Physics PYQs</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry PYQs</TabsTrigger>
          <TabsTrigger value="math">Mathematics PYQs</TabsTrigger>
        </TabsList>
        <TabsContent value="physics">
          <FilterControls
            subject="Physics"
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          <ChapterList subject="Physics" filters={filters} sort={sort} />
        </TabsContent>
        <TabsContent value="chemistry">
          <FilterControls
            subject="Chemistry"
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          <ChapterList subject="Chemistry" filters={filters} sort={sort} />
        </TabsContent>
        <TabsContent value="math">
          <FilterControls
            subject="Math"
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
          <ChapterList subject="Math" filters={filters} sort={sort} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
