const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Waza Points and Scored Techniques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <h2 className="text-xl font-bold">Waza Points</h2>
          <p className="text-4xl font-bold mt-2">40</p>
        </div>
        <div className="bg-gray-800 p-6 rounded shadow-md">
          <h2 className="text-xl font-bold">Scored Techniques</h2>
          <p className="text-4xl font-bold mt-2">3</p>
        </div>
      </div>

      {/* Latest Uploaded Techniques Carousel */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Latest Uploaded Techniques</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {["Technique 1", "Technique 2", "Technique 3"].map(
            (technique, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded shadow-md min-w-[200px] flex-shrink-0"
              >
                <h3 className="text-lg font-bold">{technique}</h3>
                <p className="text-sm text-gray-400 mt-2">Uploaded recently</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Technique Categories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Technique Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            "Te-Waza",
            "Koshi-Waza",
            "Ashi-Waza",
            "Sutemi-Waza",
            "Osaekomi-Waza",
            "Shime-Waza",
            "Kansetsu-Waza",
            "Ukemi",
          ].map((category, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded shadow-md text-center"
            >
              <h3 className="text-lg font-bold">{category}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
