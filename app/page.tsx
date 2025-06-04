import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">JEE Main Chapter-wise Collection of Physics PYQs</h1>
      <Tabs defaultValue="physics">
        <TabsList>
          <TabsTrigger value="physics">Physics PYQs</TabsTrigger>
          <TabsTrigger value="chemistry">Chemistry PYQs</TabsTrigger>
          <TabsTrigger value="math">Mathematics PYQs</TabsTrigger>
        </TabsList>
        <TabsContent value="physics">
          {/* Physics content will go here */}
          <div className="mt-4">Physics Chapters List</div>
        </TabsContent>
        <TabsContent value="chemistry">
          {/* Chemistry content will go here */}
          <div className="mt-4">Chemistry Chapters List</div>
        </TabsContent>
        <TabsContent value="math">
          {/* Mathematics content will go here */}
          <div className="mt-4">Mathematics Chapters List</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
