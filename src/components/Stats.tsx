export default function Stats() {
  const data = [
    { title: "10+", desc: "Years Experience" },
    { title: "5000+", desc: "Happy Clients" },
    { title: "Certified", desc: "Dental Experts" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6 py-10 px-6 md:px-10 bg-gradient-to-r from-[#8FD3CF] via-[#4FA9C6] to-[#2F7FA0] 
relative overflow-hidden">
      {data.map((item, i) => (
        <div key={i}>
          <h2 className="text-2xl font-bold">{item.title}</h2>
          <p className="text-gray-500">{item.desc}</p>
        </div>
      ))}
    </div>
  );
}