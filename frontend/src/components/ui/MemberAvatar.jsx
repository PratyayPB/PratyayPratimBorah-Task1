// components/common/Avatar.jsx
export default function Avatar({ name }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
        {name.charAt(0)}
      </div>
      <span className="text-sm">{name}</span>
    </div>
  );
}
