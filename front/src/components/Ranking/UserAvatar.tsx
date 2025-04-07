interface UserAvatarProps {
  name: string;
  avatarUrl?: string;
}

const UserAvatar = ({ name, avatarUrl }: UserAvatarProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return avatarUrl ? (
    <img
      src={avatarUrl}
      alt={name}
      className="w-8 h-8 rounded-full object-cover"
    />
  ) : (
    <div className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs font-bold">
      {initials}
    </div>
  );
};

export default UserAvatar;
