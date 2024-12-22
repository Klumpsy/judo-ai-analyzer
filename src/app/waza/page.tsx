"use client";

import { waza } from "@/utils/constant";
import { AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/navigation";

export type Technique = {
  name: string;
  description: string;
};

export type WazaCategory = {
  category: string;
  techniques?: Technique[];
  subcategories?: { subcategory: string; techniques: Technique[] }[];
};

const WazaPage = () => {
  const router = useRouter();
  const groupedTechniques: WazaCategory[] = waza;

  const handleAddVideo = (techniqueName: string, categoryName: string) => {
    router.push(
      `/waza/upload?technique=${encodeURIComponent(
        techniqueName
      )}&category=${encodeURIComponent(categoryName)}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Judo Techniques (Waza)
      </h1>
      <div className="space-y-8">
        {groupedTechniques.map((categoryData) => (
          <div key={categoryData.category}>
            <h2 className="text-2xl font-semibold border-b border-gray-700 mb-4 pb-2">
              {categoryData.category}
            </h2>
            {categoryData.techniques && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.techniques.map((technique, index) => (
                  <div
                    key={index}
                    className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
                  >
                    <h3 className="text-xl font-bold mb-2">{technique.name}</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {technique.description}
                    </p>
                    <button
                      onClick={() =>
                        handleAddVideo(technique.name, categoryData.category)
                      }
                      className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      <AiOutlinePlus size={20} />
                      <span>Add Video</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
            {categoryData.subcategories &&
              categoryData.subcategories.map((subcategoryData) => (
                <div key={subcategoryData.subcategory} className="mt-6">
                  <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">
                    {subcategoryData.subcategory}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {subcategoryData.techniques.map((technique, index) => (
                      <div
                        key={index}
                        className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition"
                      >
                        <h4 className="text-lg font-bold mb-2">
                          {technique.name}
                        </h4>
                        <p className="text-sm text-gray-400 mb-4">
                          {technique.description}
                        </p>
                        <button
                          onClick={() =>
                            handleAddVideo(
                              technique.name,
                              subcategoryData.subcategory
                            )
                          }
                          className="flex items-center space-x-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          <AiOutlinePlus size={20} />
                          <span>Add Video</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WazaPage;
