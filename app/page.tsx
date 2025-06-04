import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChapterList from "@/components/chapter-list";

export default function Home() {
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
          {/* Physics content will go here */}
          <ChapterList subject="Physics" />
        </TabsContent>
        <TabsContent value="chemistry">
          {/* Chemistry content will go here */}
          <ChapterList subject="Chemistry" />
        </TabsContent>
        <TabsContent value="math">
          {/* Mathematics content will go here */}
          <ChapterList subject="Math" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
