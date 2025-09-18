import { Utensils, Wine, Car, Wifi, Dumbbell, Waves } from "lucide-react";

export default function HotelFacilities() {
  const facilities = [
    { icon: <Utensils className="w-8 h-8 text-amber-600" />, title: "Restaurant", desc: "Delicious meals with international and local cuisines." },
    { icon: <Wine className="w-8 h-8 text-amber-600" />, title: "Bar & Lounge", desc: "Relax with cocktails, coffee, or tea in a cozy atmosphere." },
    { icon: <Car className="w-8 h-8 text-amber-600" />, title: "Free Parking", desc: "Spacious parking area available for all our guests." },
    { icon: <Wifi className="w-8 h-8 text-amber-600" />, title: "Free Wi-Fi", desc: "High-speed internet access throughout the hotel." },
    { icon: <Dumbbell className="w-8 h-8 text-amber-600" />, title: "Gym & Fitness", desc: "Stay fit with our modern fitness equipment." },
    { icon: <Waves className="w-8 h-8 text-amber-600" />, title: "Swimming Pool", desc: "Enjoy our clean and well-maintained swimming pool." },
  ];

  return (
    <div className="bg-[#FFF8F0] py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Facilities</h2>
        <p className="text-gray-600 mb-12">
          Discover the luxury and comfort we provide for all our guests. Your satisfaction is our priority.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {facilities.map((facility, i) => (
            <div 
              key={i}
              className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-4">{facility.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.title}</h3>
              <p className="text-gray-600 text-sm">{facility.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}