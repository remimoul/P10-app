const VotePageHeader = () => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-center">
        <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
          Qui va finir 10ᵉ ?
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-800 mt-2 rounded-full mx-auto" />
      </div>
      <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 mt-4">
        Parie sur le bon et vote maintenant !
      </h2>
    </div>
  );
};

export default VotePageHeader;
