const Postcard = () => {
  return (
    <div className="relative w-[600px] h-[400px] rounded-xl overflow-hidden">
      <img src="https://picsum.photos/200" alt="Random" className="w-full h-full object-cover" />
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4">
        <h1 className="text-3xl font-cursive mb-2">Postcard</h1>
        <p className="text-lg font-cursive">This is a beautiful postcard with a random image from Picsum.</p>
      </div>
    </div>
  );
};

export default Postcard;